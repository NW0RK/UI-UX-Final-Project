import React, { useEffect, useRef } from 'react';
import { Delete, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const KEY_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

function VirtualKey({ children, label, className = '', isDefault = false, onClick }) {
  return (
    <button
      type="button"
      className={`virtual-key ${className}`}
      aria-label={label}
      onClick={onClick}
      data-controller-item="true"
      data-controller-default={isDefault ? 'true' : undefined}
      data-controller-confirm-label={label}
    >
      {children}
    </button>
  );
}

export default function VirtualKeyboard({ value, onChange, onClose }) {
  const keyboardRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      keyboardRef.current?.querySelector('[data-controller-default="true"]')?.focus({ preventScroll: true });
    }, 30);

    return () => window.clearTimeout(timer);
  }, []);

  const updateValue = (nextValue) => {
    audioEngine.playClickPulse();
    onChange(nextValue);
  };

  const appendKey = (key) => updateValue(`${value}${key.toLowerCase()}`);
  const removeLast = () => updateValue(value.slice(0, -1));
  const clearValue = () => updateValue('');

  return (
    <div
      ref={keyboardRef}
      className="virtual-keyboard-overlay"
      role="dialog"
      aria-label="Search keyboard"
    >
      <div className="virtual-keyboard-topline">
        <span className="virtual-keyboard-label">Search keyboard</span>
        <button
          type="button"
          className="virtual-key virtual-key-icon"
          aria-label="Close search keyboard"
          onClick={onClose}
          data-controller-back="true"
          data-controller-item="true"
          data-controller-confirm-label="Close keyboard"
        >
          <X size={16} />
        </button>
      </div>

      <div className="virtual-keyboard-preview" aria-live="polite">
        {value || 'Search games...'}
      </div>

      <div className="virtual-keyboard-rows">
        {KEY_ROWS.map((row, rowIndex) => (
          <div className="virtual-keyboard-row" key={row.join('')}>
            {row.map((key, keyIndex) => (
              <VirtualKey
                key={key}
                label={`Type ${key}`}
                isDefault={rowIndex === 1 && keyIndex === 0}
                onClick={() => appendKey(key)}
              >
                {key}
              </VirtualKey>
            ))}
          </div>
        ))}

        <div className="virtual-keyboard-row virtual-keyboard-actions">
          <VirtualKey label="Clear search" className="virtual-key-wide" onClick={clearValue}>
            Clear
          </VirtualKey>
          <VirtualKey label="Add space" className="virtual-key-space" onClick={() => updateValue(`${value} `)}>
            Space
          </VirtualKey>
          <VirtualKey label="Backspace" className="virtual-key-wide" onClick={removeLast}>
            <Delete size={16} />
            <span>Backspace</span>
          </VirtualKey>
          <VirtualKey label="Done" className="virtual-key-wide virtual-key-primary" onClick={onClose}>
            Done
          </VirtualKey>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .virtual-keyboard-overlay {
          position: fixed;
          top: calc(var(--header-height) + 12px);
          left: 50%;
          transform: translateX(-50%);
          width: min(760px, calc(100vw - 32px));
          padding: 14px;
          z-index: 12000;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          background: rgba(7, 13, 23, 0.94);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.46), 0 0 0 1px rgba(var(--accent-color-rgb), 0.12);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          -webkit-app-region: no-drag;
        }

        .virtual-keyboard-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .virtual-keyboard-label {
          color: rgba(255, 255, 255, 0.62);
          font-family: var(--font-sans);
          font-size: var(--fs-12);
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .virtual-keyboard-preview {
          min-height: 34px;
          margin-bottom: 12px;
          padding: 8px 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-sans);
          font-size: var(--fs-14);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .virtual-keyboard-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .virtual-keyboard-row {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          gap: 8px;
        }

        .virtual-keyboard-row:nth-child(3) {
          padding-inline: 28px;
          grid-template-columns: repeat(9, minmax(0, 1fr));
        }

        .virtual-keyboard-row:nth-child(4) {
          padding-inline: 64px;
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }

        .virtual-keyboard-actions {
          grid-template-columns: 1.15fr 3fr 1.4fr 1.15fr;
        }

        .virtual-key {
          min-width: 0;
          min-height: 42px;
          padding: 0 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.055);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: var(--fs-13);
          font-weight: 800;
          line-height: 1;
          cursor: pointer;
          transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
        }

        .virtual-key:hover,
        .virtual-key:focus-visible,
        body.controller-navigation-active .virtual-key:focus {
          border-color: rgba(var(--accent-color-rgb), 0.72);
          background: rgba(var(--accent-color-rgb), 0.16);
          color: #fff;
          transform: translateY(-1px);
        }

        .virtual-key:focus-visible,
        body.controller-navigation-active .virtual-key:focus {
          box-shadow: var(--focus-ring-shadow);
        }

        .virtual-key-primary {
          border-color: rgba(var(--accent-color-rgb), 0.48);
          background: rgba(var(--accent-color-rgb), 0.22);
        }

        .virtual-key-icon {
          width: 34px;
          min-height: 34px;
          padding: 0;
          border-radius: 50%;
          flex: 0 0 auto;
        }

        @media (max-width: 680px) {
          .virtual-keyboard-overlay {
            top: calc(var(--header-height) + 8px);
            width: calc(100vw - 16px);
            padding: 10px;
          }

          .virtual-keyboard-row,
          .virtual-keyboard-row:nth-child(3),
          .virtual-keyboard-row:nth-child(4) {
            padding-inline: 0;
            gap: 5px;
          }

          .virtual-key {
            min-height: 36px;
            padding: 0 6px;
            font-size: var(--fs-12);
          }

          .virtual-keyboard-actions {
            grid-template-columns: 1fr 1.6fr 1.35fr 1fr;
          }
        }
      ` }} />
    </div>
  );
}
