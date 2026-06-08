import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Loader2, Search, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

function getReleaseYear(item) {
  const value = String(item?.releaseDate || '').trim();
  return /^\d{4}/.test(value) ? value.slice(0, 4) : null;
}

export default function ImportNamePrompt({
  file,
  index = 0,
  total = 1,
  onSearchSuggestions,
  onConfirm,
  onCancel,
  isBusy = false
}) {
  const [query, setQuery] = useState(file?.suggestedTitle || file?.name || '');
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(file?.suggestedTitle || file?.name || '');
    setSuggestions([]);
    setStatus('idle');
    setError(null);
    setActiveIndex(0);
  }, [file?.path, file?.name, file?.suggestedTitle]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(timer);
  }, [file?.path]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 3 || !onSearchSuggestions) {
      setSuggestions([]);
      setStatus('idle');
      setError(null);
      setActiveIndex(0);
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const results = await onSearchSuggestions(term);
        if (cancelled) return;
        setSuggestions(Array.isArray(results) ? results.slice(0, 5) : []);
        setStatus('ready');
        setActiveIndex(0);
      } catch (err) {
        if (cancelled) return;
        setSuggestions([]);
        setStatus('error');
        setError(err.message || 'Suggestion lookup failed');
      }
    }, 380);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, onSearchSuggestions]);

  const activeSuggestion = useMemo(() => suggestions[activeIndex] || null, [activeIndex, suggestions]);
  const canConfirm = query.trim().length > 0;

  const confirm = (suggestion = activeSuggestion) => {
    if (!canConfirm || isBusy) return;
    audioEngine.playClickPulse();
    onConfirm({
      title: suggestion?.title || query.trim(),
      suggestion: suggestion || null
    });
  };

  const cancel = () => {
    if (isBusy) return;
    audioEngine.playClickPulse();
    onCancel();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (suggestions.length > 0) {
        setActiveIndex(prev => (prev + 1) % suggestions.length);
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (suggestions.length > 0) {
        setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      }
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      confirm();
    }
  };

  if (!file) return null;

  return (
    <div className="import-name-overlay" role="presentation">
      <div
        className="import-name-prompt glass-panel-heavy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-name-title"
      >
        <div className="import-name-meta-row">
          <span id="import-name-title">Name local game</span>
          <span>{index + 1} of {total}</span>
        </div>

        <div className="import-name-search-shell">
          <Search size={20} className="import-name-search-icon" />
          <input
            ref={inputRef}
            className="import-name-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Game name"
            aria-controls="import-name-suggestions"
            aria-activedescendant={activeSuggestion ? `import-suggestion-${activeSuggestion.id}` : undefined}
            placeholder="Enter game name"
          />
          {(status === 'loading' || isBusy) && <Loader2 size={18} className="import-name-loading" />}
          <button
            type="button"
            className="import-name-icon-btn"
            onClick={cancel}
            disabled={isBusy}
            onMouseEnter={audioEngine.playHoverTick}
            aria-label="Skip this executable"
            data-controller-back="true"
          >
            <X size={18} />
          </button>
        </div>

        <div className="import-name-path" title={file.path}>{file.path}</div>

        <div id="import-name-suggestions" className="import-name-suggestions" role="listbox">
          {suggestions.map((item, itemIndex) => {
            const isActive = itemIndex === activeIndex;
            return (
              <button
                key={item.id || `${item.title}-${itemIndex}`}
                id={`import-suggestion-${item.id}`}
                type="button"
                className={`import-name-suggestion ${isActive ? 'is-active' : ''}`}
                role="option"
                aria-selected={isActive}
                onClick={() => confirm(item)}
                disabled={isBusy}
                onFocus={() => setActiveIndex(itemIndex)}
                onMouseEnter={() => {
                  audioEngine.playHoverTick();
                  setActiveIndex(itemIndex);
                }}
                data-controller-item="true"
                data-controller-selected={isActive ? 'true' : undefined}
                data-controller-confirm-label={`Use ${item.title}`}
              >
                <span className="import-suggestion-cover">
                  {item.coverUrl ? <img src={item.coverUrl} alt="" /> : <Search size={15} />}
                </span>
                <span className="import-suggestion-copy">
                  <span className="import-suggestion-title">
                    {item.title}
                    {getReleaseYear(item) && <span>{getReleaseYear(item)}</span>}
                  </span>
                  <span className="import-suggestion-studio">
                    {item.developer || item.publisher || 'Unknown studio'}
                  </span>
                </span>
                <span className="import-suggestion-source">{item.source === 'igdb' ? 'IGDB' : 'Match'}</span>
              </button>
            );
          })}

          {status === 'ready' && suggestions.length === 0 && (
            <div className="import-name-empty">No suggestions yet. Press Enter to use the typed name.</div>
          )}

          {status === 'error' && (
            <div className="import-name-empty">{error}. Press Enter to use the typed name.</div>
          )}
        </div>

        <div className="import-name-actions">
          <button
            type="button"
            className="import-name-secondary-btn"
            onClick={cancel}
            disabled={isBusy}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <X size={15} />
            <span>Skip</span>
          </button>
          <button
            type="button"
            className="import-name-primary-btn"
            onClick={() => confirm()}
            disabled={!canConfirm || isBusy}
            onMouseEnter={audioEngine.playHoverTick}
            data-controller-item="true"
            data-controller-default="true"
            data-controller-confirm-label="Confirm game name"
          >
            <Check size={16} />
            <span>{isBusy ? 'Importing' : activeSuggestion ? 'Use Match' : 'Use Name'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
