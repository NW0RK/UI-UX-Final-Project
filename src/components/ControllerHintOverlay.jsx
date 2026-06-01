import React, { useEffect, useMemo, useState } from 'react';

const GAMEPAD_FAMILY_POLL_MS = 800;

const buttonSets = {
  xbox: {
    confirm: 'A',
    back: 'B',
    secondary: 'X',
    tertiary: 'Y',
    shoulderLeft: 'LB',
    shoulderRight: 'RB',
    menu: 'Menu',
    dpad: 'D-Pad'
  },
  playstation: {
    confirm: '✕',
    back: '○',
    secondary: '□',
    tertiary: '△',
    shoulderLeft: 'L1',
    shoulderRight: 'R1',
    menu: 'Options',
    dpad: 'D-Pad'
  },
  keyboard: {
    confirm: 'Enter',
    back: 'Esc',
    secondary: 'F',
    tertiary: 'C',
    shoulderLeft: 'Q',
    shoulderRight: 'E',
    menu: 'M',
    dpad: 'Arrows'
  }
};

function getGamepadFamily(gamepadId = '') {
  const normalized = gamepadId.toLowerCase();
  if (
    normalized.includes('playstation') ||
    normalized.includes('dualshock') ||
    normalized.includes('dualsense') ||
    normalized.includes('wireless controller') ||
    normalized.includes('sony') ||
    normalized.includes('ps4') ||
    normalized.includes('ps5') ||
    normalized.includes('dinput')
  ) {
    return 'playstation';
  }
  if (normalized.includes('xbox') || normalized.includes('xinput') || normalized.includes('microsoft') || normalized.includes('360')) {
    return 'xbox';
  }
  return 'xbox';
}

function getElementLabel(element) {
  if (!element || element === document.body) return '';

  const datasetLabel = element.dataset?.controllerConfirmLabel || element.dataset?.controllerHint;
  if (datasetLabel) return datasetLabel;

  const ariaLabel = element.getAttribute?.('aria-label');
  if (ariaLabel) return ariaLabel;

  const title = element.getAttribute?.('title');
  if (title) return title;

  const text = element.innerText?.replace(/\s+/g, ' ').trim();
  if (text) return text.length > 34 ? `${text.slice(0, 31)}...` : text;

  return '';
}

function useControllerFamily() {
  const [family, setFamily] = useState(() => document.body?.dataset.inputMode === 'keyboard' ? 'keyboard' : 'xbox');

  useEffect(() => {
    const updateFamily = () => {
      const inputMode = document.body.dataset.inputMode;
      const gamepads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
      const activeGamepad = gamepads[0];

      if (inputMode === 'keyboard' || (!activeGamepad && inputMode !== 'gamepad')) {
        setFamily('keyboard');
        return;
      }

      if (activeGamepad) {
        setFamily(getGamepadFamily(activeGamepad.id));
      }
    };

    const timer = window.setInterval(updateFamily, GAMEPAD_FAMILY_POLL_MS);
    window.addEventListener('gamepadconnected', updateFamily);
    window.addEventListener('gamepaddisconnected', updateFamily);
    window.addEventListener('keydown', updateFamily, true);
    window.addEventListener('pointerdown', updateFamily, true);
    updateFamily();

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('gamepadconnected', updateFamily);
      window.removeEventListener('gamepaddisconnected', updateFamily);
      window.removeEventListener('keydown', updateFamily, true);
      window.removeEventListener('pointerdown', updateFamily, true);
    };
  }, []);

  return family;
}

function useFocusedHint(fallbackLabel) {
  const [label, setLabel] = useState(fallbackLabel);

  useEffect(() => {
    const updateLabel = () => {
      setLabel(getElementLabel(document.activeElement) || fallbackLabel);
    };

    window.addEventListener('focusin', updateLabel);
    window.addEventListener('focusout', updateLabel);
    updateLabel();

    return () => {
      window.removeEventListener('focusin', updateLabel);
      window.removeEventListener('focusout', updateLabel);
    };
  }, [fallbackLabel]);

  return label;
}

