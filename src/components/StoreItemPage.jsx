import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Monitor, Gamepad2, Smartphone, Check, Plus, Link, FolderOpen, Play, Star, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, X, Image as ImageIcon, LineChart, Gift, PackageOpen, KeyRound, RefreshCw, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import LibraryOverflowMenu from './LibraryOverflowMenu';
import { fetchItadHistory, getItadOAuthStatus, getItadOAuthUrl, getItadStoreInsights, hasItadApiKey, lookupItadGameBySteamAppId, syncItadUserLibrary } from '../utils/itad';

const platformIcons = {
  'PC': Monitor,
  'Console': Gamepad2,
  'PS4': Gamepad2,
  'Xbox Series X|S': Gamepad2,
  'Xbox One': Gamepad2,
  'Switch': Gamepad2,
  'Mobile': Smartphone
};

const HIGHCHARTS_VERSION = '12.6.0';
let highchartsLoaderPromise = null;

function loadScriptOnce(src, globalCheck) {
  if (globalCheck()) return Promise.resolve();

  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadHighchartsStock() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Highcharts requires a browser runtime.'));
  if (window.Highcharts?.stockChart) return Promise.resolve(window.Highcharts);

  if (!highchartsLoaderPromise) {
    highchartsLoaderPromise = loadScriptOnce(
      `https://code.highcharts.com/stock/${HIGHCHARTS_VERSION}/highstock.js`,
      () => !!window.Highcharts?.stockChart
    )
      .then(() => loadScriptOnce(
        `https://code.highcharts.com/stock/${HIGHCHARTS_VERSION}/modules/exporting.js`,
        () => !!window.Highcharts?.Chart?.prototype?.exportChart
      ))
      .then(() => window.Highcharts);
  }

  return highchartsLoaderPromise;
}

const MOCK_MEDIA_DATABASE = {
  cyberpunk: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43959-large.mp4' }
      }
    ]
  },
  eldenring: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-spooky-dark-forest-with-fog-and-trees-43285-large.mp4' }
      }
    ]
  },
  hades: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-fire-sparks-rising-in-the-dark-42296-large.mp4' }
      }
    ]
  }
};

function getCuratedMockMedia(gameId, title) {
  const cleanId = (gameId || '').toLowerCase();
  
  if (MOCK_MEDIA_DATABASE[cleanId]) {
    return MOCK_MEDIA_DATABASE[cleanId];
  }

  if (cleanId.includes('starfield') || cleanId.includes('halo') || cleanId.includes('space') || cleanId.includes('horizon')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-realistic-cosmic-nebula-explosion-42845-large.mp4' }
        }
      ]
    };
  }

  if (cleanId.includes('spider') || cleanId.includes('hero') || cleanId.includes('man')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-a-console-game-41865-large.mp4' }
        }
      ]
    };
  }

  if (cleanId.includes('zelda') || cleanId.includes('witcher') || cleanId.includes('fantasy') || cleanId.includes('ring') || cleanId.includes('lies') || cleanId.includes('baldurs')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-epic-foggy-mountain-peaks-at-sunset-42171-large.mp4' }
        }
      ]
    };
  }

  return {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-gamer-playing-first-person-shooter-video-game-41864-large.mp4' }
      }
    ]
  };
}

