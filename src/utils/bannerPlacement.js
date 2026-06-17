export const DEFAULT_BANNER_LAYOUT = {
  leftPercent: 65,
  topPercent: 30,
  width: 400,
  height: 120,
  textTone: 'light'
};

const ANALYSIS_WIDTH = 112;
const MIN_TITLE_WIDTH = 220;
const MIN_TITLE_HEIGHT = 74;
const EDGE_PADDING = 18;

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function percentile(values, percentileValue) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor(clamp(percentileValue, 0, 1) * (sorted.length - 1));
  return sorted[index];
}

function getCoverSourceRect(image, targetWidth, targetHeight) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const targetRatio = targetWidth / targetHeight;
  const imageRatio = imageWidth / imageHeight;

  if (imageRatio > targetRatio) {
    const sourceWidth = imageHeight * targetRatio;
    return {
      sourceX: (imageWidth - sourceWidth) / 2,
      sourceY: 0,
      sourceWidth,
      sourceHeight: imageHeight
    };
  }

  const sourceHeight = imageWidth / targetRatio;
  return {
    sourceX: 0,
    sourceY: (imageHeight - sourceHeight) / 2,
    sourceWidth: imageWidth,
    sourceHeight
  };
}

function createAnalysisCanvas(image, containerWidth, containerHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = ANALYSIS_WIDTH;
  canvas.height = Math.max(42, Math.round(ANALYSIS_WIDTH * (containerHeight / containerWidth)));

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Canvas analysis is unavailable.');
  }

  const source = getCoverSourceRect(image, containerWidth, containerHeight);
  ctx.drawImage(
    image,
    source.sourceX,
    source.sourceY,
    source.sourceWidth,
    source.sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { canvas, imageData };
}

function getPixelStats(imageData, index) {
  const data = imageData.data;
  const r = data[index] / 255;
  const g = data[index + 1] / 255;
  const b = data[index + 2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const luma = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  return { r, g, b, luma, saturation };
}

function buildSaliencyMask(imageData, reservedRects, containerWidth, containerHeight) {
  const { width, height } = imageData;
  const luma = new Float32Array(width * height);
  const saturation = new Float32Array(width * height);
  let totalLuma = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = y * width + x;
      const stats = getPixelStats(imageData, pixelIndex * 4);
      luma[pixelIndex] = stats.luma;
      saturation[pixelIndex] = stats.saturation;
      totalLuma += stats.luma;
    }
  }

  const averageLuma = totalLuma / luma.length;
  const scores = new Float32Array(width * height);
  const scoreList = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = y * width + x;
      const right = x < width - 1 ? pixelIndex + 1 : pixelIndex;
      const down = y < height - 1 ? pixelIndex + width : pixelIndex;
      const edge = Math.abs(luma[pixelIndex] - luma[right]) + Math.abs(luma[pixelIndex] - luma[down]);
      const centerX = Math.abs((x / Math.max(1, width - 1)) - 0.5);
      const centerY = Math.abs((y / Math.max(1, height - 1)) - 0.45);
      const centerBias = 1 + ((1 - clamp(centerX + centerY, 0, 1)) * 0.3);
      const contrast = Math.abs(luma[pixelIndex] - averageLuma);
      const score = ((edge * 2.2) + (saturation[pixelIndex] * 0.55) + (contrast * 0.65)) * centerBias;
      scores[pixelIndex] = score;
      scoreList.push(score);
    }
  }

  const threshold = percentile(scoreList, 0.72);
  const mask = Array.from({ length: height }, () => Array(width).fill(false));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (scores[y * width + x] >= threshold) {
        mask[y][x] = true;
      }
    }
  }

  for (const rect of reservedRects) {
    const startX = Math.floor((rect.x / containerWidth) * width);
    const endX = Math.ceil(((rect.x + rect.width) / containerWidth) * width);
    const startY = Math.floor((rect.y / containerHeight) * height);
    const endY = Math.ceil(((rect.y + rect.height) / containerHeight) * height);

    for (let y = clamp(startY, 0, height - 1); y <= clamp(endY, 0, height - 1); y += 1) {
      for (let x = clamp(startX, 0, width - 1); x <= clamp(endX, 0, width - 1); x += 1) {
        mask[y][x] = true;
      }
    }
  }

  return dilateMask(mask, 2);
}

function dilateMask(mask, radius) {
  const height = mask.length;
  const width = mask[0]?.length || 0;
  const nextMask = Array.from({ length: height }, () => Array(width).fill(false));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!mask[y][x]) continue;
      for (let dy = -radius; dy <= radius; dy += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          const nextY = y + dy;
          const nextX = x + dx;
          if (nextY >= 0 && nextY < height && nextX >= 0 && nextX < width) {
            nextMask[nextY][nextX] = true;
          }
        }
      }
    }
  }

  return nextMask;
}