function ButtonHint({ family, button, label, tone = 'neutral' }) {
  return (
    <div className={`controller-hint-item hint-${tone}`}>
      <span className={`controller-button-glyph glyph-${family}`}>{button}</span>
      <span className="controller-hint-label">{label}</span>
    </div>
  );
}

export default function ControllerHintOverlay({
  activeView,
  isControlCenterOpen,
  isSettingsOpen,
  isMetadataOpen,
  isProfileOpen,
  isBannerEditMode,
  selectedGame
}) {
  const family = useControllerFamily();
  const buttons = buttonSets[family];

  const fallbackConfirmLabel = useMemo(() => {
    if (isSettingsOpen) return 'Change setting';
    if (isMetadataOpen) return 'Edit field';
    if (isProfileOpen) return 'Edit profile item';
    if (isControlCenterOpen) return 'Use control center item';
    if (activeView === 'store') return 'View game';
    if (activeView === 'store-item') return 'Use selected item';
    if (activeView === 'favourites') return selectedGame ? `Select ${selectedGame.title}` : 'Select favourite';
    return selectedGame ? `Select ${selectedGame.title}` : 'Select game';
  }, [activeView, isControlCenterOpen, isMetadataOpen, isProfileOpen, isSettingsOpen, selectedGame]);

  const focusedLabel = useFocusedHint(fallbackConfirmLabel);

  const contextualHints = useMemo(() => {
    if (isSettingsOpen || isMetadataOpen || isProfileOpen) {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'back', label: 'Close panel' },
        { action: 'dpad', label: 'Move focus' }
      ];
    }

    if (isControlCenterOpen) {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'back', label: 'Close Control Center' },
        { action: 'dpad', label: 'Move focus' }
      ];
    }

    if (isBannerEditMode) {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'back', label: 'Done customizing' },
        { action: 'dpad', label: 'Move focus' }
      ];
    }

    if (activeView === 'store-item') {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'back', label: 'Back to Store' },
        { action: 'dpad', label: 'Browse page' },
        { action: 'menu', label: 'Control Center' }
      ];
    }

    if (activeView === 'store') {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'dpad', label: 'Browse Store' },
        { action: 'shoulderLeft', label: 'Previous tab' },
        { action: 'shoulderRight', label: 'Next tab' },
        { action: 'menu', label: 'Control Center' }
      ];
    }

    if (activeView === 'favourites') {
      return [
        { action: 'confirm', label: focusedLabel, tone: 'primary' },
        { action: 'secondary', label: 'Toggle favourite' },
        { action: 'dpad', label: 'Browse favourites' },
        { action: 'shoulderLeft', label: 'Previous tab' },
        { action: 'shoulderRight', label: 'Next tab' },
        { action: 'menu', label: 'Control Center' }
      ];
    }

    return [
      { action: 'confirm', label: focusedLabel, tone: 'primary' },
      { action: 'secondary', label: 'Toggle favourite' },
      { action: 'tertiary', label: 'Metadata' },
      { action: 'dpad', label: 'Browse library' },
      { action: 'shoulderLeft', label: 'Previous tab' },
      { action: 'shoulderRight', label: 'Next tab' },
      { action: 'menu', label: 'Control Center' }
    ];
  }, [
    activeView,
    focusedLabel,
    isBannerEditMode,
    isControlCenterOpen,
    isMetadataOpen,
    isProfileOpen,
    isSettingsOpen
  ]);

  return (
    <aside className={`controller-hint-overlay controller-family-${family}`} aria-label="Controller and keyboard shortcuts">
      {contextualHints.map(hint => (
        <ButtonHint
          key={`${hint.action}-${hint.label}`}
          family={family}
          button={buttons[hint.action]}
          label={hint.label}
          tone={hint.tone}
        />
      ))}
    </aside>
  );
}
