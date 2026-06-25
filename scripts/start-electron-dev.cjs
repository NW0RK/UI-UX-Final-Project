#!/usr/bin/env node

const { spawn } = require('child_process');
const electronPath = require('electron');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

console.info([
  '',
  'Nexus Launcher is an Electron desktop app.',
  'Use the Electron window that opens; the Vite localhost URL is only the internal renderer server and is not intended for direct browser use.',
  ''
].join('\n'));

const child = spawn(electronPath, ['.'], {
  env,
  stdio: 'inherit',
  windowsHide: false
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}

child.on('close', (code, signal) => {
  if (signal) {
    console.error(`${electronPath} exited with signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 0);
});
