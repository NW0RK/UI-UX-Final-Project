import React, { useState } from 'react';
import { X, Save, Film, Image, Keyboard, Tag, Search, Download, Cloud } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './MetadataEditor.css';

export default function MetadataEditor({ game, onSave, onClose }) {
  if (!game) return null;

  const [title, setTitle] = useState(game.title);
  const [developer, setDeveloper] = useState(game.developer);
  const [genre, setGenre] = useState(game.genre);
  const [rating, setRating] = useState(game.rating);
  const [releaseDate, setReleaseDate] = useState(game.releaseDate);
  const [progress, setProgress] = useState(game.progress);
  const [playtimeHours, setPlaytimeHours] = useState(Math.round((game.playtime / 3600) * 10) / 10);
  const [description, setDescription] = useState(game.description);
  const [coverUrl, setCoverUrl] = useState(game.coverUrl || '');
  const [bannerUrl, setBannerUrl] = useState(game.bannerUrl || '');
  const [logoUrl, setLogoUrl] = useState(game.logoUrl || '');
  const [iconUrl, setIconUrl] = useState(game.iconUrl || '');
  const [steamAppId, setSteamAppId] = useState(game.steamAppId || '');
  const [steamGridDbId, setSteamGridDbId] = useState(game.steamGridDbId || null);
  const [steamGridDbName, setSteamGridDbName] = useState(game.steamGridDbName || '');
  const [tagsInput, setTagsInput] = useState(game.tags?.join(', ') || '');
  const [exePath, setExePath] = useState(game.exePath);

  const [searchTerm, setSearchTerm] = useState(game.title);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(null); // sgdbId of currently fetching
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleImagePick = async (setter) => {
    audioEngine.playClickPulse();
    try {
      const filePath = window.electronAPI
        ? await window.electronAPI.selectImage()
        : prompt("Enter image file path:", "");
      if (filePath) {
        const fileUrl = filePath.startsWith('file://') ? filePath : `file:///${filePath.replace(/\\/g, '/')}`;
        setter(fileUrl);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleClose = () => {
    audioEngine.playClickPulse();
    onClose();
  };

  const handleSave = (e) => {
    e.preventDefault();
    audioEngine.playClickPulse();

    const updatedGame = {
      ...game,
      title,
      developer,
      genre,
      rating: parseFloat(rating) || 4.0,
      releaseDate,
      progress: parseInt(progress) || 0,
      playtime: Math.round(parseFloat(playtimeHours) * 3600) || 0,
      description,
      coverUrl: coverUrl || null,
      bannerUrl: bannerUrl || null,
      logoUrl: logoUrl || null,
      iconUrl: iconUrl || null,
      steamAppId: steamAppId || null,
      steamGridDbId,
      steamGridDbName: steamGridDbName || null,
      artworkSource: steamGridDbId ? 'steamgriddb' : null,
      artworkFetched: !!steamGridDbId && !!(coverUrl || bannerUrl || logoUrl || iconUrl),
      exePath,
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onSave(updatedGame);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    audioEngine.playClickPulse();
    setIsSearching(true);
    setSearchError(null);
    try {
      if (window.electronAPI) {
        const results = await window.electronAPI.searchSteamGridDB(searchTerm.trim());
        if (results.error) {
          setSearchError(results.error);
          setSearchResults(null);
        } else {
          setSearchResults(results);
        }
      } else {
        setSearchError("Electron API not available");
      }
    } catch (e) {
      setSearchError(e.message);
    }
    setIsSearching(false);
  };

  const handleFetchArtwork = async (sgdbResult) => {
    audioEngine.playClickPulse();
    setIsFetching(sgdbResult.id);
    try {
      if (window.electronAPI) {
        const artwork = await window.electronAPI.fetchArtwork(sgdbResult.id, game.id, game.title);
        if (artwork.error) {
          setSearchError(artwork.error);
        } else {
          if (artwork.grid) setCoverUrl(artwork.grid);
          if (artwork.hero) setBannerUrl(artwork.hero);
          if (artwork.logo) setLogoUrl(artwork.logo);
          if (artwork.icon) setIconUrl(artwork.icon);
          setSteamGridDbId(artwork.steamGridDbId || sgdbResult.id);
          setSteamGridDbName(artwork.steamGridDbName || sgdbResult.name || '');
        }
      }
    } catch (e) {
      setSearchError(e.message);
    }
    setIsFetching(null);
  };

  const handleAutoFetchArtwork = async () => {
    const lookupTitle = searchTerm.trim() || title.trim();
    if (!lookupTitle || !window.electronAPI?.autoFetchArtwork) return;

    audioEngine.playClickPulse();
    setIsAutoFetching(true);
    setSearchError(null);
    try {
      const artwork = await window.electronAPI.autoFetchArtwork({
        ...game,
        title: lookupTitle,
        steamAppId: steamAppId || null,
        forceTitleLookup: true
      });

      if (artwork.error) {
        setSearchError(artwork.error);
      } else {
        if (artwork.grid) setCoverUrl(artwork.grid);
        if (artwork.hero) setBannerUrl(artwork.hero);
        if (artwork.logo) setLogoUrl(artwork.logo);
        if (artwork.icon) setIconUrl(artwork.icon);
        if (artwork.steamAppId) setSteamAppId(artwork.steamAppId);
        setSteamGridDbId(artwork.steamGridDbId || null);
        setSteamGridDbName(artwork.steamGridDbName || '');
        setSearchResults([{
          id: artwork.steamGridDbId,
          name: artwork.steamGridDbName || lookupTitle,
          matchScore: artwork.matchScore
        }]);
      }
    } catch (e) {
      setSearchError(e.message);
    }
    setIsAutoFetching(false);
  };

  return (
    <div className="meta-editor-overlay flex-center">
      <div className="meta-editor-modal glass-panel-heavy">
        {/* Header */}
        <div className="editor-header">
          <h2 className="editor-title">Metadata Suite</h2>
          <button 
            className="editor-close-btn" 
            onClick={handleClose}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form className="editor-form-scrollable" onSubmit={handleSave}>
          <div className="editor-grid">
            {/* Left Column: Basic Text Metadata */}
            <div className="editor-column">
              <div className="form-group">
                <label className="form-label">Game Title</label>
                <input 
                  type="text" 
                  className="glass-input editor-input" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Steam AppID</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="glass-input editor-input" 
                  value={steamAppId} 
                  onChange={(e) => setSteamAppId(e.target.value.replace(/\D/g, ''))} 
                  placeholder="e.g. 292030"
                />
              </div>

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label className="form-label">Developer</label>
                  <input 
                    type="text" 
                    className="glass-input editor-input" 
                    value={developer} 
                    onChange={(e) => setDeveloper(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Genre</label>
                  <input 
                    type="text" 
                    className="glass-input editor-input" 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label className="form-label">Rating (0-5)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="5"
                    className="glass-input editor-input" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Release Date</label>
                  <input 
                    type="date" 
                    className="glass-input editor-input" 
                    value={releaseDate} 
                    onChange={(e) => setReleaseDate(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label className="form-label">Playtime (Hours)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0"
                    className="glass-input editor-input" 
                    value={playtimeHours} 
                    onChange={(e) => setPlaytimeHours(e.target.value)} 
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Progress (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100"
                    className="glass-input editor-input" 
                    value={progress} 
                    onChange={(e) => setProgress(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description Summary</label>
                <textarea 
                  rows="3" 
                  className="glass-input editor-textarea" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>
            </div>

            {/* Right Column: Assets & File System Paths */}
            <div className="editor-column">
              <div className="form-group">
                <label className="form-label flex-center-start">
                  <Image size={13} className="label-icon" />
                  <span>Cover Art URL (Vertical)</span>
                </label>
                <input 
                  type="text" 
                  className="glass-input editor-input" 
                  value={coverUrl} 
                  onChange={(e) => setCoverUrl(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label flex-center-start">
                  <Film size={13} className="label-icon" />
                  <span>Landscape Banner URL</span>
                </label>
                <input 
                  type="text" 
                  className="glass-input editor-input" 
                  value={bannerUrl} 
                  onChange={(e) => setBannerUrl(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label flex-center-start">
                  <Image size={13} className="label-icon" />
                  <span>Logo URL</span>
                </label>
                <input 
                  type="text" 
                  className="glass-input editor-input" 
                  value={logoUrl} 
                  onChange={(e) => setLogoUrl(e.target.value)} 
                />
              </div>

              <div className="form-group-row">
                <div className="form-group flex-1">
                  <label className="form-label flex-center-start">
                    <Tag size={13} className="label-icon" />
                    <span>Tags (comma separated)</span>
                  </label>
                  <input 
                    type="text" 
                    className="glass-input editor-input" 
                    placeholder="e.g. Sci-Fi, Co-op, Ray Tracing" 
                    value={tagsInput} 
                    onChange={(e) => setTagsInput(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label flex-center-start">
                  <Keyboard size={13} className="label-icon" />
                  <span>Executable Binary Path (.exe)</span>
                </label>
                <input 
                  type="text" 
                  className="glass-input editor-input exe-path-input" 
                  value={exePath} 
                  onChange={(e) => setExePath(e.target.value)} 
                  required
                />
              </div>

              {/* SteamGridDB Artwork Fetch */}
              <div className="artwork-fetch-section">
                <label className="form-label flex-center-start">
                  <Cloud size={13} className="label-icon" />
                  <span>SteamGridDB Artwork</span>
                </label>
                <div className="sgdb-search-row">
                  <input 
                    type="text" 
                    className="glass-input sgdb-search-input" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search game on SteamGridDB..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    type="button"
                    className="glow-btn sgdb-search-btn"
                    onClick={handleSearch}
                    disabled={isSearching}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    {isSearching ? '...' : <Search size={13} />}
                  </button>
                  <button
                    type="button"
                    className="glow-btn sgdb-auto-btn"
                    onClick={handleAutoFetchArtwork}
                    disabled={isAutoFetching || isSearching}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    {isAutoFetching ? <Download size={13} /> : <Cloud size={13} />}
                    <span>{isAutoFetching ? 'Fetching' : 'Auto Match'}</span>
                  </button>
                </div>

                {searchError && (
                  <div className="sgdb-error">{searchError}</div>
                )}

                {searchResults && searchResults.length > 0 && (
                  <div className="sgdb-results">
                    {searchResults.slice(0, 4).map(r => (
                      <div key={r.id} className="sgdb-result-row">
                        <div className="sgdb-result-info">
                          <span className="sgdb-result-name">{r.name}</span>
                          {r.release_date && <span className="sgdb-result-year">({r.release_date?.slice(0, 4)})</span>}
                          {typeof r.matchScore === 'number' && <span className="sgdb-result-year">{r.matchScore}%</span>}
                        </div>
                        <button
                          type="button"
                          className="glow-btn sgdb-apply-btn"
                          onClick={() => handleFetchArtwork(r)}
                          disabled={isFetching === r.id}
                          onMouseEnter={audioEngine.playHoverTick}
                        >
                          {isFetching === r.id ? <Download size={11} /> : <Download size={11} />}
                          <span>{isFetching === r.id ? 'Fetching...' : 'Fetch All'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults && searchResults.length === 0 && !isSearching && (
                  <div className="sgdb-no-results">No results found</div>
                )}

                {!searchResults && !isSearching && (
                  <div className="sgdb-hint">
                    Fetch cover art, banners, logos, and icons from SteamGridDB
                  </div>
                )}
              </div>

              {/* Artwork Previews */}
              <div className="preview-aspects-row">
                <div className="aspect-ratio-preview vert-aspect clickable-preview" title="Cover" onClick={() => handleImagePick(setCoverUrl)}>
                  {coverUrl ? <img src={coverUrl} alt="Cover Preview" /> : <span>Cover</span>}
                </div>
                <div className="aspect-ratio-preview horiz-aspect clickable-preview" title="Banner" onClick={() => handleImagePick(setBannerUrl)}>
                  {bannerUrl ? <img src={bannerUrl} alt="Banner Preview" /> : <span>Banner</span>}
                </div>
                <div className="aspect-ratio-preview vert-aspect clickable-preview" title="Logo" onClick={() => handleImagePick(setLogoUrl)}>
                  {logoUrl ? <img src={logoUrl} alt="Logo Preview" style={{ objectFit: 'contain' }} /> : <span>Logo</span>}
                </div>
                <div className="aspect-ratio-preview sq-aspect clickable-preview" title="Icon" onClick={() => handleImagePick(setIconUrl)}>
                  {iconUrl ? <img src={iconUrl} alt="Icon Preview" /> : <span>Icon</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="editor-footer-row">
            <button 
              type="button" 
              className="glow-btn"
              onClick={handleClose}
              onMouseEnter={audioEngine.playHoverTick}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="glow-btn glow-btn-primary"
              onMouseEnter={audioEngine.playHoverTick}
            >
              <Save size={14} />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>


    </div>
  );
}
