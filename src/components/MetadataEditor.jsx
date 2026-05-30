import React, { useState } from 'react';
import { X, Save, Film, Image, Keyboard, Tag, Search, Download, Cloud } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

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
  const [coverUrl, setCoverUrl] = useState(game.coverUrl);
  const [bannerUrl, setBannerUrl] = useState(game.bannerUrl);
  const [logoUrl, setLogoUrl] = useState(game.logoUrl || '');
  const [iconUrl, setIconUrl] = useState(game.iconUrl || '');
  const [tagsInput, setTagsInput] = useState(game.tags?.join(', ') || '');
  const [exePath, setExePath] = useState(game.exePath);

  const [searchTerm, setSearchTerm] = useState(game.title);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(null); // sgdbId of currently fetching
  const [searchError, setSearchError] = useState(null);

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
      coverUrl,
      bannerUrl,
      logoUrl: logoUrl || null,
      iconUrl: iconUrl || null,
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
        }
      }
    } catch (e) {
      setSearchError(e.message);
    }
    setIsFetching(null);
  };

  const getResultName = (r) => r.name || game.title;

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
                <div className="aspect-ratio-preview vert-aspect" title="Cover">
                  {coverUrl ? <img src={coverUrl} alt="Cover Preview" /> : <span>Cover</span>}
                </div>
                <div className="aspect-ratio-preview horiz-aspect" title="Banner">
                  {bannerUrl ? <img src={bannerUrl} alt="Banner Preview" /> : <span>Banner</span>}
                </div>
                <div className="aspect-ratio-preview vert-aspect" title="Logo">
                  {logoUrl ? <img src={logoUrl} alt="Logo Preview" style={{ objectFit: 'contain' }} /> : <span>Logo</span>}
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

      <style dangerouslySetInnerHTML={{__html: `
        .meta-editor-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          pointer-events: auto;
        }

        .meta-editor-modal {
          width: 950px;
          max-width: 90%;
          max-height: 85vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scale-up-editor 0.4s var(--ease-ps5) forwards;
        }

        @keyframes scale-up-editor {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1.0); opacity: 1; }
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .editor-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .editor-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .editor-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .editor-form-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .editor-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group-row {
          display: flex;
          gap: 12px;
        }

        .flex-1 {
          flex: 1;
        }

        .form-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .label-icon {
          color: var(--accent-color);
          margin-right: 6px;
        }

        .flex-center-start {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .editor-input {
          font-size: 13px;
          padding: 10px 14px;
        }

        .editor-textarea {
          font-size: 13px;
          line-height: 1.5;
          resize: none;
        }

        .exe-path-input {
          font-family: monospace;
          font-size: 11px;
          border-color: rgba(var(--accent-color-rgb), 0.25);
        }

        .artwork-fetch-section {
          background: rgba(var(--accent-color-rgb), 0.02);
          border: 1px solid rgba(var(--accent-color-rgb), 0.08);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sgdb-search-row {
          display: flex;
          gap: 6px;
        }

        .sgdb-search-input {
          flex: 1;
          font-size: 12px;
          padding: 8px 10px;
        }

        .sgdb-search-btn {
          padding: 6px 10px;
          flex-shrink: 0;
        }

        .sgdb-error {
          font-size: 10px;
          color: #ef4444;
          padding: 4px 0;
        }

        .sgdb-results {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 160px;
          overflow-y: auto;
        }

        .sgdb-result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 6px 10px;
          gap: 8px;
        }

        .sgdb-result-info {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          flex: 1;
        }

        .sgdb-result-name {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sgdb-result-year {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          flex-shrink: 0;
        }

        .sgdb-apply-btn {
          font-size: 10px;
          padding: 4px 10px;
          flex-shrink: 0;
          gap: 4px;
        }

        .sgdb-no-results, .sgdb-hint {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          padding: 8px 0;
        }

        .preview-aspects-row {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .aspect-ratio-preview {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .vert-aspect {
          width: 70px;
          height: 90px;
        }

        .horiz-aspect {
          flex: 1;
          height: 90px;
        }

        .aspect-ratio-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .editor-footer-row {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: auto;
        }
      `}} />
    </div>
  );
}
