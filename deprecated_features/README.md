# Deprecated Feature: Transparent Image Trimming

This folder contains the retired image trimming feature. The feature was designed to remove excess transparent padding from downloaded **logo** and **icon** images (using the `sharp` library) to improve alignment and styling in the UI.

## Why it was Deprecated/Deactivated
The feature has been removed from the active execution path to optimize application runtime overhead, decouple `sharp` dependency from the main startup/load path, and allow a cleaner pipeline for base artwork resolution.

---

## How to Re-Implement / Restore the Feature

If you decide you want to bring this feature back, follow these simple steps to hook `imageTrimming.js` back into `main.js`:

### Step 1: Import the Trimming Module in `main.js`
Add the following import statement near the top of [main.js](file:///c:/Users/Laptop/Documents/GitHub/Final-Project/UI-UX-Final-Project/main.js):
```javascript
import { 
  trimTransparentPadding, 
  trimCachedLogoArtworkForDatabase 
} from './deprecated_features/imageTrimming.js';
```

### Step 2: Re-enable Trimming on Database Load
In [main.js](file:///c:/Users/Laptop/Documents/GitHub/Final-Project/UI-UX-Final-Project/main.js), locate the `load-database` IPC handler and uncomment the call to trim the database:
```javascript
// Locate in ipcMain.handle('load-database')
const normalized = normalizeArtworkUrlsInDatabase(data);

// Uncomment this line:
await trimCachedLogoArtworkForDatabase(normalized, { getCachedArtworkFilePath, toArtworkUrl, emitDiagnostic });

return normalized;
```

### Step 3: Re-enable Trimmed-File Loading
Locate `getCachedArtworkFilePath(gameId, type)` in [main.js](file:///c:/Users/Laptop/Documents/GitHub/Final-Project/UI-UX-Final-Project/main.js) and uncomment the logic to search for `.trimmed.` extensions:
```javascript
function getCachedArtworkFilePath(gameId, type) {
  const cacheDir = getGameCacheDir(gameId);
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'ico'];
  
  // Uncomment this block:
  if (type === 'logo' || type === 'icon') {
    for (const ext of extensions) {
      const filePath = path.join(cacheDir, `${type}.trimmed.${ext}`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }
  
  for (const ext of extensions) {
    const filePath = path.join(cacheDir, `${type}.${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}
```

### Step 4: Re-enable Trimming in Artwork Fetching Pipelines
In [main.js](file:///c:/Users/Laptop/Documents/GitHub/Final-Project/UI-UX-Final-Project/main.js), uncomment the `trimTransparentPadding` calls within the following three functions:

1. **`fetchArtworkForGame(sgdbId, gameId, gameTitle)`**:
   - Inside the cached file check:
     ```javascript
     // Uncomment this block:
     if ((key === 'logo' || key === 'icon') && cachedFilePath) {
       try {
         const trimDetails = await trimTransparentPadding(cachedFilePath);
         if (trimDetails?.filePath) cachedFilePath = trimDetails.filePath;
         if (trimDetails && !trimDetails.alreadyTrimmed) {
           addDiagnostic('info', `Trimmed transparent padding from cached ${key} artwork for ${gameTitle}`, trimDetails);
         }
       } catch (trimError) {
         addDiagnostic('warn', `Could not trim cached ${key} artwork for ${gameTitle}: ${trimError.message}`);
       }
     }
     ```
   - Inside the newly downloaded file check:
     ```javascript
     // Uncomment this block:
     if (key === 'logo' || key === 'icon') {
       try {
         const trimDetails = await trimTransparentPadding(destPath);
         if (trimDetails?.filePath) destPath = trimDetails.filePath;
         if (trimDetails && !trimDetails.alreadyTrimmed) {
           addDiagnostic('info', `Trimmed transparent padding from ${key} artwork for ${gameTitle}`, trimDetails);
         }
       } catch (trimError) {
         addDiagnostic('warn', `Could not trim ${key} artwork for ${gameTitle}: ${trimError.message}`);
       }
     }
     ```

2. **`downloadSteamCDNArtwork(appId, key, cacheDir, gameTitle, diagnostics)`**:
   - Inside the CDN download loop:
     ```javascript
     // Uncomment this block:
     if (key === 'logo' || key === 'icon') {
       try {
         const trimDetails = await trimTransparentPadding(destPath);
         if (trimDetails?.filePath) finalPath = trimDetails.filePath;
       } catch (trimError) {
         diagnostics.push({ level: 'warn', message: `Could not trim transparent padding: ${trimError.message}` });
       }
     }
     ```

3. **`fetchArtworkWithFallback(game)`**:
   - Inside the cached file check (fallback pipeline):
     ```javascript
     // Uncomment this block:
     if ((key === 'logo' || key === 'icon') && cachedFilePath) {
       try {
         const trimDetails = await trimTransparentPadding(cachedFilePath);
         if (trimDetails?.filePath) cachedFilePath = trimDetails.filePath;
       } catch (e) {}
     }
     ```

---

*Note: The `sharp` npm library is still installed in your dependencies, so you don't need to install any new packages to re-enable this!*
