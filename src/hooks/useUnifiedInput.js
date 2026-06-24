import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="checkbox"]:not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const NAVIGABLE_ITEM_SELECTOR = '[data-controller-item="true"]';

const ROOT_SELECTORS = [
  '.media-lightbox-overlay',
  '.profile-overlay-fullscreen',
  '.meta-editor-overlay',
  '.settings-overlay',
  '.virtual-keyboard-overlay',
  '.control-center-drawer-container.drawer-open',
  '.app-container'
];

const KEY_ACTIONS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  W: 'up',
  s: 'down',
  S: 'down',
  a: 'left',
  A: 'left',
  d: 'right',
  D: 'right',
  Enter: 'confirm',
  NumpadEnter: 'confirm',
  ' ': 'confirm',
  Escape: 'back',
  q: 'shoulderLeft',
  Q: 'shoulderLeft',
  e: 'shoulderRight',
  E: 'shoulderRight',
  PageUp: 'shoulderLeft',
  PageDown: 'shoulderRight',
  f: 'secondary',
  F: 'secondary',
  c: 'tertiary',
  C: 'tertiary',
  m: 'menu',
  M: 'menu',
  h: 'toggleHints',
  H: 'toggleHints'
};

const REPEATABLE_ACTIONS = new Set(['up', 'down', 'left', 'right']);
const INITIAL_REPEAT_DELAY = 360;
const REPEAT_DELAY = 130;
const DEADZONE = 0.45;

function isEditableElement(element) {
  if (!element) return false;
  const tagName = element.tagName?.toLowerCase();
  return (
    element.isContentEditable ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    (tagName === 'input' && !['button', 'checkbox', 'radio', 'range', 'submit'].includes(element.type))
  );
}

