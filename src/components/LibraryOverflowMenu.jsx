import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Edit, MoreVertical, Trash2, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function LibraryOverflowMenu({
  onEditMetadata,
  onRemove,
  label = 'More library actions',
  className = '',
  triggerClassName = '',
  menuClassName = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      setIsOpen(false);
      setIsConfirming(false);
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      setIsConfirming(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const stopCardEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleToggle = (event) => {
    stopCardEvent(event);
    audioEngine.playClickPulse();
    setIsOpen(prev => !prev);
    setIsConfirming(false);
  };

  const handleRemoveRequest = (event) => {
    stopCardEvent(event);
    audioEngine.playClickPulse();
    setIsConfirming(true);
  };

  const handleEditMetadata = (event) => {
    stopCardEvent(event);
    audioEngine.playClickPulse();
    setIsOpen(false);
    setIsConfirming(false);
    onEditMetadata();
  };

  const handleCancel = (event) => {
    stopCardEvent(event);
    audioEngine.playClickPulse();
    setIsConfirming(false);
    setIsOpen(false);
  };

  const handleConfirmRemove = (event) => {
    stopCardEvent(event);
    audioEngine.playClickPulse();
    setIsOpen(false);
    setIsConfirming(false);
    onRemove();
  };

  return (
    <div className={`library-overflow-menu ${className}`} ref={menuRef}>
      <button
        type="button"
        className={`library-overflow-trigger ${triggerClassName}`}
        onClick={handleToggle}
        onMouseEnter={audioEngine.playHoverTick}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title={label}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className={`library-overflow-popover ${menuClassName}`} role="menu">
          {isConfirming ? (
            <div className="library-remove-confirmation" role="group" aria-label="Confirm remove from library">
              <div className="library-remove-confirmation-copy">
                <AlertTriangle size={14} />
                <span>Remove from Library?</span>
              </div>
              <div className="library-remove-confirmation-actions">
                <button type="button" className="library-confirm-cancel" onClick={handleCancel} title="Cancel">
                  <X size={13} />
                </button>
                <button type="button" className="library-confirm-remove" onClick={handleConfirmRemove}>
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <>
              {onEditMetadata && (
                <button
                  type="button"
                  className="library-overflow-menu-item"
                  role="menuitem"
                  onClick={handleEditMetadata}
                >
                  <Edit size={14} />
                  <span>Metadata</span>
                </button>
              )}
              <button
                type="button"
                className="library-overflow-menu-item danger"
                role="menuitem"
                onClick={handleRemoveRequest}
              >
                <Trash2 size={14} />
                <span>Remove from Library</span>
              </button>
            </>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .library-overflow-menu {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
        }

        .library-overflow-trigger {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.68);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .library-overflow-trigger:hover,
        .library-overflow-trigger[aria-expanded="true"] {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
        }

        .library-overflow-popover {
          position: absolute;
          right: 0;
          bottom: calc(100% + 10px);
          min-width: 186px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(10, 10, 16, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.48), 0 0 18px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .library-overflow-menu-item {
          width: 100%;
          min-height: 34px;
          border: none;
          border-radius: 6px;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-sans);
          font-size: var(--fs-11);
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .library-overflow-menu-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .library-overflow-menu-item svg {
          color: var(--accent-color);
        }

        .library-overflow-menu-item.danger:hover {
          color: #fff;
          background: rgba(239, 68, 68, 0.14);
        }

        .library-overflow-menu-item.danger svg {
          color: #ef4444;
        }

        .library-remove-confirmation {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 198px;
        }

        .library-remove-confirmation-copy {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-sans);
          font-size: var(--fs-11);
          font-weight: 800;
        }

        .library-remove-confirmation-copy svg {
          color: #ef4444;
        }

        .library-remove-confirmation-actions {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 8px;
        }

        .library-confirm-cancel,
        .library-confirm-remove {
          min-height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-sans);
          font-size: var(--fs-11);
          font-weight: 800;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .library-confirm-cancel {
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .library-confirm-cancel:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .library-confirm-remove {
          background: rgba(239, 68, 68, 0.16);
          border-color: rgba(239, 68, 68, 0.32);
          color: #ffffff;
        }

        .library-confirm-remove:hover {
          background: #ef4444;
          border-color: #ef4444;
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.35);
        }
      `}} />
    </div>
  );
}
