import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/apiClient';
import { LoginEndpoint } from '../../src/api/data/endpoints';

let client: ApiClient;

test.beforeEach(async () => {
  client = new ApiClient();
  await client.init();
});

test.afterEach(async () => {
  await client.dispose();
});

// A1.7
test('Failed login validation: Missing password', async () => {
  const response = await client.post(LoginEndpoint, {
    email: 'peter@klaven',
  });
  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.error).toBe('Missing password');
});

// A1.8
test('Failed login validation: Missing email or username', async () => {
  const response = await client.post(LoginEndpoint, {});
  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.error).toBe('Missing email or username');
});