function cleanSteamDescription(value) {
  if (!value) return '';
  const withLineBreaks = value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n');

  if (typeof document !== 'undefined') {
    const node = document.createElement('div');
    node.innerHTML = withLineBreaks;
    return node.textContent.replace(/\n{3,}/g, '\n\n').trim();
  }

  return withLineBreaks.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getThemeValue(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const bodyValue = document.body
    ? window.getComputedStyle(document.body).getPropertyValue(name).trim()
    : '';
  if (bodyValue) return bodyValue;

  const rootValue = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return rootValue || fallback;
}

function getItadChartTheme() {
  const accentRgb = getThemeValue('--accent-color-rgb', '0, 229, 255');
  const fontSans = getThemeValue('--font-sans', 'Inter, system-ui, sans-serif');
  const fontDisplay = getThemeValue('--font-display', fontSans);

  return {
    accent: `rgba(${accentRgb}, 1)`,
    accentSoft: `rgba(${accentRgb}, 0.14)`,
    accentFaint: `rgba(${accentRgb}, 0.055)`,
    accentLine: `rgba(${accentRgb}, 0.48)`,
    background: 'transparent',
    plotBackground: `rgba(${accentRgb}, 0.035)`,
    grid: 'rgba(255, 255, 255, 0.065)',
    text: '#ffffff',
    mutedText: 'rgba(255, 255, 255, 0.62)',
    faintText: 'rgba(255, 255, 255, 0.4)',
    tooltipBackground: 'rgba(7, 9, 14, 0.94)',
    fontSans,
    fontDisplay
  };
}

export default function StoreItemPage({ item, ownedGames, onBack, onMarkOwned, onLinkExe, onLaunch, onEditMetadata, onRemoveGame }) {
  const [exeInput, setExeInput] = useState('');
  const [showExeInput, setShowExeInput] = useState(false);
  const [media, setMedia] = useState({ screenshots: [], movies: [] });
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [itadInsights, setItadInsights] = useState(null);
  const [loadingItad, setLoadingItad] = useState(false);
  const [itadOAuthStatus, setItadOAuthStatus] = useState(getItadOAuthStatus);
  const [itadSyncMessage, setItadSyncMessage] = useState('');
  const [itadApiKey, setItadApiKey] = useState(() => {
    try {
      return localStorage.getItem('nexus_itad_api_key') || '';
    } catch {
      return '';
    }
  });
  const [itadApiKeySaved, setItadApiKeySaved] = useState(false);
  const [itadApiKeyRevision, setItadApiKeyRevision] = useState(0);
  const [syncingItad, setSyncingItad] = useState(false);
  const [steamDescription, setSteamDescription] = useState('');
  const [itadGameId, setItadGameId] = useState(null);
  const [chartPoints, setChartPoints] = useState([]);
  const [highchartsStatus, setHighchartsStatus] = useState('Loading ITAD price history...');
  const [chartThemeRevision, setChartThemeRevision] = useState(0);
  const highchartsContainerRef = useRef(null);
  const highchartsInstanceRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    let active = true;
    setSteamDescription(item.description || '');

    async function loadMedia() {
      setLoadingMedia(true);
      let fetchedData = null;

      if (item.steamAppId) {
        if (window.electronAPI?.fetchSteamDetails) {
          try {
            fetchedData = await window.electronAPI.fetchSteamDetails(item.steamAppId);
          } catch (e) {
            console.error("Failed to fetch steam details via IPC:", e);
          }
        } else {
          try {
            const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${item.steamAppId}`);
            const json = await res.json();
            if (json && json[item.steamAppId]?.success) {
              fetchedData = json[item.steamAppId].data;
            }
          } catch (e) {
            console.error("CORS or network error fetching steam details in browser sandbox:", e);
          }
        }
      }

      if (!active) return;

      const steamAbout = cleanSteamDescription(
        fetchedData?.about_the_game || fetchedData?.detailed_description || fetchedData?.short_description
      );
      setSteamDescription(steamAbout || item.description || '');

      if (fetchedData && (fetchedData.screenshots?.length || fetchedData.movies?.length)) {
        const screenshots = fetchedData.screenshots || [];
        const movies = fetchedData.movies || [];
        setMedia({ screenshots, movies });
        if (movies.length > 0) {
          setSelectedMedia({
            type: 'video',
            url: movies[0].mp4?.max || movies[0].mp4?.['480'] || movies[0].webm?.max,
            thumbnail: movies[0].thumbnail
          });
        } else if (screenshots.length > 0) {
          setSelectedMedia({ type: 'image', url: screenshots[0].path_full });
        } else {
          setSelectedMedia(null);
        }
      } else {
        const fallback = getCuratedMockMedia(item.id, item.title);
        setMedia(fallback);
        if (fallback.movies?.length > 0) {
          setSelectedMedia({ type: 'video', url: fallback.movies[0].mp4?.max || fallback.movies[0].url, thumbnail: fallback.movies[0].thumbnail });
        } else if (fallback.screenshots?.length > 0) {
          setSelectedMedia({ type: 'image', url: fallback.screenshots[0].path_full || fallback.screenshots[0].url });
        } else {
          setSelectedMedia(null);
        }
      }
      setLoadingMedia(false);
    }

    loadMedia();
    return () => { active = false; };
  }, [item]);

  useEffect(() => {
    if (typeof MutationObserver === 'undefined') return undefined;

    const updateChartTheme = () => setChartThemeRevision(revision => revision + 1);
    const observer = new MutationObserver(updateChartTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxIndex === -1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      else if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % media.screenshots.length);
      else if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + media.screenshots.length) % media.screenshots.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, media.screenshots]);

  useEffect(() => {
    if (!item) return;
    let active = true;

    async function loadItadInsights() {
      setLoadingItad(true);
      const insights = await getItadStoreInsights(item);
      if (!active) return;
      setItadInsights(insights);
      setLoadingItad(false);
    }

    loadItadInsights();
    return () => { active = false; };
  }, [item, itadApiKeyRevision]);


  useEffect(() => {
    if (!item) return;
    let active = true;

    highchartsInstanceRef.current?.destroy();
    highchartsInstanceRef.current = null;
    setItadGameId(null);
    setChartPoints([]);

    if (!item.steamAppId) {
      setHighchartsStatus('Missing Steam App ID for ITAD price history.');
      return () => { active = false; };
    }

    if (!hasItadApiKey()) {
      setHighchartsStatus('Missing ITAD API key. Add nexus_itad_api_key to load live price history.');
      return () => { active = false; };
    }

    setHighchartsStatus('Matching Steam App ID with ITAD...');

    lookupItadGameBySteamAppId(item.steamAppId)
      .then((lookup) => {
        if (!active) return;
        setItadGameId(lookup.id);
      })
      .catch((error) => {
        console.error('ITAD lookup failed:', error);
        if (active) setHighchartsStatus(error.message || 'ITAD lookup failed for this Steam App ID.');
      });

    return () => { active = false; };
  }, [item, itadApiKeyRevision]);

  useEffect(() => {
    if (!itadGameId) return;
    let active = true;

    async function loadChartHistory() {
      setHighchartsStatus('Loading ITAD price history...');

      try {
        const result = await fetchItadHistory(itadGameId, { country: 'US' });
        if (!active) return;

        if (result.points.length === 0) {
          highchartsInstanceRef.current?.destroy();
          highchartsInstanceRef.current = null;
          setChartPoints([]);
          setHighchartsStatus('No valid ITAD price changes found.');
          return;
        }

        setChartPoints(result.points);
        setHighchartsStatus('');
      } catch (error) {
        console.error('ITAD history fetch failed:', error);
        if (!active) return;
        highchartsInstanceRef.current?.destroy();
        highchartsInstanceRef.current = null;
        setChartPoints([]);
        setHighchartsStatus(error.message || 'ITAD price history could not be loaded.');
      }
    }

    loadChartHistory();
    return () => { active = false; };
  }, [itadGameId]);

  useEffect(() => {
    if (!highchartsContainerRef.current) return;

    if (chartPoints.length === 0) {
      highchartsInstanceRef.current?.destroy();
      highchartsInstanceRef.current = null;
      return;
    }

    let active = true;
    const chartLowest = Math.min(...chartPoints.map(([, amount]) => amount));
    const chartTheme = getItadChartTheme();
    const historyFill = {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, chartTheme.accentSoft],
        [1, 'rgba(255, 255, 255, 0.01)']
      ]
    };

    setHighchartsStatus('Loading price chart...');

    loadHighchartsStock()
      .then((Highcharts) => {
        if (!active || !highchartsContainerRef.current) return;

        if (highchartsInstanceRef.current) {
          const chart = highchartsInstanceRef.current;
          chart.update({
            chart: {
              backgroundColor: chartTheme.background,
              plotBackgroundColor: chartTheme.plotBackground,
              style: { fontFamily: chartTheme.fontSans }
            },
            credits: { enabled: false },
            exporting: {
              buttons: {
                contextButton: {
                  symbolStroke: chartTheme.mutedText,
                  theme: {
                    fill: 'transparent',
                    stroke: 'transparent',
                    states: {
                      hover: { fill: chartTheme.accentFaint },
                      select: { fill: chartTheme.accentFaint }
                    }
                  }
                }
              }
            },
            title: {
              style: {
                color: chartTheme.text,
                fontFamily: chartTheme.fontDisplay,
                fontSize: '22px',
                fontWeight: '800'
              }
            },
            xAxis: {
              lineColor: chartTheme.accentLine,
              tickColor: chartTheme.accentLine,
              labels: {
                style: {
                  color: chartTheme.mutedText,
                  fontSize: '12px',
                  fontWeight: '700'
                }
              }
            },
            yAxis: {
              gridLineColor: chartTheme.grid,
              labels: {
                style: {
                  color: chartTheme.faintText,
                  fontSize: '12px',
                  fontWeight: '700'
                }
              },
              plotBands: [{
                from: 0,
                to: chartLowest,
                color: chartTheme.accentFaint
              }],
              plotLines: [{
                value: chartLowest,
                color: chartTheme.accent,
                dashStyle: 'Dash',
                width: 1,
                zIndex: 3
              }]
            },
            tooltip: {
              backgroundColor: chartTheme.tooltipBackground,
              borderColor: chartTheme.accentLine,
              style: {
                color: chartTheme.text,
                fontWeight: '700'
              }
            }
          }, false);
          chart.series[0].update({
            color: chartTheme.accent,
            fillColor: historyFill,
            threshold: chartLowest
          }, false);
          chart.series[0].setData(chartPoints, false);
          chart.xAxis[0].setExtremes(chartPoints[0][0], chartPoints[chartPoints.length - 1][0], false, false);
          chart.redraw();
          setHighchartsStatus('');
          return;
        }

        highchartsInstanceRef.current = Highcharts.stockChart(highchartsContainerRef.current, {
          chart: {
            backgroundColor: chartTheme.background,
            plotBackgroundColor: chartTheme.plotBackground,
            height: 300,
            spacing: [16, 16, 10, 16],
            style: { fontFamily: chartTheme.fontSans }
          },
          credits: { enabled: false },
          exporting: {
            enabled: true,
            buttons: {
              contextButton: {
                symbolStroke: chartTheme.mutedText,
                theme: {
                  fill: 'transparent',
                  stroke: 'transparent',
                  states: {
                    hover: { fill: chartTheme.accentFaint },
                    select: { fill: chartTheme.accentFaint }
                  }
                }
              }
            }
          },
          title: {
            text: '3-Month Price History',
            align: 'left',
            style: {
              color: chartTheme.text,
              fontFamily: chartTheme.fontDisplay,
              fontSize: '22px',
              fontWeight: '800'
            }
          },
          rangeSelector: {
            enabled: false,
            inputEnabled: false
          },
          navigator: { enabled: false },
          scrollbar: { enabled: false },
          xAxis: {
            type: 'datetime',
            ordinal: false,
            lineColor: chartTheme.accentLine,
            tickColor: chartTheme.accentLine,
            labels: {
              style: {
                color: chartTheme.mutedText,
                fontSize: '12px',
                fontWeight: '700'
              }
            }
          },
          yAxis: {
            opposite: true,
            min: 0,
            title: { text: null },
            gridLineColor: chartTheme.grid,
            labels: {
              style: {
                color: chartTheme.faintText,
                fontSize: '12px',
                fontWeight: '700'
              }
            },
            plotBands: [{
              from: 0,
              to: chartLowest,
              color: chartTheme.accentFaint
            }],
            plotLines: [{
              value: chartLowest,
              color: chartTheme.accent,
              dashStyle: 'Dash',
              width: 1,
              zIndex: 3
            }]
          },
          tooltip: {
            backgroundColor: chartTheme.tooltipBackground,
            borderColor: chartTheme.accentLine,
            borderRadius: 8,
            style: {
              color: chartTheme.text,
              fontWeight: '700'
            },
            xDateFormat: '%B %e, %Y',
            pointFormat: '<span style="color:{series.color}">*</span> {series.name}: <b>${point.y:.2f}</b><br/>'
          },
          plotOptions: {
            series: {
              animation: false,
              marker: { enabled: false },
              states: { hover: { lineWidthPlus: 0 } }
            }
          },
          series: [{
            type: 'area',
            name: item.title,
            data: chartPoints,
            step: 'left',
            color: chartTheme.accent,
            fillColor: historyFill,
            lineWidth: 2,
            threshold: chartLowest
          }]
        });

        highchartsInstanceRef.current.xAxis[0].setExtremes(
          chartPoints[0][0],
          chartPoints[chartPoints.length - 1][0],
          true,
          false
        );
        setHighchartsStatus('');
      })
      .catch((error) => {
        console.error('Highcharts load failed:', error);
        if (active) setHighchartsStatus('Price chart could not be loaded.');
      });

    return () => { active = false; };
  }, [chartPoints, item?.title, itadInsights, loadingItad, chartThemeRevision]);

  if (!item) return null;

  const ownedGame = ownedGames.find(g => g.id === item.id);
  const isOwned = !!ownedGame;
  const hasExe = isOwned && ownedGame.exePath;

  const handleMarkOwnedClick = () => {
    audioEngine.playClickPulse();
    onMarkOwned(item);
  };

  const handleBrowseExe = () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      window.electronAPI.selectExecutable().then(path => {
        if (path) {
          setExeInput(path);
          onLinkExe(item.id, path);
          setShowExeInput(false);
        }
      });
    } else {
      const path = prompt('Enter the full path to the .exe file:', 'C:\\Games\\' + item.title + '\\game.exe');
      if (path) {
        setExeInput(path);
        onLinkExe(item.id, path);
        setShowExeInput(false);
      }
    }
  };

  const handleLinkExeClick = () => {
    audioEngine.playClickPulse();
    if (exeInput) {
      onLinkExe(item.id, exeInput);
      setShowExeInput(false);
    }
  };

  const handleLaunchClick = () => {
    audioEngine.playClickPulse();
    if (ownedGame) {
      onLaunch(ownedGame);
    }
  };

  const handleSaveItadApiKey = () => {
    audioEngine.playClickPulse();

    try {
      localStorage.setItem('nexus_itad_api_key', itadApiKey.trim());
      setItadApiKeySaved(true);
      setItadSyncMessage(itadApiKey.trim()
        ? 'ITAD API key saved. Live price history is ready to refresh.'
        : 'ITAD API key cleared. Price history will use preview data.'
      );
      setItadApiKeyRevision(revision => revision + 1);
      setTimeout(() => setItadApiKeySaved(false), 2000);
    } catch {
      setItadSyncMessage('Could not save the ITAD API key in this browser session.');
    }
  };

  const handleItadSyncClick = async () => {
    audioEngine.playClickPulse();

    if (itadOAuthStatus.isConnected) {
      setSyncingItad(true);
      const result = await syncItadUserLibrary();
      setSyncingItad(false);
      setItadSyncMessage(result.ok
        ? `${result.waitlistCount} waitlist and ${result.collectionCount} collection items ready.`
        : result.message
      );
      return;
    }

    const url = getItadOAuthUrl();
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setItadSyncMessage(itadOAuthStatus.hasClientId ? 'OAuth opened. Sync will unlock after authorization completes.' : 'ITAD app setup opened. OAuth credentials are required before sync can run.');
    setItadOAuthStatus(getItadOAuthStatus());
  };

  const aboutText = steamDescription || item.description;

  return (
    <div className="store-item-viewport">
      {/* Back button */}
      <button className="store-item-back-btn" onClick={onBack} data-controller-back="true" data-controller-default="true">
        <ArrowLeft size={16} />
        <span>Back to Store</span>
      </button>

      {/* Banner Section */}
      <div className="store-item-banner">
        {item.bannerUrl ? (
          <img src={item.bannerUrl} alt={item.title} className="store-item-banner-img" />
        ) : (
          <div className="store-item-banner-img store-item-banner-placeholder">
            <span>SteamGridDB artwork pending</span>
          </div>
        )}
        <div className="store-item-banner-overlay" />
        <div className="store-item-banner-content">
          <div className="store-item-banner-tags">
            {item.tags?.map((tag, idx) => (
              <span key={idx} className="store-item-tag">{tag}</span>
            ))}
          </div>
          <h1 className="store-item-title">{item.title}</h1>
          <div className="store-item-meta">
            <span>{item.developer}</span>
            <span className="store-item-dot" />
            <span>{item.publisher}</span>
            <span className="store-item-dot" />
            <span>{item.releaseDate}</span>
          </div>
          <div className="store-item-rating">
            <Star size={14} fill="currentColor" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="store-item-body">
        <div className="store-item-left">
          <h3 className="store-item-section-title">About This Game</h3>
          <p className="store-item-description">{aboutText}</p>

          <div className="store-item-showcase-row">
            <div className="store-item-screenshots-panel">
              <h3 className="store-item-section-title">
                <ImageIcon size={16} />
                <span>Screenshots & Gallery</span>
              </h3>

              {(() => {
                const combinedMedia = [];
                if (media.screenshots) {
                  media.screenshots.forEach((s, idx) => {
                    combinedMedia.push({
                      type: 'image',
                      id: `screenshot-${s.id || idx}`,
                      url: s.path_full || s.url,
                      thumbnail: s.path_thumbnail || s.path_full || s.url
                    });
                  });
                }

                return loadingMedia ? (
                  <div className="store-item-media-loading">
                    <div className="media-spinner" />
                    <span>Fetching visual logs from Steam...</span>
                  </div>
                ) : combinedMedia.length > 0 ? (
                  <div className="store-item-media-grid">
                    {combinedMedia.slice(0, 4).map((med, index) => {
                      const isLastSlot = index === 3 && combinedMedia.length >= 4;
                      const remainingCount = combinedMedia.length - 3;

                      if (isLastSlot) {
                        return (
                          <div
                            key="more-card"
                            className="media-grid-card more-card"
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${remainingCount} more screenshots`}
                            onClick={() => {
                              const screenshotIdx = media.screenshots.findIndex(s => (s.path_full || s.url) === med.url);
                              setLightboxIndex(screenshotIdx !== -1 ? screenshotIdx : 0);
                            }}
                            onFocus={audioEngine.playHoverTick}
                          >
                            <img src={med.thumbnail} alt="More media" className="grid-card-img" />
                            <div className="more-card-overlay">
                              <span>+ {remainingCount} {remainingCount === 1 ? 'PHOTO' : 'PHOTOS'}</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={med.id}
                          className="media-grid-card"
                          role="button"
                          tabIndex={0}
                          aria-label={`Open gameplay screenshot ${index + 1}`}
                          onClick={() => {
                            const screenshotIdx = media.screenshots.findIndex(s => (s.path_full || s.url) === med.url);
                            if (screenshotIdx !== -1) {
                              setLightboxIndex(screenshotIdx);
                            } else if (media.screenshots.length > 0) {
                              setLightboxIndex(0);
                            }
                          }}
                          onFocus={audioEngine.playHoverTick}
                        >
                          <img src={med.thumbnail} alt={`Gameplay ${index + 1}`} className="grid-card-img" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="store-item-media-empty">
                    <span>No gameplay media available.</span>
                  </div>
                );
              })()}
            </div>

            <div className="itad-market-stack">
              <div className="itad-market-section">
                <h3 className="store-item-section-title">
                  <PackageOpen size={16} />
                  <span>Bundles</span>
                </h3>
                {(itadInsights?.bundles || []).map(bundle => (
                  <div key={bundle.id} className="itad-market-row">
                    <div>
                      <strong>{bundle.title}</strong>
                      <span>{bundle.shop} - {bundle.expiry}</span>
                    </div>
                    <em>{bundle.price}</em>
                  </div>
                ))}
              </div>

              <div className="itad-market-section">
                <h3 className="store-item-section-title">
                  <Gift size={16} />
                  <span>Giveaways</span>
                </h3>
                {(itadInsights?.giveaways || []).map(giveaway => (
                  <div key={giveaway.id} className="itad-market-row">
                    <div>
                      <strong>{giveaway.title}</strong>
                      <span>{giveaway.shop}</span>
                    </div>
                    <em>{giveaway.status}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="itad-panel">
            <div className="itad-panel-header">
              <div>
                <h3 className="store-item-section-title">
                  <LineChart size={16} />
                  <span>ITAD Price Intelligence</span>
                </h3>
                <p className="itad-source">{loadingItad ? 'Checking IsThereAnyDeal...' : itadInsights?.source}</p>
              </div>
              <div className="itad-appid-pill">
                <span>Steam App ID</span>
                <strong>{item.steamAppId || 'Unavailable'}</strong>
              </div>
            </div>

            {loadingItad || !itadInsights ? (
              <div className="itad-loading">
                <div className="media-spinner" />
                <span>Loading price history</span>
              </div>
            ) : (
              <>
                <div className="itad-price-row">
                  <div className="itad-price-stat">
                    <span>Current low</span>
                    <strong>{itadInsights.current.formatted}</strong>
                    <small>{itadInsights.current.shop}</small>
                  </div>
                  <div className="itad-price-stat highlight">
                    <span>Lowest ever</span>
                    <strong>{itadInsights.lowestEver.formatted}</strong>
                    <small>{itadInsights.lowestEver.date} on {itadInsights.lowestEver.shop}</small>
                  </div>
                  <div className="itad-price-stat">
                    <span>Regular</span>
                    <strong>{itadInsights.regular.formatted}</strong>
                    <small>Baseline price</small>
                  </div>
                </div>

                <div className="itad-chart" aria-label="ITAD price history chart">
                  <div ref={highchartsContainerRef} className="itad-highcharts-container" />
                  {highchartsStatus && <div className="itad-highcharts-status">{highchartsStatus}</div>}
                </div>
              </>
            )}
          </div>

          {/* Fullscreen Lightbox Modal */}
          {lightboxIndex !== -1 && media.screenshots && media.screenshots[lightboxIndex] && (
            <div className="media-lightbox-overlay" onClick={() => setLightboxIndex(-1)}>
              <button className="lightbox-close-btn" onClick={() => setLightboxIndex(-1)} data-controller-back="true">
                <X size={24} />
              </button>
              
              <button
                className="lightbox-nav-btn prev"
                data-controller-left="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev - 1 + media.screenshots.length) % media.screenshots.length);
                }}
              >
                <ChevronLeft size={36} />
              </button>

              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img
                  src={media.screenshots[lightboxIndex].path_full || media.screenshots[lightboxIndex].url}
                  alt={`Screenshot Fullscreen ${lightboxIndex + 1}`}
                  className="lightbox-image"
                />
                <div className="lightbox-counter">
                  {lightboxIndex + 1} / {media.screenshots.length}
                </div>
              </div>

              <button
                className="lightbox-nav-btn next"
                data-controller-right="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev + 1) % media.screenshots.length);
                }}
              >
                <ChevronRight size={36} />
              </button>
            </div>
          )}
        </div>

        <div className="store-item-right">
          {/* Ownership Card */}
          <div className="store-item-ownership-card">
            {isOwned ? (
              <>
                <div className="owned-check">
                  <Check size={20} />
                  <span>In Your Library</span>
                </div>

                {hasExe ? (
                  <div className="exe-linked-info">
                    <Link size={14} />
                    <span className="exe-path-label">{ownedGame.exePath}</span>
                  </div>
                ) : (
                  <div className="exe-not-linked">
                    <span>No executable linked yet</span>
                  </div>
                )}

                {/* Link Executable Section */}
                {!showExeInput ? (
                  <div className="store-item-actions">
                    {hasExe && (
                      <button className="glow-btn glow-btn-primary" onClick={handleLaunchClick}>
                        <Play size={14} />
                        <span>Play Now</span>
                      </button>
                    )}
                    <button className="glow-btn" onClick={() => setShowExeInput(true)}>
                      <FolderOpen size={14} />
                      <span>{hasExe ? 'Change EXE' : 'Link EXE'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="exe-input-row">
                    <input
                      type="text"
                      className="glass-input exe-input"
                      placeholder="C:\\Path\\To\\Game.exe"
                      value={exeInput}
                      onChange={(e) => setExeInput(e.target.value)}
                    />
                    <div className="exe-input-actions">
                      <button className="glow-btn" onClick={handleBrowseExe}>
                        <FolderOpen size={14} />
                        <span>Browse</span>
                      </button>
                      <button
                        className="glow-btn glow-btn-primary"
                        onClick={handleLinkExeClick}
                        disabled={!exeInput}
                      >
                        <Link size={14} />
                        <span>Link</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="store-item-divider" />

                <div className="owned-overflow-row">
                  <span className="owned-overflow-label">Library actions</span>
                  <LibraryOverflowMenu
                    className="owned-library-overflow"
                    triggerClassName="owned-overflow-trigger"
                    menuClassName="owned-overflow-popover"
                    onEditMetadata={ownedGame ? () => onEditMetadata(ownedGame) : undefined}
                    onRemove={() => onRemoveGame(item.id)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="not-owned-label">
                  <span>You don't own this game yet</span>
                </div>
                <button className="glow-btn glow-btn-primary mark-owned-btn" onClick={handleMarkOwnedClick}>
                  <Plus size={16} />
                  <span>Mark as Owned</span>
                </button>
                <div className="owned-hint">
                  Mark a game as owned to add it to your library, then link your .exe file to play.
                </div>
              </>
            )}
          </div>

          <div className="itad-sync-card">
            <div className="itad-sync-title">
              <KeyRound size={16} />
              <span>ITAD Sync</span>
            </div>
            <p>{itadOAuthStatus.isConnected ? 'Waitlist and collection sync can pull directly from IsThereAnyDeal.' : 'Connect IsThereAnyDeal OAuth to sync waitlists and collections into Nexus.'}</p>
            <div className="itad-api-key-row">
              <input
                type="password"
                className="glass-input itad-api-key-input"
                value={itadApiKey}
                onChange={(e) => {
                  setItadApiKey(e.target.value);
                  setItadApiKeySaved(false);
                }}
                placeholder="ITAD API key..."
                autoComplete="off"
              />
              <button className="glow-btn itad-api-key-save-btn" onClick={handleSaveItadApiKey}>
                <KeyRound size={14} />
                <span>{itadApiKeySaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
            {itadSyncMessage && <div className="itad-sync-message">{itadSyncMessage}</div>}
            <button className="glow-btn" onClick={handleItadSyncClick} disabled={syncingItad}>
              {itadOAuthStatus.isConnected ? <RefreshCw size={14} /> : <ExternalLink size={14} />}
              <span>{syncingItad ? 'Syncing...' : itadOAuthStatus.isConnected ? 'Sync Now' : itadOAuthStatus.hasClientId ? 'Start OAuth' : 'Register App'}</span>
            </button>
          </div>

          {/* Platforms section moved to right column */}
          <div className="store-item-platforms-container" style={{ marginTop: '20px' }}>
            <h3 className="store-item-section-title">Platforms</h3>
            <div className="store-item-platforms">
              {item.platforms.map(p => {
                const Icon = platformIcons[p] || Gamepad2;
                return (
                  <div key={p} className="store-item-platform-badge">
                    <Icon size={16} />
                    <span>{p}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .store-item-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 10px 0 20px 0;
          overflow: hidden;
          height: 100%;
        }

        .store-item-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 16px;
          color: rgba(255, 255, 255, 0.6);
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-bottom: 12px;
          align-self: flex-start;
        }

        .store-item-back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .store-item-banner {
          position: relative;
          width: 100%;
          height: 280px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .store-item-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .store-item-banner-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 35%, rgba(var(--accent-color-rgb), 0.2), rgba(7, 7, 10, 0.96) 68%);
          color: rgba(255, 255, 255, 0.42);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .store-item-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.3) 50%, rgba(7, 7, 10, 0.5) 100%);
          z-index: 1;
        }

        .store-item-banner-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          z-index: 2;
        }

        .store-item-banner-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .store-item-tag {
          background: rgba(var(--accent-color-rgb), 0.16);
          border: 1px solid rgba(var(--accent-color-rgb), 0.35);
          color: var(--accent-color);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: var(--fs-10);
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .store-item-title {
          font-family: var(--font-display);
          font-weight: 950;
          font-size: var(--fs-38);
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(var(--accent-color-rgb), 0.25);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .store-item-meta {
          display: flex;
          align-items: center;
          font-size: var(--fs-13-5);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          gap: 8px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .store-item-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }

        .store-item-rating {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: var(--fs-14-5);
          font-weight: 800;
          color: #ffc83b;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.4);
          padding: 4px 10px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .store-item-rating svg {
          filter: drop-shadow(0 0 6px rgba(255, 200, 59, 0.6));
        }

        .store-item-body {
          display: grid;
          grid-template-columns: 1fr minmax(280px, 320px);
          gap: 24px;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .store-item-left {
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
        }

        .store-item-left::-webkit-scrollbar,
        .store-item-right::-webkit-scrollbar {
          width: 4px;
        }

        .store-item-left::-webkit-scrollbar-track,
        .store-item-right::-webkit-scrollbar-track {
          background: transparent;
        }

        .store-item-left::-webkit-scrollbar-thumb,
        .store-item-right::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 4px;
        }

        .store-item-section-title {
          font-family: var(--font-display);
          font-size: var(--fs-14-5);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .store-item-description {
          font-size: var(--fs-17);
          line-height: 1.8;
          color: #a2b8cc;
          font-weight: 400;
          margin-bottom: 22px;
          letter-spacing: 0.3px;
          white-space: pre-line;
          overflow-y: auto;
          max-height: 8em;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0);
        }

        .store-item-description::-webkit-scrollbar {
          width: 4px;
        }

        .store-item-description::-webkit-scrollbar-track {
          background: transparent;
        }

        .store-item-description::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .store-item-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .store-item-platform-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: var(--fs-11);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          transition: all var(--transition-fast);
        }

        .store-item-platform-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .store-item-platform-badge svg {
          color: var(--accent-color);
          filter: drop-shadow(0 0 5px rgba(var(--accent-color-rgb), 0.4));
        }

        .store-item-showcase-row {
          display: grid;
          grid-template-columns: minmax(300px, 1.08fr) minmax(240px, 0.92fr);
          gap: 18px;
          align-items: stretch;
          margin-bottom: 22px;
        }

        .store-item-screenshots-panel,
        .itad-market-stack {
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .itad-panel {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 16px;
          margin: 0 0 22px 0;
        }

        .itad-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
        }

        .itad-source {
          margin: -6px 0 0 24px;
          color: rgba(255, 255, 255, 0.38);
          font-size: var(--fs-11);
          font-weight: 600;
        }

        .itad-appid-pill {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
          min-width: 112px;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .itad-appid-pill span {
          color: rgba(255, 255, 255, 0.34);
          font-size: var(--fs-9);
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .itad-appid-pill strong {
          color: #fff;
          font-size: var(--fs-13);
          font-family: var(--font-display);
        }

        .itad-loading {
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.44);
          font-size: var(--fs-12);
        }

        .itad-price-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 16px;
        }

        .itad-price-stat {
          min-width: 0;
          border-radius: 8px;
          padding: 12px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012)), var(--panel-bg);
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
        }

        .itad-price-stat.highlight {
          border-color: rgba(var(--accent-color-rgb), 0.32);
          background: linear-gradient(180deg, rgba(var(--accent-color-rgb), 0.13), rgba(var(--accent-color-rgb), 0.035)), var(--panel-bg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 18px rgba(var(--accent-color-rgb), 0.08);
        }

        .itad-price-stat span,
        .itad-price-stat small {
          display: block;
          color: rgba(255, 255, 255, 0.44);
          font-size: var(--fs-10);
          font-weight: 700;
          line-height: 1.35;
        }

        .itad-price-stat strong {
          display: block;
          color: #fff;
          font-family: var(--font-display);
          font-size: var(--fs-20);
          font-weight: 900;
          margin: 4px 0;
        }

        .itad-chart {
          position: relative;
          min-height: 300px;
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgba(var(--accent-color-rgb), 0.08), rgba(255, 255, 255, 0.018) 42%, rgba(0, 0, 0, 0.12)),
            var(--panel-bg);
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 14px 32px rgba(0, 0, 0, 0.24), 0 0 24px rgba(var(--accent-color-rgb), 0.06);
          overflow: hidden;
        }

        .itad-chart::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(var(--accent-color-rgb), 0.12);
          pointer-events: none;
          z-index: 1;
        }

        .itad-highcharts-container {
          position: relative;
          z-index: 0;
          width: 100%;
          min-height: 300px;
        }

        .itad-highcharts-status {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: rgba(255, 255, 255, 0.48);
          font-size: var(--fs-12);
          font-weight: 700;
          text-align: center;
          pointer-events: none;
          z-index: 2;
        }

        .itad-market-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }

        .itad-market-stack {
          gap: 12px;
        }

        .itad-market-section {
          min-width: 0;
          border-radius: 12px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.018);
          border: 1px solid rgba(255, 255, 255, 0.055);
        }

        .itad-market-stack .itad-market-section {
          flex: 1;
          overflow: hidden;
        }

        .itad-market-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.045);
        }

        .itad-market-row div {
          min-width: 0;
        }

        .itad-market-row strong,
        .itad-market-row span {
          display: block;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .itad-market-row strong {
          color: rgba(255, 255, 255, 0.84);
          font-size: var(--fs-12);
          font-weight: 800;
        }

        .itad-market-row span {
          color: rgba(255, 255, 255, 0.36);
          font-size: var(--fs-10);
          margin-top: 3px;
        }

        .itad-market-row em {
          flex: 0 0 auto;
          color: var(--accent-color);
          font-size: var(--fs-11);
          font-style: normal;
          font-family: var(--font-display);
          font-weight: 900;
        }

        /* --- Media Grid Section --- */
        .store-item-media-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          gap: 16px;
          color: rgba(255, 255, 255, 0.5);
          font-size: var(--fs-13);
        }

        .media-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(var(--accent-color-rgb), 0.1);
          border-top-color: var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          filter: drop-shadow(0 0 8px var(--accent-color));
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .store-item-media-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 0;
          max-width: none;
          flex: 1;
        }

        .media-grid-card {
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 150px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #000;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .media-grid-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.15);
        }

        .grid-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s ease;
        }

        .media-grid-card:hover .grid-card-img {
          opacity: 0.85;
        }

        .grid-video-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .grid-card-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .grid-video-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ef4444;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: var(--fs-9);
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        /* --- More Card Overlay Styled to be Translucent --- */
        .more-card {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        .more-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.68); /* Sleek glassmorphic translucent dark slate */
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .more-card:hover .more-card-overlay {
          background: rgba(15, 23, 42, 0.45); /* Reveals more of the 4th picture on hover */
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
        }

        .more-card-overlay span {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: var(--fs-15);
          letter-spacing: 2px;
          color: #ffffff; /* White text for great readability over dark/translucent imagery */
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 12px rgba(var(--accent-color-rgb), 0.4);
          text-transform: uppercase;
        }

        .store-item-media-empty {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          min-height: 300px;
          padding: 40px;
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: var(--fs-13);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* --- Fullscreen Lightbox Modal --- */
        .media-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 5, 8, 0.92);
          backdrop-filter: blur(25px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
          transform: rotate(90deg);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10005;
        }

        .lightbox-nav-btn:hover {
          background: rgba(var(--accent-color-rgb), 0.15);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.3);
        }

        .lightbox-nav-btn.prev {
          left: 30px;
        }

        .lightbox-nav-btn.next {
          right: 30px;
        }

        .lightbox-content {
          max-width: 82%;
          max-height: 82%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.4);
          font-family: var(--font-display);
          font-size: var(--fs-13);
          font-weight: 700;
          margin-top: 16px;
          letter-spacing: 1.5px;
        }

        .store-item-right {
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
        }

        .store-item-ownership-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .owned-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: var(--fs-13);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .exe-linked-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.5);
          font-family: monospace;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          word-break: break-all;
        }

        .exe-not-linked {
          font-size: var(--fs-12);
          color: rgba(255, 175, 46, 0.7);
          font-weight: 500;
          text-align: center;
          padding: 8px;
          background: rgba(255, 175, 46, 0.04);
          border: 1px dashed rgba(255, 175, 46, 0.15);
          border-radius: 8px;
        }

        .store-item-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .store-item-actions .glow-btn {
          flex: 1;
          font-size: var(--fs-11);
          padding: 10px 12px;
        }

        .exe-input-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .exe-input {
          font-family: monospace;
          font-size: var(--fs-11);
          width: 100%;
        }

        .exe-input-actions {
          display: flex;
          gap: 8px;
        }

        .exe-input-actions .glow-btn {
          flex: 1;
          font-size: var(--fs-11);
          padding: 8px 12px;
        }

        .store-item-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 4px 0;
        }

        .owned-overflow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .owned-overflow-label {
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.36);
        }

        .owned-overflow-trigger {
          width: 38px;
          height: 38px;
          border-radius: 8px;
        }

        .owned-overflow-popover {
          bottom: auto;
          top: calc(100% + 10px);
        }

        .not-owned-label {
          text-align: center;
          font-size: var(--fs-13);
          color: rgba(255, 255, 255, 0.4);
          padding: 10px 0;
        }

        .mark-owned-btn {
          width: 100%;
          padding: 14px;
          font-size: var(--fs-13);
        }

        .owned-hint {
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          line-height: 1.5;
        }

        .itad-sync-card {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .itad-sync-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.86);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 900;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .itad-sync-title svg {
          color: var(--accent-color);
        }

        .itad-sync-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.38);
          font-size: var(--fs-11);
          line-height: 1.55;
        }

        .itad-sync-message {
          border-radius: 8px;
          background: rgba(var(--accent-color-rgb), 0.07);
          border: 1px solid rgba(var(--accent-color-rgb), 0.16);
          color: rgba(255, 255, 255, 0.68);
          font-size: var(--fs-10);
          line-height: 1.45;
          padding: 8px 10px;
        }

        .itad-api-key-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 8px;
          align-items: center;
        }

        .itad-api-key-input {
          min-width: 0;
          height: 36px;
          font-size: var(--fs-11);
        }

        .itad-sync-card .glow-btn {
          width: 100%;
          font-size: var(--fs-11);
          padding: 10px 12px;
        }

        .itad-sync-card .glow-btn.itad-api-key-save-btn {
          width: auto;
          height: 36px;
          padding: 0 10px;
          white-space: nowrap;
        }

        @media (max-width: 980px) {
          .store-item-body {
            grid-template-columns: 1fr;
            overflow-y: auto;
          }

          .store-item-left,
          .store-item-right {
            overflow: visible;
          }

          .store-item-showcase-row,
          .itad-market-grid {
            grid-template-columns: 1fr;
          }

          .itad-market-stack .itad-market-section {
            flex: none;
          }
        }

        @media (max-width: 680px) {
          .store-item-banner {
            height: 220px;
          }

          .store-item-title {
            font-size: var(--fs-30);
          }

          .itad-panel-header,
          .itad-price-row {
            grid-template-columns: 1fr;
            flex-direction: column;
          }

          .itad-appid-pill {
            align-items: flex-start;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
