import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Star, Flame, Clock, Hourglass, Move, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { analyzeBannerTitlePlacement, normalizeBannerLayout } from '../utils/bannerPlacement';
import { getBrandfetchStudioLogoSources } from '../utils/brandfetch';
import { getPrimaryHltbText } from '../utils/hltb';
import { getProtonDbSummary } from '../utils/protondb';
import LibraryOverflowMenu from './LibraryOverflowMenu';

let youtubeIframeApiPromise = null;

function loadYouTubeIframeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('YouTube iframe API is unavailable'));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeIframeApiPromise) return youtubeIframeApiPromise;

  youtubeIframeApiPromise = new Promise((resolve, reject) => {
    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof existingCallback === 'function') existingCallback();
      resolve(window.YT);
    };

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => reject(new Error('YouTube iframe API failed to load'));
    document.head.appendChild(script);
  });

  return youtubeIframeApiPromise;
}

function loadCanvasReadableImage(src) {
  if (typeof Image === 'undefined') {
    return Promise.reject(new Error('Image loading is unavailable'));
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Banner image is not CORS-readable'));
    image.src = src;
  });
}

function isCanvasReadBlocked(error) {
  const message = String(error?.message || '').toLowerCase();
  return error?.name === 'SecurityError'
    || message.includes('tainted')
    || message.includes('cross-origin')
    || message.includes('cors')
    || message.includes('insecure operation');
}

