import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const buildDir = resolve(process.cwd(), 'dist/web');
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.map', '.svg', '.txt']);
const markers = [
  'visual-only sample data',
  'visual-only fixture',
  'ILLUSTRATIVE-SAMPLE-',
  'PLACEHOLDER-CURRENCY',
  'Local draft — not saved',
  'Prototype guard only',
  'prototype role selector',
  'Prototype week 01',
];

if (!existsSync(buildDir)) {
  console.error(`FAIL: production build directory not found: ${buildDir}`);
  process.exit(1);
}

const files = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (
      entry.isFile() &&
      textExtensions.has(entry.name.slice(entry.name.lastIndexOf('.')))
    ) {
      files.push(fullPath);
    }
  }
}

walk(buildDir);

const hits = [];
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const marker of markers) {
    if (content.includes(marker)) {
      hits.push({ file, marker });
    }
  }
}

if (hits.length > 0) {
  console.error('FAIL: fixture markers found in production build:');
  for (const hit of hits) {
    console.error(`  ${hit.file}: ${hit.marker}`);
  }
  process.exit(1);
}

console.log(`PASS: no fixture markers found in ${files.length} production build files.`);