function findMaximumEmptyRectangle(blockedMask, containerWidth, containerHeight, preferredWidth, preferredHeight) {
  const rows = blockedMask.length;
  const cols = blockedMask[0]?.length || 0;
  const heights = Array(cols).fill(0);
  let best = null;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      heights[col] = blockedMask[row][col] ? 0 : heights[col] + 1;
    }

    const stack = [];
    for (let col = 0; col <= cols; col += 1) {
      const currentHeight = col === cols ? 0 : heights[col];
      while (stack.length && currentHeight < heights[stack[stack.length - 1]]) {
        const heightCells = heights[stack.pop()];
        const startCol = stack.length ? stack[stack.length - 1] + 1 : 0;
        const widthCells = col - startCol;
        const rect = {
          x: (startCol / cols) * containerWidth,
          y: ((row - heightCells + 1) / rows) * containerHeight,
          width: (widthCells / cols) * containerWidth,
          height: (heightCells / rows) * containerHeight
        };

        if (rect.width < Math.min(MIN_TITLE_WIDTH, preferredWidth * 0.68) || rect.height < Math.min(MIN_TITLE_HEIGHT, preferredHeight * 0.72)) {
          continue;
        }

        const centerX = (rect.x + rect.width / 2) / containerWidth;
        const centerY = (rect.y + rect.height / 2) / containerHeight;
        const rightSideBias = centerX > 0.48 ? 1.16 : 0.98;
        const readingBandBias = 1 - Math.min(0.28, Math.abs(centerY - 0.36) * 0.42);
        const fitBias = Math.min(1.25, rect.width / preferredWidth) * Math.min(1.2, rect.height / preferredHeight);
        const score = rect.width * rect.height * rightSideBias * readingBandBias * fitBias;

        if (!best || score > best.score) {
          best = { ...rect, score };
        }
      }
      stack.push(col);
    }
  }

  return best;
}

function sampleContrast(imageData, canvas, rect, containerWidth, containerHeight) {
  const startX = clamp(Math.floor((rect.x / containerWidth) * canvas.width), 0, canvas.width - 1);
  const endX = clamp(Math.ceil(((rect.x + rect.width) / containerWidth) * canvas.width), startX + 1, canvas.width);
  const startY = clamp(Math.floor((rect.y / containerHeight) * canvas.height), 0, canvas.height - 1);
  const endY = clamp(Math.ceil(((rect.y + rect.height) / containerHeight) * canvas.height), startY + 1, canvas.height);
  const luminanceValues = [];
  let total = 0;

  for (let y = startY; y < endY; y += 1) {
    for (let x = startX; x < endX; x += 1) {
      const stats = getPixelStats(imageData, ((y * canvas.width) + x) * 4);
      luminanceValues.push(stats.luma);
      total += stats.luma;
    }
  }

  const average = total / Math.max(1, luminanceValues.length);
  const low = percentile(luminanceValues, 0.18);
  const high = percentile(luminanceValues, 0.82);
  const variation = high - low;
  const lightContrast = 1.05 / (average + 0.05);
  const darkContrast = (average + 0.05) / 0.05;

  return {
    textTone: lightContrast >= darkContrast ? 'light' : 'dark',
    overlayStrength: variation > 0.34 ? 'strong' : variation > 0.22 ? 'medium' : 'soft'
  };
}

export function normalizeBannerLayout(layout = null) {
  return {
    ...DEFAULT_BANNER_LAYOUT,
    ...(layout || {})
  };
}

export function analyzeBannerTitlePlacement({
  image,
  containerWidth,
  containerHeight,
  preferredLayout,
  reservedRects = []
}) {
  if (!image || !containerWidth || !containerHeight) {
    throw new Error('Banner image and dimensions are required.');
  }

  const preferred = normalizeBannerLayout(preferredLayout);
  const { canvas, imageData } = createAnalysisCanvas(image, containerWidth, containerHeight);
  const blockedMask = buildSaliencyMask(imageData, reservedRects, containerWidth, containerHeight);
  const emptyRect = findMaximumEmptyRectangle(
    blockedMask,
    containerWidth,
    containerHeight,
    preferred.width,
    preferred.height
  );

  if (!emptyRect) {
    throw new Error('No title-sized empty region was found.');
  }

  const maxWidth = Math.max(MIN_TITLE_WIDTH, emptyRect.width - (EDGE_PADDING * 2));
  const maxHeight = Math.max(MIN_TITLE_HEIGHT, emptyRect.height - (EDGE_PADDING * 2));
  const width = clamp(preferred.width, MIN_TITLE_WIDTH, Math.min(maxWidth, containerWidth - EDGE_PADDING * 2));
  const height = clamp(preferred.height, MIN_TITLE_HEIGHT, Math.min(maxHeight, containerHeight - EDGE_PADDING * 2));
  const rectCenterX = (emptyRect.x + emptyRect.width / 2) / containerWidth;
  const left = rectCenterX > 0.5
    ? emptyRect.x + emptyRect.width - width - EDGE_PADDING
    : emptyRect.x + (emptyRect.width - width) / 2;
  const top = emptyRect.y + (emptyRect.height - height) / 2;
  const placementRect = {
    x: clamp(left, EDGE_PADDING, containerWidth - width - EDGE_PADDING),
    y: clamp(top, EDGE_PADDING, containerHeight - height - EDGE_PADDING),
    width,
    height
  };
  const contrast = sampleContrast(imageData, canvas, placementRect, containerWidth, containerHeight);

  return {
    leftPercent: (placementRect.x / containerWidth) * 100,
    topPercent: (placementRect.y / containerHeight) * 100,
    width: placementRect.width,
    height: placementRect.height,
    textTone: contrast.textTone,
    overlayStrength: contrast.overlayStrength,
    placementMode: 'auto',
    placementVersion: 1
  };
}
