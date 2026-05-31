const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// All distinct font sizes found in the codebase
const FONT_SIZES = [8, 9, 9.5, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18, 20, 22, 24, 26, 30, 38, 48];

// Generate a CSS variable name from a pixel value: 9.5 -> --fs-9-5, 12 -> --fs-12
function varName(size) {
  return '--fs-' + String(size).replace('.', '-');
}

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

// ---- STEP 1: Replace all calc(Xpx * var(--font-scale)) with var(--fs-X) ----
const files = walk(srcDir).filter(f => /\.(jsx|css)$/.test(f));
let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Match: font-size: calc(Xpx * var(--font-scale))
  const regex = /font-size:\s*calc\((\d+(?:\.\d+)?)px\s*\*\s*var\(--font-scale\)\)/g;
  
  const updated = content.replace(regex, (match, sizeStr) => {
    const size = parseFloat(sizeStr);
    changed = true;
    totalReplacements++;
    return `font-size: var(${varName(size)})`;
  });

  if (changed) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`  Updated: ${path.relative(srcDir, file)}`);
  }
});

console.log(`\nStep 1 done: Replaced ${totalReplacements} calc() expressions with CSS variables.\n`);

// ---- STEP 2: Update index.css :root to define all --fs-* variables ----
const cssPath = path.join(srcDir, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Remove the old --font-scale line
css = css.replace(/\s*--font-scale:\s*1\.0;\s*\n?/g, '\n');

// Build the font-size variable block
const fsBlock = FONT_SIZES.map(s => `  ${varName(s)}: ${s}px;`).join('\n');

// Insert after the --font-sans line
css = css.replace(
  /(--font-sans:\s*[^;]+;)/,
  `$1\n\n  /* Dynamic Font Size Scale */\n${fsBlock}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Step 2 done: Defined all --fs-* variables in index.css :root\n');

// ---- STEP 3: Update App.jsx to dynamically set all --fs-* variables ----
const appPath = path.join(srcDir, 'App.jsx');
let app = fs.readFileSync(appPath, 'utf8');

// Build the JS lines that set all font-size variables
const jsLines = FONT_SIZES.map(s => {
  return `    document.documentElement.style.setProperty('${varName(s)}', \`\${${s} * fontScale}px\`);`;
}).join('\n');

// Replace the old single --font-scale line with the full block
app = app.replace(
  /(\s*)document\.documentElement\.style\.setProperty\('--font-scale'[^;]+;/,
  `$1const fontScale = settings.fontScale || 1.0;\n${jsLines}`
);

fs.writeFileSync(appPath, app, 'utf8');
console.log('Step 3 done: Updated App.jsx to dynamically compute all --fs-* variables\n');

console.log('All steps complete!');
