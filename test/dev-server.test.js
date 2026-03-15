/**
 * Dev Server Tests
 * 
 * Tests to verify the development server is working
 * Note: These tests require the dev server to be running on port 3000
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

const DEV_PORT = 3000;
const DEV_URL = `http://localhost:${DEV_PORT}`;

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, content: data }));
    }).on('error', reject);
  });
}

describe('Dev Server Tests', () => {
  test('dev server should respond on homepage', async () => {
    const response = await fetchUrl(DEV_URL);
    assert.strictEqual(response.status, 200, 'Should return 200 status');
  });

  test('homepage should contain China data', async () => {
    const response = await fetchUrl(DEV_URL);
    assert.ok(response.content.includes('China') || response.content.includes('Population'), 
      'Should contain China or Population');
  });

  test('should support English locale', async () => {
    const response = await fetchUrl(`${DEV_URL}?lang=en_US`);
    assert.strictEqual(response.status, 200, 'Should return 200 for en_US');
  });

  test('should support Chinese locale', async () => {
    const response = await fetchUrl(`${DEV_URL}?lang=zh_CN`);
    assert.strictEqual(response.status, 200, 'Should return 200 for zh_CN');
    assert.ok(response.content.includes('中国'), 'Should contain Chinese characters');
  });

  test('should serve static CSS', async () => {
    const response = await fetchUrl(`${DEV_URL}/css/style.css`);
    assert.strictEqual(response.status, 200, 'Should return 200 for CSS');
    assert.ok(response.content.includes('.header'), 'Should contain header styles');
  });

  test('should serve static JavaScript', async () => {
    const response = await fetchUrl(`${DEV_URL}/js/background.js`);
    assert.strictEqual(response.status, 200, 'Should return 200 for JS');
    assert.ok(response.content.includes('canvas'), 'Should contain canvas code');
  });
});