export default function GameMainBanner({ 
  game, 
  onLaunch, 
  onToggleFavorite, 
  onEditMetadata, 
  onRemoveGame,
  isRunning,
  bannerAnimation = true,
  trailerPlayback = null,
  trailerMutedByDefault = false,
  onTrailerEnded,
  studioLogosEnabled = false,
  brandfetchClientId = '',
  brandfetchCacheVersion = 0,
  protonDbEnabled = false,
  onUpdateGameBannerLayout,
  editMode: controlledEditMode,
  setEditMode: controlledSetEditMode
}) {
  const [localEditMode, setLocalEditMode] = useState(false);
  const [studioLogoMode, setStudioLogoMode] = useState('lightLogo');
  const [acceptedStudioLogoUrl, setAcceptedStudioLogoUrl] = useState(null);

  const editMode = controlledEditMode !== undefined ? controlledEditMode : localEditMode;
  const setEditMode = controlledSetEditMode !== undefined ? controlledSetEditMode : setLocalEditMode;

  // Layout state initialized from game
  const initialLayout = normalizeBannerLayout(game?.bannerLayout);

  const [activeLayout, setActiveLayout] = useState(initialLayout);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [autoPlacementStatus, setAutoPlacementStatus] = useState('idle');
  const [animateTitlePlacement, setAnimateTitlePlacement] = useState(false);
  const [isTrailerMuted, setIsTrailerMuted] = useState(Boolean(trailerMutedByDefault));
  const [isTrailerCurtainLifted, setIsTrailerCurtainLifted] = useState(false);
  const [trailerProgress, setTrailerProgress] = useState(0);

  const bannerRef = useRef(null);
  const backdropImgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const trailerFrameRef = useRef(null);
  const trailerPlayerRef = useRef(null);
  const isTrailerMutedRef = useRef(Boolean(trailerMutedByDefault));
  const autoPlacementGameRef = useRef(null);
  
  // Keep a ref of the layout to avoid stale closure state in mouse event handlers
  const layoutRef = useRef(activeLayout);
  const dragStartRef = useRef(null);
  const resizeStartRef = useRef(null);
  const handlersRef = useRef({});

  // Sync state when game changes
  useEffect(() => {
    const updated = normalizeBannerLayout(game?.bannerLayout);
    setAnimateTitlePlacement(Boolean(game?.bannerLayout));
    setActiveLayout(updated);
    layoutRef.current = updated;
    setAutoPlacementStatus('idle');
  }, [game?.id, game?.bannerLayout]);

  useEffect(() => {
    layoutRef.current = activeLayout;
  }, [activeLayout]);

  useEffect(() => {
    setStudioLogoMode('lightLogo');
    setAcceptedStudioLogoUrl(null);
  }, [game?.developer, studioLogosEnabled, brandfetchClientId, brandfetchCacheVersion]);

  // Clean up global listeners if component unmounts
  useEffect(() => {
    return () => {
      const h = handlersRef.current;
      if (h.dragMove) document.removeEventListener('mousemove', h.dragMove);
      if (h.dragEnd) document.removeEventListener('mouseup', h.dragEnd);
      if (h.resizeMove) document.removeEventListener('mousemove', h.resizeMove);
      if (h.resizeEnd) document.removeEventListener('mouseup', h.resizeEnd);
    };
  }, []);

  const getReservedRects = useCallback(() => {
    const bannerRect = bannerRef.current?.getBoundingClientRect();
    const contentRect = contentRef.current?.getBoundingClientRect();
    if (!bannerRect || !contentRect) return [];

    return [{
      x: Math.max(0, contentRect.left - bannerRect.left - 24),
      y: Math.max(0, contentRect.top - bannerRect.top - 24),
      width: Math.min(bannerRect.width, contentRect.width + 48),
      height: Math.min(bannerRect.height, contentRect.height + 48)
    }];
  }, []);

  const applyAutoPlacement = useCallback(async ({ persist = false, animate = false } = {}) => {
    const image = backdropImgRef.current;
    const bannerRect = bannerRef.current?.getBoundingClientRect();

    if (!game?.bannerUrl || !image || !bannerRect?.width || !bannerRect?.height) {
      return null;
    }

    if (!image.complete || !image.naturalWidth) {
      return null;
    }

    setAutoPlacementStatus('analyzing');

    const buildPlacement = (analysisImage) => analyzeBannerTitlePlacement({
      image: analysisImage,
      containerWidth: bannerRect.width,
      containerHeight: bannerRect.height,
      preferredLayout: layoutRef.current,
      reservedRects: getReservedRects()
    });

    try {
      let nextLayout;

      try {
        nextLayout = buildPlacement(image);
      } catch (error) {
        if (!isCanvasReadBlocked(error)) {
          throw error;
        }

        const readableImage = await loadCanvasReadableImage(game.bannerUrl);
        nextLayout = buildPlacement(readableImage);
      }

      setAnimateTitlePlacement(animate);
      setActiveLayout(nextLayout);
      layoutRef.current = nextLayout;
      setAutoPlacementStatus('ready');

      if (persist && onUpdateGameBannerLayout) {
        await onUpdateGameBannerLayout(game.id, nextLayout);
      }

      return nextLayout;
    } catch (error) {
      setAutoPlacementStatus('blocked');
      return null;
    }
  }, [game?.bannerUrl, game?.id, getReservedRects, onUpdateGameBannerLayout]);

  useEffect(() => {
    if (!game?.id || !game?.bannerUrl || game?.bannerLayout) return;
    if (autoPlacementGameRef.current === game.id) return;

    const frame = requestAnimationFrame(() => {
      applyAutoPlacement({ persist: true, animate: false }).then((layout) => {
        if (layout) {
          autoPlacementGameRef.current = game.id;
        }
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [applyAutoPlacement, game?.bannerLayout, game?.bannerUrl, game?.id]);

  const getSteamRating = (rating) => {
    let numericRating = parseFloat(rating);
    if (isNaN(numericRating)) {
      const lower = String(rating || '').toLowerCase();
      if (lower.includes('positive')) {
        return { 
          label: rating, 
          class: lower.includes('overwhelmingly') ? 'overwhelmingly-positive' : lower.includes('very') ? 'very-positive' : 'mostly-positive' 
        };
      } else if (lower.includes('mixed')) {
        return { label: rating, class: 'mixed' };
      } else if (lower.includes('negative')) {
        return { label: rating, class: 'mostly-negative' };
      }
      return { label: rating || 'Mostly Positive', class: 'mostly-positive' };
    }

    if (numericRating >= 4.8) {
      return { label: 'Overwhelmingly Positive', class: 'overwhelmingly-positive' };
    } else if (numericRating >= 4.5) {
      return { label: 'Very Positive', class: 'very-positive' };
    } else if (numericRating >= 4.0) {
      return { label: 'Mostly Positive', class: 'mostly-positive' };
    } else if (numericRating >= 3.0) {
      return { label: 'Mixed', class: 'mixed' };
    } else if (numericRating >= 2.0) {
      return { label: 'Mostly Negative', class: 'mostly-negative' };
    } else if (numericRating >= 1.0) {
      return { label: 'Very Negative', class: 'very-negative' };
    } else {
      return { label: 'Overwhelmingly Negative', class: 'overwhelmingly-negative' };
    }
  };

  const ratingData = getSteamRating(game?.rating);
  const hltbText = getPrimaryHltbText(game?.hltb);
  const protonSummary = protonDbEnabled ? getProtonDbSummary(game?.protonDbSummary) : null;
  const bannerTransitionKey = game?.id || game?.title;
  const shouldShowTrailer = Boolean(
    trailerPlayback?.visible &&
    trailerPlayback?.gameId === game?.id &&
    trailerPlayback?.embedUrl &&
    !editMode
  );
  const trailerOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const trailerUrl = shouldShowTrailer
    ? `${trailerPlayback.embedUrl}?autoplay=1&mute=${trailerMutedByDefault ? '1' : '0'}&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1${trailerOrigin ? `&origin=${encodeURIComponent(trailerOrigin)}` : ''}`
    : null;

  useEffect(() => {
    setIsTrailerMuted(Boolean(trailerMutedByDefault));
    setIsTrailerCurtainLifted(false);
    setTrailerProgress(0);
  }, [trailerMutedByDefault, trailerPlayback?.gameId, trailerPlayback?.videoId, trailerPlayback?.embedUrl]);

  useEffect(() => {
    isTrailerMutedRef.current = isTrailerMuted;
  }, [isTrailerMuted]);

  const sendTrailerAudioCommand = useCallback((muted) => {
    const player = trailerPlayerRef.current;
    try {
      if (muted) {
        player?.mute?.();
      } else {
        player?.unMute?.();
        player?.setVolume?.(80);
      }
    } catch {
      // Fall through to iframe commands below.
    }

    const frameWindow = trailerFrameRef.current?.contentWindow;
    if (!frameWindow) return;

    try {
      frameWindow.postMessage(JSON.stringify({
        event: 'command',
        func: muted ? 'mute' : 'unMute',
        args: []
      }), 'https://www.youtube.com');

      if (!muted) {
        frameWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'setVolume',
          args: [80]
        }), 'https://www.youtube.com');
      }
    } catch {
      // The iframe can ignore commands while it is still loading.
    }
  }, []);

  useEffect(() => {
    if (!shouldShowTrailer) return undefined;

    let cancelled = false;
    let player = null;

    const handleMessage = (event) => {
      if (!String(event.origin || '').includes('youtube.com')) return;

      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data?.event === 'onStateChange') {
        if (Number(data?.info) === 0) {
          onTrailerEnded?.(game?.id);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    loadYouTubeIframeApi().then((yt) => {
      if (cancelled || !trailerFrameRef.current || !yt?.Player) return;
      player = new yt.Player(trailerFrameRef.current, {
        events: {
          onReady: (event) => {
            trailerPlayerRef.current = event.target;
            sendTrailerAudioCommand(isTrailerMutedRef.current);
          },
          onStateChange: (event) => {
            if (Number(event?.data) === Number(yt.PlayerState?.ENDED ?? 0)) {
              onTrailerEnded?.(game?.id);
            }
          }
        }
      });
    }).catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener('message', handleMessage);
      try {
        player?.destroy?.();
      } catch {
        // The iframe can already be gone during fast game switches.
      }
      if (trailerPlayerRef.current === player) {
        trailerPlayerRef.current = null;
      }
    };
  }, [game?.id, onTrailerEnded, sendTrailerAudioCommand, shouldShowTrailer]);

  useEffect(() => {
    if (!shouldShowTrailer) return;
    sendTrailerAudioCommand(isTrailerMuted);
  }, [isTrailerMuted, sendTrailerAudioCommand, shouldShowTrailer]);

  useEffect(() => {
    if (!shouldShowTrailer) {
      setIsTrailerCurtainLifted(false);
      setTrailerProgress(0);
      return undefined;
    }

    setIsTrailerCurtainLifted(false);
    const timer = setTimeout(() => {
      setIsTrailerCurtainLifted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [shouldShowTrailer, trailerPlayback?.gameId, trailerPlayback?.videoId, trailerPlayback?.embedUrl]);

  useEffect(() => {
    if (!shouldShowTrailer) {
      setTrailerProgress(0);
      return undefined;
    }

    const interval = setInterval(() => {
      const player = trailerPlayerRef.current;
      if (!player?.getCurrentTime || !player?.getDuration) return;

      try {
        const duration = Number(player.getDuration()) || 0;
        const currentTime = Number(player.getCurrentTime()) || 0;
        if (duration > 0) {
          setTrailerProgress(Math.max(0, Math.min(1, currentTime / duration)));
        }
      } catch {
        // The player can briefly reject reads while changing state.
      }
    }, 250);

    return () => clearInterval(interval);
  }, [shouldShowTrailer, trailerPlayback?.gameId, trailerPlayback?.videoId, trailerPlayback?.embedUrl]);

  const handleTrailerLoad = () => {
    try {
      trailerFrameRef.current?.contentWindow?.postMessage(JSON.stringify({
        event: 'listening',
        id: `nexus-trailer-${game?.id || 'selected'}`
      }), '*');
      sendTrailerAudioCommand(isTrailerMutedRef.current);
    } catch {
      // YouTube embeds can reject messaging during navigation; playback still works.
    }
  };

  const handleTrailerMuteToggle = () => {
    audioEngine.playClickPulse();
    setIsTrailerMuted(prev => !prev);
  };

  if (!game) return null;

  const handleLaunchClick = () => {
    audioEngine.playClickPulse();
    onLaunch(game);
  };

  const handleFavoriteClick = () => {
    audioEngine.playClickPulse();
    onToggleFavorite(game.id);
  };

  const parallaxClass = bannerAnimation ? ' backdrop-parallax' : '';
  const studioLogoSources = studioLogosEnabled
    ? getBrandfetchStudioLogoSources(game.developer, brandfetchClientId, brandfetchCacheVersion)
    : null;

  const activeStudioLogoMode = studioLogoSources ? studioLogoMode : 'hidden';
  const activeWordmarkProbeUrl = activeStudioLogoMode === 'lightLogo'
    ? studioLogoSources?.lightLogoProbeUrl
    : activeStudioLogoMode === 'defaultLogo'
      ? studioLogoSources?.defaultLogoProbeUrl
      : null;
  const activeWordmarkDisplayUrl = activeStudioLogoMode === 'lightLogo'
    ? studioLogoSources?.lightLogoUrl
    : activeStudioLogoMode === 'defaultLogo'
      ? studioLogoSources?.defaultLogoUrl
      : null;
  const studioLogoUrl = activeStudioLogoMode === 'icon'
    ? studioLogoSources?.iconUrl
    : activeStudioLogoMode === 'gameIcon'
      ? game.iconUrl
    : acceptedStudioLogoUrl;
  const shouldProbeStudioWordmark = activeWordmarkProbeUrl && activeWordmarkDisplayUrl && !acceptedStudioLogoUrl;

  const useNextStudioLogoMode = () => {
    setAcceptedStudioLogoUrl(null);
    setStudioLogoMode(prev => {
      if (prev === 'lightLogo') return 'defaultLogo';
      if (prev === 'defaultLogo') return game.iconUrl ? 'gameIcon' : 'icon';
      if (prev === 'gameIcon') return 'icon';
      return 'hidden';
    });
  };

  const handleStudioLogoProbeLoad = (event) => {
    const { naturalWidth } = event.currentTarget;
    if (naturalWidth >= 200 && activeWordmarkDisplayUrl) {
      setAcceptedStudioLogoUrl(activeWordmarkDisplayUrl);
    } else {
      useNextStudioLogoMode();
    }
  };

  const handleStudioLogoProbeError = () => {
    useNextStudioLogoMode();
  };

  const handleStudioLogoError = () => {
    if (activeStudioLogoMode === 'icon') {
      setStudioLogoMode(game.iconUrl ? 'gameIcon' : 'hidden');
      return;
    }

    if (activeStudioLogoMode === 'gameIcon') {
      setStudioLogoMode('hidden');
      return;
    }

    useNextStudioLogoMode();
  };

  const visibleStudioLogoClass = activeStudioLogoMode === 'icon'
    || activeStudioLogoMode === 'gameIcon'
    ? 'studio-icon-logo'
    : `studio-wordmark-logo ${activeStudioLogoMode === 'lightLogo' ? 'studio-logo-on-black' : 'studio-logo-on-white'}`;

  const visibleStudioLogoUrl = activeStudioLogoMode !== 'hidden'
    ? studioLogoUrl
    : null;
  const shouldShowDeveloperText = !visibleStudioLogoUrl || activeStudioLogoMode === 'icon' || activeStudioLogoMode === 'gameIcon';
  const developerLogoBadgeClass = activeStudioLogoMode === 'icon' || activeStudioLogoMode === 'gameIcon' ? 'developer-name-icon-badge' : '';

  // Playtime formatting (convert seconds to hours and minutes)
  const formatPlaytime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs === 0) return `${mins} mins`;
    return `${hrs}h ${mins}m`;
  };

  const handleBackdropLoad = () => {
    if (!game?.bannerLayout) {
      applyAutoPlacement({ persist: true, animate: false }).then((layout) => {
        if (layout) {
          autoPlacementGameRef.current = game.id;
        }
      });
    }
  };

  const handleAutoPlacementClick = () => {
    audioEngine.playClickPulse();
    applyAutoPlacement({ persist: true, animate: true });
  };

  // Drag start handler
  const handleDragStart = (e) => {
    if (!editMode) return;
    // Don't drag if clicking a resize handle
    if (e.target.classList.contains('resize-handle')) return;
    
    e.preventDefault();
    audioEngine.playClickPulse();
    setIsDragging(true);

    const bannerRect = bannerRef.current.getBoundingClientRect();
    const currentLeftPx = (layoutRef.current.leftPercent / 100) * bannerRect.width;
    const currentTopPx = (layoutRef.current.topPercent / 100) * bannerRect.height;

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeftPx: currentLeftPx,
      startTopPx: currentTopPx,
      bannerWidth: bannerRect.width,
      bannerHeight: bannerRect.height
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!dragStartRef.current) return;
    const { startX, startY, startLeftPx, startTopPx, bannerWidth, bannerHeight } = dragStartRef.current;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newLeftPx = startLeftPx + deltaX;
    let newTopPx = startTopPx + deltaY;

    // Clamp inside container
    const maxLeftPx = bannerWidth - layoutRef.current.width;
    const maxTopPx = bannerHeight - layoutRef.current.height;

    newLeftPx = Math.max(0, Math.min(newLeftPx, maxLeftPx));
    newTopPx = Math.max(0, Math.min(newTopPx, maxTopPx));

    const leftPercent = (newLeftPx / bannerWidth) * 100;
    const topPercent = (newTopPx / bannerHeight) * 100;

    setActiveLayout(prev => ({
      ...prev,
      leftPercent,
      topPercent
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);

    // Save database update
    if (onUpdateGameBannerLayout) {
      onUpdateGameBannerLayout(game.id, layoutRef.current);
    }
  };

  // Resize start handler
  const handleResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    audioEngine.playClickPulse();
    setIsResizing(true);

    const bannerRect = bannerRef.current.getBoundingClientRect();
    const currentLeftPx = (layoutRef.current.leftPercent / 100) * bannerRect.width;
    const currentTopPx = (layoutRef.current.topPercent / 100) * bannerRect.height;

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeftPx: currentLeftPx,
      startTopPx: currentTopPx,
      startWidth: layoutRef.current.width,
      startHeight: layoutRef.current.height,
      direction,
      bannerWidth: bannerRect.width,
      bannerHeight: bannerRect.height
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    if (!resizeStartRef.current) return;
    const { 
      startX, 
      startY, 
      startLeftPx, 
      startTopPx, 
      startWidth, 
      startHeight, 
      direction,
      bannerWidth, 
      bannerHeight 
    } = resizeStartRef.current;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeftPx = startLeftPx;
    let newTopPx = startTopPx;

    const minWidth = 150;
    const minHeight = 60;
    const maxWidth = bannerWidth - startLeftPx;
    const maxHeight = bannerHeight - startTopPx;

    // Horizonal
    if (direction.includes('e')) {
      newWidth = Math.max(minWidth, Math.min(startWidth + deltaX, maxWidth));
    } else if (direction.includes('w')) {
      const maxDeltaX = startWidth - minWidth;
      const appliedDeltaX = Math.max(-startLeftPx, Math.min(deltaX, maxDeltaX));
      newLeftPx = startLeftPx + appliedDeltaX;
      newWidth = startWidth - appliedDeltaX;
    }

    // Vertical
    if (direction.includes('s')) {
      newHeight = Math.max(minHeight, Math.min(startHeight + deltaY, maxHeight));
    } else if (direction.includes('n')) {
      const maxDeltaY = startHeight - minHeight;
      const appliedDeltaY = Math.max(-startTopPx, Math.min(deltaY, maxDeltaY));
      newTopPx = startTopPx + appliedDeltaY;
      newHeight = startHeight - appliedDeltaY;
    }

    const leftPercent = (newLeftPx / bannerWidth) * 100;
    const topPercent = (newTopPx / bannerHeight) * 100;

    setActiveLayout(prev => ({
      ...prev,
      leftPercent,
      topPercent,
      width: newWidth,
      height: newHeight
    }));
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    resizeStartRef.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);

    // Save database update
    if (onUpdateGameBannerLayout) {
      onUpdateGameBannerLayout(game.id, layoutRef.current);
    }
  };

  // Store handler references for cleanup
  handlersRef.current = { dragMove: handleDragMove, dragEnd: handleDragEnd, resizeMove: handleResizeMove, resizeEnd: handleResizeEnd };

  // Recommended snap positions
  const presetSnapPoints = [
    { id: 'top-left', name: 'Top Left', leftPercent: 5, topPercent: 8, label: '◆' },
    { id: 'top-right', name: 'Top Right', leftPercent: 65, topPercent: 8, label: '◆' },
    { id: 'bottom-right', name: 'Bottom Right', leftPercent: 65, topPercent: 60, label: '◆' },
    { id: 'reset-default', name: 'RESET', leftPercent: 65, topPercent: 30, width: 400, height: 120, label: '↺' }
  ];

  return (
    <div className={`game-main-banner-container ${shouldShowTrailer ? 'trailer-active' : ''}`} ref={bannerRef}>
      {/* Background Dissolve Backdrop Canvas */}
      <div className="backdrop-image-mask">
          {game.bannerUrl ? (
            <img 
              ref={backdropImgRef}
              src={game.bannerUrl} 
              alt={game.title} 
              className={`banner-backdrop-img${parallaxClass}`} 
              key={game.id}
              onLoad={handleBackdropLoad}
            />
          ) : (
            <div className={`banner-backdrop-img banner-art-placeholder${parallaxClass}`} key={game.id}>
              <span>SteamGridDB artwork pending</span>
            </div>
          )}
        <div className="backdrop-overlay-vignette" />
      </div>

      <div className={`banner-trailer-layer ${shouldShowTrailer ? 'is-visible' : ''}`}>
        {shouldShowTrailer && (
          <>
            <div className="banner-trailer-stage">
              <iframe
                ref={trailerFrameRef}
                key={`${game.id}-${trailerPlayback.videoId || trailerPlayback.embedUrl}`}
                className="banner-trailer-frame"
                src={trailerUrl}
                title={trailerPlayback.title || `${game.title} trailer`}
                allow="autoplay; encrypted-media"
                onLoad={handleTrailerLoad}
              />
            </div>
            <div className="banner-trailer-native-chrome">
              <span className={`trailer-status-dot ${isTrailerMuted ? 'is-muted' : ''}`} />
              <button
                type="button"
                className="trailer-audio-toggle"
                onClick={handleTrailerMuteToggle}
                onMouseEnter={audioEngine.playHoverTick}
                aria-label={isTrailerMuted ? 'Unmute trailer' : 'Mute trailer'}
                title={isTrailerMuted ? 'Unmute trailer' : 'Mute trailer'}
              >
                {isTrailerMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
            <div
              className="banner-trailer-scanline"
              style={{ '--trailer-progress': trailerProgress }}
            />
            <div className={`banner-trailer-start-veil ${isTrailerCurtainLifted ? 'is-ready' : ''}`} />
          </>
        )}
      </div>

      {/* Floating Info Overlay Sheet */}
      <div className="banner-content-box" ref={contentRef} key={`banner-content-${bannerTransitionKey}`}>
        {/* Developer & Developer Meta */}
        <div className="developer-meta banner-transition-item transition-developer">
          <span className={`developer-name ${visibleStudioLogoUrl ? 'developer-name-with-logo' : ''} ${developerLogoBadgeClass}`}>
            {shouldProbeStudioWordmark && (
              <img
                src={activeWordmarkProbeUrl}
                alt=""
                className="studio-logo-probe"
                onLoad={handleStudioLogoProbeLoad}
                onError={handleStudioLogoProbeError}
              />
            )}
            {visibleStudioLogoUrl && (
              <img
                src={visibleStudioLogoUrl}
                alt={`${game.developer} logo`}
                className={`developer-studio-logo ${visibleStudioLogoClass} banner-transition-logo`}
                onError={handleStudioLogoError}
              />
            )}
            {shouldShowDeveloperText && <span>{game.developer}</span>}
          </span>
          <span className="dot-divider" />
          <span className="steam-rating">
            Rating: <strong className={`rating-highlight ${ratingData.class}`}>{ratingData.label}</strong>
          </span>
          {protonSummary && (
            <>
              <span className="dot-divider" />
              <span className="protondb-rating">
                Linux: <strong className={`protondb-tier ${protonSummary.className}`}>{protonSummary.label}</strong>
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="game-banner-description banner-transition-item transition-description">
          {game.description}
        </p>

        {/* Change Banner Title Position Trigger Button */}
        {editMode && (
          <div className="banner-edit-toggle-row banner-transition-item transition-edit">
            <button 
              className="glow-btn action-pill-btn banner-edit-btn edit-active"
              onClick={() => {
                audioEngine.playClickPulse();
                setEditMode(false);
              }}
              onMouseEnter={audioEngine.playHoverTick}
              title="Exit Customization"
            >
              <Move size={14} className="edit-icon" />
              <span>Done Customizing Title</span>
            </button>
            <button
              className={`glow-btn action-pill-btn banner-edit-btn auto-place-btn ${autoPlacementStatus === 'ready' ? 'auto-ready' : ''}`}
              onClick={handleAutoPlacementClick}
              onMouseEnter={audioEngine.playHoverTick}
              disabled={autoPlacementStatus === 'analyzing' || !game.bannerUrl}
              title={autoPlacementStatus === 'blocked'
                ? 'Auto placement needs readable cached artwork or a same-origin image'
                : 'Find the clearest readable title position'}
            >
              <Sparkles size={14} className="edit-icon" />
              <span>{autoPlacementStatus === 'analyzing' ? 'Analyzing...' : 'Auto Place Title'}</span>
            </button>
          </div>
        )}

        {/* Telemetry Stats Card */}
        <div className="telemetry-stats-glass-row banner-transition-item transition-stats">
          <div className="stat-glass-card">
            <Clock size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Playtime</span>
              <span className="stat-value">{formatPlaytime(game.playtime)}</span>
            </div>
          </div>

          <div className="stat-glass-card">
            <Flame size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Last Session</span>
              <span className="stat-value">{game.lastPlayed}</span>
            </div>
          </div>

          <div className="stat-glass-card">
            <Hourglass size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">HowLongToBeat</span>
              <span className="stat-value">{hltbText}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="banner-actions-row banner-transition-item transition-actions">
          {/* Main Launch Trigger */}
          <button 
            className={`glow-btn glow-btn-primary play-game-btn ${isRunning ? 'running-pulse' : ''}`}
            onClick={handleLaunchClick}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <Play fill={isRunning ? 'transparent' : 'currentColor'} size={18} />
            <span>{isRunning ? 'Running...' : 'Play Game'}</span>
          </button>

          {/* Toggle Favorite Star */}
          <button 
            className={`glow-btn action-pill-btn fav-pill-btn ${game.isFavorite ? 'active-favorite' : ''}`}
            onClick={handleFavoriteClick}
            onMouseEnter={audioEngine.playHoverTick}
            title="Add to Favorites"
          >
            <Star size={16} fill={game.isFavorite ? 'currentColor' : 'transparent'} />
          </button>

          <LibraryOverflowMenu
            className="banner-library-overflow"
            triggerClassName="glow-btn action-pill-btn banner-overflow-trigger"
            onEditMetadata={() => onEditMetadata(game)}
            onRemove={() => onRemoveGame(game.id)}
          />
        </div>
      </div>

      {/* DRAGGABLE & RESIZABLE TITLE CONTAINER */}
      <div 
        ref={titleRef}
        className={`banner-title-container tone-${activeLayout.textTone || 'light'} contrast-${activeLayout.overlayStrength || 'soft'} ${editMode ? 'edit-mode-active' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''}`}
        style={{
          position: 'absolute',
          left: `${activeLayout.leftPercent}%`,
          top: `${activeLayout.topPercent}%`,
          width: `${activeLayout.width}px`,
          height: `${activeLayout.height}px`,
          transition: (isDragging || isResizing || !animateTitlePlacement) ? 'none' : 'left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 520ms var(--ease-interface), transform 520ms var(--ease-interface)',
          zIndex: 50,
          pointerEvents: 'auto'
        }}
        onMouseDown={handleDragStart}
      >
        {game.logoUrl ? (
          <img
            key={`banner-logo-${bannerTransitionKey}`}
            src={game.logoUrl}
            alt={game.title}
            className="banner-logo-img banner-transition-title"
          />
        ) : (
          <h1 key={`banner-title-${bannerTransitionKey}`} className="banner-game-title banner-transition-title">{game.title}</h1>
        )}

        {/* Drag Hint Overlay */}
        {editMode && (
          <div className="drag-handle-overlay">
            <span>DRAG TO POSITION</span>
          </div>
        )}

        {/* Steam-Style Border Handles for Resizing */}
        {editMode && (
          <>
            <div className="resize-handle n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="resize-handle s" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="resize-handle e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
            <div className="resize-handle w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="resize-handle se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          </>
        )}
      </div>

      {/* Snap Points Layer */}
      {editMode && (
        <div className="snap-points-layer">
          {presetSnapPoints.map(point => {
            const isActive = activeLayout.leftPercent === point.leftPercent && activeLayout.topPercent === point.topPercent;
            return (
              <button
                key={point.id}
                className={`snap-point-marker ${point.id} ${isActive ? 'active' : ''}`}
                style={{
                  position: 'absolute',
                  left: `${point.leftPercent}%`,
                  top: `${point.topPercent}%`,
                  pointerEvents: 'auto'
                }}
                onClick={() => {
                  audioEngine.playClickPulse();
                  const newLayout = point.width && point.height
                    ? { leftPercent: point.leftPercent, topPercent: point.topPercent, width: point.width, height: point.height }
                    : { ...activeLayout, leftPercent: point.leftPercent, topPercent: point.topPercent };
                  setAnimateTitlePlacement(true);
                  setActiveLayout(newLayout);
                  if (onUpdateGameBannerLayout) {
                    onUpdateGameBannerLayout(game.id, newLayout);
                  }
                }}
                title={`Snap to ${point.name}`}
              >
                <span className="marker-shape">{point.label}</span>
                <span className="marker-label">{point.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .game-main-banner-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 520px);
          display: flex;
          align-items: flex-end;
          padding: 0 60px 48px;
          pointer-events: none;
        }

        .game-main-banner-container.trailer-active .banner-content-box,
        .game-main-banner-container.trailer-active .banner-title-container {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
          pointer-events: none !important;
        }

        .backdrop-image-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% + 180px);
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .banner-backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          filter: brightness(0.6) contrast(1.05);
          transition: opacity 1.2s ease-in-out;
          animation: fade-in-backdrop 1.2s forwards ease-in-out;
        }

        .banner-art-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 35%, rgba(var(--accent-color-rgb), 0.22), rgba(7, 7, 10, 0.95) 62%);
          color: rgba(255, 255, 255, 0.42);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes fade-in-backdrop {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 0.65; transform: scale(1.0); }
        }

        .backdrop-image-mask::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 320px;
          background: linear-gradient(
            to bottom,
            rgba(7, 7, 10, 0) 0%,
            rgba(7, 7, 10, 0.22) 38%,
            rgba(7, 7, 10, 0.68) 72%,
            #07070a 100%
          );
          z-index: 3;
          pointer-events: none;
        }

        .backdrop-overlay-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 38%, transparent 12%, rgba(7, 7, 10, 0.18) 48%, rgba(7, 7, 10, 0.82) 100%),
                      linear-gradient(90deg, #07070a 0%, rgba(7, 7, 10, 0.16) 15%, rgba(7, 7, 10, 0.05) 50%, rgba(7, 7, 10, 0.38) 84%, #07070a 100%),
                      linear-gradient(0deg, rgba(7, 7, 10, 0.64) 0%, rgba(7, 7, 10, 0.16) 50%, rgba(7, 7, 10, 0.4) 100%);
          z-index: 2;
        }

        .banner-trailer-layer {
          position: absolute;
          inset: 0;
          z-index: 8;
          opacity: 0;
          transform: scale(1.015);
          pointer-events: none;
          transition: opacity 900ms var(--ease-interface), transform 900ms var(--ease-interface);
          background: #07070a;
          overflow: hidden;
        }

        .banner-trailer-layer.is-visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .banner-trailer-layer::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.02) 0%, rgba(7, 7, 10, 0) 42%, rgba(7, 7, 10, 0.62) 100%),
            linear-gradient(90deg, rgba(7, 7, 10, 0.72) 0%, rgba(7, 7, 10, 0.02) 28%, rgba(7, 7, 10, 0.04) 66%, rgba(7, 7, 10, 0.74) 100%),
            linear-gradient(0deg, rgba(7, 7, 10, 0.88) 0%, rgba(7, 7, 10, 0.06) 36%, rgba(7, 7, 10, 0.32) 100%);
          box-shadow: inset 0 -180px 180px rgba(7, 7, 10, 0.66), inset 0 0 140px rgba(0, 0, 0, 0.46);
        }

        .banner-trailer-start-veil {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 50% 40%, rgba(var(--accent-color-rgb), 0.12) 0%, rgba(7, 7, 10, 0.72) 42%, rgba(7, 7, 10, 0.94) 100%),
            linear-gradient(0deg, rgba(7, 7, 10, 0.98), rgba(7, 7, 10, 0.74));
          opacity: 1;
          transition: opacity 520ms var(--ease-interface);
        }

        .banner-trailer-start-veil.is-ready {
          opacity: 0;
        }

        .banner-trailer-stage {
          position: absolute;
          inset: -88px -80px -88px;
          overflow: hidden;
        }

        .banner-trailer-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw;
          min-width: 100%;
          min-height: 100%;
          border: 0;
          display: block;
          background: #07070a;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(1.18);
          filter: saturate(1.08) contrast(1.04) brightness(0.86);
        }

        .banner-trailer-native-chrome {
          position: absolute;
          left: 60px;
          bottom: 42px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 92px;
          height: 44px;
          padding: 0 10px 0 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          background: rgba(7, 7, 10, 0.58);
          color: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
          pointer-events: auto;
        }

        .trailer-status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 14px rgba(var(--accent-color-rgb), 0.95);
          transition: background var(--transition-fast), box-shadow var(--transition-fast), opacity var(--transition-fast);
        }

        .trailer-status-dot.is-muted {
          background: rgba(255, 255, 255, 0.16);
          box-shadow: none;
          opacity: 0.45;
        }

        .trailer-audio-toggle {
          width: 48px;
          height: 36px;
          border: 0;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          background: transparent;
          color: rgba(255, 255, 255, 0.78);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0 0 10px;
          cursor: pointer;
          transition: color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
        }

        .trailer-audio-toggle svg {
          width: 23px;
          height: 23px;
          stroke-width: 2.25;
        }

        .trailer-audio-toggle:hover,
        .trailer-audio-toggle:focus-visible {
          color: var(--accent-color);
          outline: none;
        }

        .banner-trailer-scanline {
          position: absolute;
          left: 60px;
          right: 60px;
          bottom: 28px;
          z-index: 3;
          height: 2px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.05), transparent);
          opacity: 0.82;
          pointer-events: none;
          overflow: hidden;
          border-radius: 999px;
        }

        .banner-trailer-scanline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(var(--trailer-progress, 0) * 100%);
          min-width: calc(var(--trailer-progress, 0) * 1px);
          background: linear-gradient(90deg, rgba(var(--accent-color-rgb), 0.96), rgba(255, 255, 255, 0.45), rgba(var(--accent-color-rgb), 0.18));
          box-shadow: 0 0 16px rgba(var(--accent-color-rgb), 0.55);
          transition: width 240ms linear;
        }

        .banner-content-box {
          position: relative;
          z-index: 10;
          max-width: 650px;
          height: calc(100% - 24px);
          padding-bottom: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          pointer-events: auto;
          overflow: hidden;
          transition: opacity 520ms var(--ease-interface), transform 520ms var(--ease-interface);
        }

        .banner-transition-item {
          opacity: 0;
          transform: translateY(14px);
          animation: library-banner-element-in 560ms var(--ease-interface) forwards;
          animation-delay: var(--library-transition-delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .transition-developer {
          --library-transition-delay: 70ms;
        }

        .transition-description {
          --library-transition-delay: 140ms;
        }

        .transition-edit {
          --library-transition-delay: 180ms;
        }

        .transition-stats {
          --library-transition-delay: 210ms;
        }

        .transition-actions {
          --library-transition-delay: 280ms;
        }

        .banner-transition-title {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
          animation: library-banner-title-in 680ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 120ms;
          will-change: opacity, transform, filter;
        }

        .banner-transition-logo {
          opacity: 0;
          transform: translateY(6px);
          animation: library-banner-logo-in 460ms var(--ease-interface) forwards;
          animation-delay: 120ms;
          will-change: opacity, transform;
        }

        @keyframes library-banner-element-in {
          0% {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes library-banner-title-in {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
            filter: blur(10px) drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0) drop-shadow(0 0 25px rgba(0, 0, 0, 0.85));
          }
        }

        @keyframes library-banner-logo-in {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }



        /* Absolutely-placed title container */
        .banner-title-container {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 8px;
          isolation: isolate;
          transition: opacity 520ms var(--ease-interface), transform 520ms var(--ease-interface);
        }

        .banner-title-container::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 10px;
          background: rgba(5, 7, 12, 0);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .banner-title-container.contrast-medium::before,
        .banner-title-container.contrast-strong::before {
          opacity: 1;
        }

        .banner-title-container.contrast-medium::before {
          background: rgba(5, 7, 12, 0.18);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
        }

        .banner-title-container.contrast-strong::before {
          background: rgba(5, 7, 12, 0.32);
          box-shadow: 0 18px 56px rgba(0, 0, 0, 0.28);
        }

        .banner-title-container.tone-dark.contrast-medium::before,
        .banner-title-container.tone-dark.contrast-strong::before {
          background: rgba(255, 255, 255, 0.22);
          box-shadow: 0 14px 42px rgba(255, 255, 255, 0.08);
        }

        .banner-title-container.edit-mode-active {
          border: 2.5px dashed var(--accent-color);
          box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.35), inset 0 0 15px rgba(var(--accent-color-rgb), 0.1);
          background: rgba(10, 10, 16, 0.65);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          cursor: grab;
        }

        .banner-title-container.dragging {
          cursor: grabbing;
          border-style: solid;
          box-shadow: 0 0 30px rgba(var(--accent-color-rgb), 0.7), inset 0 0 20px rgba(var(--accent-color-rgb), 0.2);
          background: rgba(10, 10, 16, 0.8);
        }

        .drag-handle-overlay {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-color);
          color: #07070a;
          font-family: var(--font-display);
          font-size: var(--fs-8);
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 4px;
          pointer-events: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 100%;
        }

        /* Steam-Style Border Resize Handles */
        .resize-handle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffffff;
          border: 1.5px solid var(--accent-color);
          border-radius: 50%;
          z-index: 110;
          box-shadow: 0 2px 5px rgba(0,0,0,0.8);
          transition: transform 0.15s var(--ease-interface), background 0.15s var(--ease-interface);
        }

        .resize-handle:hover {
          transform: scale(1.4);
          background: var(--accent-color);
        }

        .resize-handle.n {
          top: -4px;
          left: calc(50% - 4px);
          cursor: ns-resize;
        }
        .resize-handle.s {
          bottom: -4px;
          left: calc(50% - 4px);
          cursor: ns-resize;
        }
        .resize-handle.e {
          right: -4px;
          top: calc(50% - 4px);
          cursor: ew-resize;
        }
        .resize-handle.w {
          left: -4px;
          top: calc(50% - 4px);
          cursor: ew-resize;
        }
        .resize-handle.ne {
          top: -4px;
          right: -4px;
          cursor: nesw-resize;
        }
        .resize-handle.nw {
          top: -4px;
          left: -4px;
          cursor: nwse-resize;
        }
        .resize-handle.se {
          bottom: -4px;
          right: -4px;
          cursor: nwse-resize;
        }
        .resize-handle.sw {
          bottom: -4px;
          left: -4px;
          cursor: nesw-resize;
        }

        /* Snap Points Layer */
        .snap-points-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 40;
        }

        .snap-point-marker {
          background: rgba(10, 10, 16, 0.7);
          border: 1px dashed rgba(var(--accent-color-rgb), 0.45);
          border-radius: 30px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.65);
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          transform: translate(-50%, -50%);
        }

        .snap-point-marker:hover {
          color: #ffffff;
          border-color: var(--accent-color);
          background: rgba(var(--accent-color-rgb), 0.15);
          box-shadow: var(--accent-glow-subtle);
          transform: translate(-50%, -50%) scale(1.08);
        }

        .snap-point-marker.active {
          color: #07070a;
          background: var(--accent-color);
          border-color: var(--accent-color);
          box-shadow: var(--accent-glow);
          transform: translate(-50%, -50%) scale(1.05);
        }

        .marker-shape {
          font-size: var(--fs-10);
        }

        .snap-point-marker.active .marker-shape {
          animation: shape-pulse 1.5s infinite ease-in-out;
        }

        @keyframes shape-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }

        /* Banner title edit action row */
        .banner-edit-toggle-row {
          margin-bottom: 22px;
          display: flex;
        }

        .banner-edit-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-sans);
          font-size: var(--fs-12);
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .banner-edit-btn:hover {
          color: #ffffff;
          background: rgba(var(--accent-color-rgb), 0.08);
          border-color: rgba(var(--accent-color-rgb), 0.35);
          box-shadow: var(--accent-glow-subtle);
        }

        .banner-edit-btn.edit-active {
          background: rgba(var(--accent-color-rgb), 0.15) !important;
          border-color: var(--accent-color) !important;
          color: var(--accent-color) !important;
          box-shadow: var(--accent-glow);
        }

        .auto-place-btn.auto-ready {
          color: #66c0f4;
          border-color: rgba(102, 192, 244, 0.32);
          background: rgba(102, 192, 244, 0.08);
        }

        .auto-place-btn:disabled {
          opacity: 0.56;
          cursor: wait;
        }

        .banner-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.85));
          flex-shrink: 0;
          pointer-events: none;
        }

        .banner-title-container.tone-dark .banner-logo-img {
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.72));
        }

        .banner-game-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: var(--fs-38);
          letter-spacing: 2px;
          line-height: 1.1;
          color: #ffffff;
          text-shadow: 0 0 35px rgba(0, 0, 0, 0.9), 0 3px 15px rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
          text-align: center;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-width: 100%;
          max-height: 100%;
          user-select: none;
          pointer-events: none;
        }

        .banner-title-container.tone-dark .banner-game-title {
          color: #07070a;
          text-shadow: 0 0 24px rgba(255, 255, 255, 0.88), 0 2px 14px rgba(255, 255, 255, 0.58);
        }

        .developer-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .developer-name {
          font-size: var(--fs-18);
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .developer-name-with-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .developer-name-icon-badge {
          background: rgba(0, 0, 0, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 7px 12px;
        }

        .developer-studio-logo {
          object-fit: contain;
          filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.55));
          flex-shrink: 0;
        }

        .studio-logo-probe {
          display: none;
        }

        .studio-wordmark-logo {
          width: auto;
          max-width: 180px;
          height: 32px;
          padding: 7px 12px;
          border-radius: 12px;
          box-sizing: content-box;
        }

        .studio-logo-on-black {
          background: rgba(0, 0, 0, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .studio-logo-on-white {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .studio-icon-logo {
          width: 28px;
          height: 28px;
          border-radius: 8px;
        }

        .steam-rating,
        .protondb-rating {
          font-size: var(--fs-12);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
        }

        .protondb-tier {
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-left: 4px;
          text-shadow: 0 0 10px rgba(0,0,0,0.4);
        }

        .protondb-tier.platinum { color: #a8f3ff; }
        .protondb-tier.gold { color: #ffd166; }
        .protondb-tier.silver { color: #d9e2ec; }
        .protondb-tier.bronze { color: #d39b62; }
        .protondb-tier.borked { color: #ef4444; }
        .protondb-tier.unavailable { color: rgba(255, 255, 255, 0.5); }

        .rating-highlight {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-left: 4px;
          text-shadow: 0 0 10px rgba(0,0,0,0.4);
        }

        .rating-highlight.overwhelmingly-positive,
        .rating-highlight.very-positive,
        .rating-highlight.mostly-positive {
          color: #66c0f4;
        }

        .rating-highlight.mixed {
          color: #b8b22a;
        }

        .rating-highlight.mostly-negative,
        .rating-highlight.very-negative,
        .rating-highlight.overwhelmingly-negative {
          color: #ef4444;
        }

        .dot-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          margin: 0 10px;
        }

        .game-banner-description {
          font-size: var(--fs-14);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .telemetry-stats-glass-row {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          width: 100%;
          flex-shrink: 0;
        }

        .stat-glass-card {
          flex: 0 0 auto;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .stat-icon {
          color: var(--accent-color);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: var(--fs-10);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: var(--fs-12);
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }

        .banner-actions-row {
          display: flex;
          align-items: stretch;
          gap: 12px;
          min-height: 46px;
          width: 100%;
          flex-shrink: 0;
        }

        .play-game-btn {
          padding: 12px 30px;
          font-size: var(--fs-14);
          box-shadow: 0 0 8px rgba(var(--accent-color-rgb), 0.24);
        }

        .play-game-btn:hover {
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.48);
        }

        .play-game-btn.running-pulse {
          background: #ef4444 !important;
          border-color: #ef4444 !important;
          color: #fff !important;
        }

        .action-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          width: auto;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
        }

        .action-pill-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .pinned-active {
          color: var(--accent-color) !important;
          border-color: rgba(var(--accent-color-rgb), 0.3) !important;
          background: rgba(var(--accent-color-rgb), 0.08) !important;
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.2);
        }

        .fav-pill-btn.active-favorite {
          color: #e6af2e !important;
          border-color: rgba(230, 175, 46, 0.3) !important;
          background: rgba(230, 175, 46, 0.08) !important;
          box-shadow: 0 0 10px rgba(230, 175, 46, 0.2);
        }

        .banner-library-overflow {
          align-self: stretch;
        }

        .banner-overflow-trigger {
          width: 42px !important;
          height: 100%;
          min-height: 42px;
          padding: 0 !important;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.45) !important;
        }

        .banner-overflow-trigger svg {
          display: block;
          width: 18px;
          height: 18px;
          flex: 0 0 auto;
          stroke: currentColor;
          stroke-width: 2.5;
        }

        .banner-overflow-trigger:hover,
        .banner-overflow-trigger[aria-expanded="true"] {
          color: #fff !important;
          border-color: rgba(255, 255, 255, 0.16) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-transition-item,
          .banner-transition-title,
          .banner-transition-logo {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}} />
    </div>
  );
}
