const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window management
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowClose: () => ipcRenderer.send('window-close'),

  // Database integrations
  loadDatabase: () => ipcRenderer.invoke('load-database'),
  saveDatabase: (data) => ipcRenderer.invoke('save-database', data),

  // Native explorer APIs
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  selectExecutable: () => ipcRenderer.invoke('select-executable'),
  scanExecutables: (dirPath) => ipcRenderer.invoke('scan-executables', dirPath),

  // Launch processes
  launchGame: (gameId, exePath) => ipcRenderer.invoke('launch-game', gameId, exePath),

  // System power management
  powerOff: () => ipcRenderer.invoke('power-off'),

  // SteamGridDB Artwork
  searchSteamGridDB: (term) => ipcRenderer.invoke('steamgriddb-search', term),
  fetchArtwork: (sgdbId, gameId, gameTitle) => ipcRenderer.invoke('steamgriddb-fetch-artwork', sgdbId, gameId, gameTitle),
  autoFetchArtwork: (game) => ipcRenderer.invoke('steamgriddb-auto-fetch-artwork', game),
  getCachedArtwork: (gameId) => ipcRenderer.invoke('get-cached-artwork', gameId),
  saveApiKey: (key) => ipcRenderer.invoke('save-api-key', key),
  getApiKey: () => ipcRenderer.invoke('get-api-key'),

  // Real-time process notifications
  onGameStatusChanged: (callback) => {
    const subscription = (event, gameId, status, elapsedSeconds) => callback(gameId, status, elapsedSeconds);
    ipcRenderer.on('game-status-changed', subscription);
    return () => ipcRenderer.removeListener('game-status-changed', subscription);
  },

  onDiagnosticEvent: (callback) => {
    const subscription = (event, payload) => callback(payload);
    ipcRenderer.on('diagnostic-event', subscription);
    return () => ipcRenderer.removeListener('diagnostic-event', subscription);
  }
});