function isVisible(element) {
  if (!element || element.closest('[aria-hidden="true"]')) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getActiveRoot() {
  return ROOT_SELECTORS.map(selector => document.querySelector(selector)).find(Boolean) || document.body;
}

function getFocusableElements(root = getActiveRoot()) {
  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(element => {
      if (element.disabled || !isVisible(element)) return false;

      const parentItem = element.closest(NAVIGABLE_ITEM_SELECTOR);
      if (parentItem && parentItem !== element && !element.dataset.controllerNested) {
        return false;
      }

      return true;
    });
}

function markNavigationActive(mode) {
  document.body.dataset.inputMode = mode;
  document.body.classList.toggle('controller-navigation-active', mode !== 'mouse');
}

function focusElement(element) {
  if (!element) return false;
  element.focus({ preventScroll: true });
  element.classList.add('controller-focus-pulse');
  window.setTimeout(() => element.classList.remove('controller-focus-pulse'), 220);
  element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  return true;
}

function focusPreferredElement() {
  const root = getActiveRoot();
  const current = document.activeElement;
  if (current && current !== document.body && root.contains(current) && isVisible(current)) {
    return true;
  }

  const preferred =
    root.querySelector('[data-controller-selected="true"]') ||
    root.querySelector('[data-controller-default="true"]') ||
    getFocusableElements(root)[0];

  return focusElement(preferred);
}

function getFallbackFocus(current, candidates, direction) {
  const currentIndex = candidates.indexOf(current);
  if (currentIndex === -1) return candidates[0];

  const horizontal = direction === 'left' || direction === 'right';
  const delta = direction === 'left' || direction === 'up' ? -1 : 1;
  const nextIndex = currentIndex + delta;

  if (horizontal && nextIndex >= 0 && nextIndex < candidates.length) {
    return candidates[nextIndex];
  }

  return candidates[Math.max(0, Math.min(candidates.length - 1, nextIndex))];
}

function getNavigationCandidates(root, current, direction) {
  const itemRoot = current?.closest?.(NAVIGABLE_ITEM_SELECTOR);
  const scopedItems = itemRoot
    ? Array.from(root.querySelectorAll(NAVIGABLE_ITEM_SELECTOR)).filter(isVisible)
    : [];

  if (scopedItems.length > 1 && (direction === 'left' || direction === 'right')) {
    return scopedItems;
  }

  return getFocusableElements(root);
}

function moveSpatialFocus(direction) {
  const root = getActiveRoot();
  const directionalTarget = root.querySelector(`[data-controller-${direction}="true"]`);
  if (directionalTarget && isVisible(directionalTarget)) {
    directionalTarget.click();
    return true;
  }

  const current = root.contains(document.activeElement) ? document.activeElement : null;
  const candidates = getNavigationCandidates(root, current, direction);
  if (candidates.length === 0) return false;

  if (!current || current === document.body || !isVisible(current)) {
    return focusElement(
      root.querySelector('[data-controller-selected="true"]') ||
      root.querySelector('[data-controller-default="true"]') ||
      candidates[0]
    );
  }

  const currentRect = current.getBoundingClientRect();
  const currentCenter = {
    x: currentRect.left + currentRect.width / 2,
    y: currentRect.top + currentRect.height / 2
  };

  let best = null;
  let bestScore = Infinity;

  for (const candidate of candidates) {
    if (candidate === current) continue;

    const rect = candidate.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    const dx = center.x - currentCenter.x;
    const dy = center.y - currentCenter.y;

    const movingLeft = direction === 'left' && dx < -8;
    const movingRight = direction === 'right' && dx > 8;
    const movingUp = direction === 'up' && dy < -8;
    const movingDown = direction === 'down' && dy > 8;
    if (!movingLeft && !movingRight && !movingUp && !movingDown) continue;

    const primaryDistance = direction === 'left' || direction === 'right' ? Math.abs(dx) : Math.abs(dy);
    const crossDistance = direction === 'left' || direction === 'right' ? Math.abs(dy) : Math.abs(dx);
    const score = primaryDistance + crossDistance * 2.2;

    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return focusElement(best || getFallbackFocus(current, candidates, direction));
}

function activateFocusedElement() {
  if (!focusPreferredElement()) return false;

  const active = document.activeElement;
  if (!active || isEditableElement(active)) return false;

  if (active.matches('input[type="range"]')) return false;

  active.click();
  return true;
}

function clickScopedBackTarget() {
  const root = getActiveRoot();
  const backTarget = root.querySelector('[data-controller-back="true"]');
  if (!backTarget || !isVisible(backTarget)) return false;
  backTarget.click();
  return true;
}

function readButton(button) {
  return Boolean(button?.pressed || button?.value > 0.5);
}

function applyAxisPair(actions, axes, xIndex, yIndex) {
  const x = axes[xIndex] || 0;
  const y = axes[yIndex] || 0;

  if (x <= -DEADZONE) actions.left = true;
  if (x >= DEADZONE) actions.right = true;
  if (y <= -DEADZONE) actions.up = true;
  if (y >= DEADZONE) actions.down = true;
}

function applyHatAxis(actions, value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return;

  const hats = [
    { value: -0.714, directions: ['up', 'left'] },
    { value: -0.428, directions: ['up'] },
    { value: -0.143, directions: ['up', 'right'] },
    { value: 0.143, directions: ['right'] },
    { value: 0.428, directions: ['down', 'right'] },
    { value: 0.714, directions: ['down'] },
    { value: 1, directions: ['down', 'left'] }
  ];

  const match = hats.find(hat => Math.abs(value - hat.value) < 0.08);
  if (!match) return;
  match.directions.forEach(direction => {
    actions[direction] = true;
  });
}

function readGamepadActions(gamepad) {
  const buttons = gamepad.buttons || [];
  const axes = gamepad.axes || [];
  const actions = {
    confirm: readButton(buttons[0]),
    back: readButton(buttons[1]),
    secondary: readButton(buttons[2]),
    tertiary: readButton(buttons[3]),
    shoulderLeft: readButton(buttons[4]),
    shoulderRight: readButton(buttons[5]),
    menu: readButton(buttons[8]) || readButton(buttons[9]),
    toggleHints: readButton(buttons[10]),
    up: readButton(buttons[12]),
    down: readButton(buttons[13]),
    left: readButton(buttons[14]),
    right: readButton(buttons[15])
  };

  applyAxisPair(actions, axes, 0, 1);
  applyAxisPair(actions, axes, 2, 3);
  applyAxisPair(actions, axes, 4, 5);
  applyAxisPair(actions, axes, 6, 7);

  axes.slice(2).forEach(axis => applyHatAxis(actions, axis));

  return actions;
}

function getPrimaryGamepad() {
  if (!navigator.getGamepads) return null;
  return Array.from(navigator.getGamepads()).find(Boolean) || null;
}

export function useUnifiedInput({
  onBack,
  onShoulderLeft,
  onShoulderRight,
  onSecondary,
  onTertiary,
  onMenu,
  focusDependencies = []
} = {}) {
  const callbacksRef = useRef({});
  const buttonStateRef = useRef({});
  const frameRef = useRef(null);

  callbacksRef.current = {
    onBack,
    onShoulderLeft,
    onShoulderRight,
    onSecondary,
    onTertiary,
    onMenu
  };

  const performAction = useCallback((action, source = 'keyboard') => {
    markNavigationActive(source);

    if (action === 'up' || action === 'down' || action === 'left' || action === 'right') {
      return moveSpatialFocus(action);
    }

    if (action === 'confirm') {
      return activateFocusedElement();
    }

    if (action === 'back') {
      return clickScopedBackTarget() || callbacksRef.current.onBack?.() || false;
    }

    if (action === 'shoulderLeft') {
      return callbacksRef.current.onShoulderLeft?.() || false;
    }

    if (action === 'shoulderRight') {
      return callbacksRef.current.onShoulderRight?.() || false;
    }

    if (action === 'secondary') {
      return callbacksRef.current.onSecondary?.() || false;
    }

    if (action === 'tertiary') {
      return callbacksRef.current.onTertiary?.() || false;
    }

    if (action === 'menu') {
      return callbacksRef.current.onMenu?.() || false;
    }

    if (action === 'toggleHints') {
      window.dispatchEvent(new CustomEvent('controller-hints-toggle'));
      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    const handleKeyDown = event => {
      const action = KEY_ACTIONS[event.key];
      if (!action) return;

      if (isEditableElement(event.target) && action !== 'back') return;
      if (!REPEATABLE_ACTIONS.has(action) && event.repeat) return;

      if (performAction(action, 'keyboard')) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handlePointerMode = () => markNavigationActive('mouse');

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('pointerdown', handlePointerMode, true);
    window.addEventListener('mousemove', handlePointerMode, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('pointerdown', handlePointerMode, true);
      window.removeEventListener('mousemove', handlePointerMode, true);
    };
  }, [performAction]);

  useEffect(() => {
    const pollGamepads = () => {
      const gamepad = getPrimaryGamepad();
      if (gamepad) {
        const now = performance.now();
        const actions = readGamepadActions(gamepad);
        const nextState = {};

        Object.entries(actions).forEach(([action, pressed]) => {
          const previous = buttonStateRef.current[action] || {};
          if (!pressed) {
            nextState[action] = { pressed: false, pressedAt: 0, lastFired: 0 };
            return;
          }

          const pressedAt = previous.pressed ? previous.pressedAt : now;
          const lastFired = previous.lastFired || 0;
          const hasRepeated = now - pressedAt > INITIAL_REPEAT_DELAY;
          const canRepeat = REPEATABLE_ACTIONS.has(action) && hasRepeated && now - lastFired > REPEAT_DELAY;
          const shouldFire = !previous.pressed || canRepeat;

          if (shouldFire && performAction(action, 'gamepad')) {
            nextState[action] = { pressed: true, pressedAt, lastFired: now };
          } else {
            nextState[action] = {
              pressed: true,
              pressedAt,
              lastFired: previous.lastFired || (shouldFire ? now : 0)
            };
          }
        });

        buttonStateRef.current = nextState;
      }

      frameRef.current = requestAnimationFrame(pollGamepads);
    };

    frameRef.current = requestAnimationFrame(pollGamepads);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [performAction]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      focusPreferredElement();
    }, 60);

    return () => window.clearTimeout(timer);
  }, focusDependencies);
}
