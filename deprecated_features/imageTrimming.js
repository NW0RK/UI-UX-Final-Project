/**
 * DEPRECATED IMAGE TRIMMING FUNCTIONALITY
 * 
 * This file contains the complete, original image trimming functionality using the `sharp` library.
 * It has been moved here to decouple it from the main application execution path.
 * 
 * If you wish to re-implement or re-enable this feature in `main.js`, please refer to the integration
 * instructions in `deprecated_features/README.md`.
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Track active trimming promises to prevent concurrent trim operations on the same file
const artworkTrimJobs = new Map();

/**
 * Trims transparent padding around an image with concurrency locking.
 * 
 * @param {string} filePath - Absolute path to the image file.
 * @returns {Promise<object|null>} Details about the trim job or null if unsupported/failed.
 */
export async function trimTransparentPadding(filePath) {
  const normalizedPath = path.resolve(filePath);
  if (artworkTrimJobs.has(normalizedPath)) return artworkTrimJobs.get(normalizedPath);

  const job = trimTransparentPaddingUnsafe(normalizedPath).finally(() => {
    artworkTrimJobs.delete(normalizedPath);
  });

  artworkTrimJobs.set(normalizedPath, job);
  return job;
}

/**
 * Internal unsafe method to perform the cropping/trimming using `sharp`.
 */
export async function trimTransparentPaddingUnsafe(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return null;

  const parsed = path.parse(filePath);
  if (parsed.name.endsWith('.trimmed')) {
    return { filePath, alreadyTrimmed: true };
  }

  const outputPath = path.join(parsed.dir, `${parsed.name}.trimmed${ext}`);
  if (fs.existsSync(outputPath)) {
    return { filePath: outputPath, alreadyTrimmed: true };
  }

  // Read the image using sharp and ensure an alpha channel exists
  const image = sharp(filePath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const alphaIndex = channels - 1;
  const alphaThreshold = 4; // Ignore pixels with alpha <= 4

  let top = height;
  let right = -1;
  let bottom = -1;
  let left = width;

  // Scan pixels to find bounding box of non-transparent areas
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * channels + alphaIndex];
      if (alpha > alphaThreshold) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }

  // If no opaque pixels were found, return null (do not crop)
  if (right < left || bottom < top) return null;

  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  
  // If the bounding box matches the entire image, no trimming is needed
  if (left === 0 && top === 0 && cropWidth === width && cropHeight === height) {
    return { filePath, alreadyTrimmed: true };
  }

  // Generate a random temp path to do the crop atomic write
  const tmpPath = path.join(parsed.dir, `${parsed.name}.trimmed.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}${ext}`);

  await sharp(filePath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .toFile(tmpPath);

  // If output already exists, discard temp file and return existing
  if (fs.existsSync(outputPath)) {
    try { fs.unlinkSync(tmpPath); } catch (e) { /* ignore locked temp cleanup */ }
    return { filePath: outputPath, alreadyTrimmed: true };
  }

  // Rename temp to output path
  fs.renameSync(tmpPath, outputPath);

  return {
    filePath: outputPath,
    original: { width, height },
    trimmed: { width: cropWidth, height: cropHeight },
    crop: { left, top, right: width - right - 1, bottom: height - bottom - 1 }
  };
}

/**
 * Trims the cached logo/icon artwork for a specific game object.
 * NOTE: This function depends on helpers like `getCachedArtworkFilePath`, `toArtworkUrl`, and `emitDiagnostic` from main.js.
 */
export async function trimCachedLogoArtworkForGame(game, helpers) {
  const { getCachedArtworkFilePath, toArtworkUrl, emitDiagnostic } = helpers;
  if (!game?.id) return;

  for (const key of ['logo', 'icon']) {
    const filePath = getCachedArtworkFilePath(game.id, key);
    if (!filePath) continue;

    try {
      const trimDetails = await trimTransparentPadding(filePath);
      if (trimDetails?.filePath) {
        if (key === 'logo') game.logoUrl = toArtworkUrl(trimDetails.filePath);
        if (key === 'icon') game.iconUrl = toArtworkUrl(trimDetails.filePath);
      }
      if (trimDetails && !trimDetails.alreadyTrimmed) {
        emitDiagnostic('Artwork', 'info', `Trimmed transparent padding from cached ${key} artwork for ${game.title || game.id}`, trimDetails);
      }
    } catch (err) {
      emitDiagnostic('Artwork', 'warn', `Could not trim cached ${key} artwork for ${game.title || game.id}: ${err.message}`);
    }
  }
}

/**
 * Trims the cached logo/icon artwork for all games in the database array.
 */
export async function trimCachedLogoArtworkForDatabase(data, helpers) {
  if (!Array.isArray(data)) return;
  for (const game of data) {
    await trimCachedLogoArtworkForGame(game, helpers);
  }
}
