import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import { CONFIG } from './config.mjs';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchWithRetry(url, options = {}, retries = CONFIG.maxRetries) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': CONFIG.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ja,en;q=0.9',
          ...options.headers,
        },
        ...options,
      });
      if (res.status === 429 || res.status >= 500) {
        log(`  [RETRY ${i + 1}] ${url} → ${res.status}`);
        await sleep(CONFIG.retryDelay * (i + 1));
        continue;
      }
      if (!res.ok) {
        log(`  [SKIP] ${url} → ${res.status}`);
        return null;
      }
      return await res.text();
    } catch (err) {
      log(`  [ERROR ${i + 1}] ${url} → ${err.message}`);
      if (i < retries) await sleep(CONFIG.retryDelay * (i + 1));
    }
  }
  return null;
}

export function loadCheckpoint() {
  if (!existsSync(CONFIG.checkpointFile)) return {};
  try {
    return JSON.parse(readFileSync(CONFIG.checkpointFile, 'utf-8'));
  } catch {
    return {};
  }
}

export function saveCheckpoint(data) {
  ensureDir(CONFIG.outputDir);
  writeFileSync(CONFIG.checkpointFile, JSON.stringify(data, null, 2));
}

export function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

export function appendToFile(filepath, data) {
  ensureDir(CONFIG.outputDir);
  appendFileSync(filepath, (typeof data === 'string' ? data : JSON.stringify(data)) + '\n');
}

export function readJsonl(filepath) {
  if (!existsSync(filepath)) return [];
  return readFileSync(filepath, 'utf-8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));
}

export function log(msg) {
  const ts = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${ts}] ${msg}`);
}

// Simple HTML text extraction helpers (no cheerio dependency)
export function extractText(html, startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return '';
  const contentStart = start + startTag.length;
  const end = html.indexOf(endTag, contentStart);
  if (end === -1) return '';
  return html.substring(contentStart, end).replace(/<[^>]+>/g, '').trim();
}

export function extractAll(html, pattern) {
  const results = [];
  const regex = new RegExp(pattern, 'g');
  let match;
  while ((match = regex.exec(html)) !== null) {
    results.push(match[1] || match[0]);
  }
  return results;
}

export function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
