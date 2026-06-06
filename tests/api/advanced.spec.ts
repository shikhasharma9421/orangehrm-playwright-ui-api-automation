import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/apiClient';
import { UsersEndpoint } from '../../src/api/data/endpoints';
import { userListSchema } from '../../src/api/schemas/userSchema';

let client: ApiClient;

test.beforeEach(async () => {
  client = new ApiClient();
  await client.init();
});

test.afterEach(async () => {
  await client.dispose();
});

// A1.6
test('Schema validation', async () => {
  const response = await client.get(UsersEndpoint + '?page=1');
  expect(response.status()).toBe(200);

  const body = await response.json();

  // check all fields exist
  expect(typeof body.page).toBe(userListSchema.page);
  expect(typeof body.per_page).toBe(userListSchema.per_page);
  expect(typeof body.total).toBe(userListSchema.total);
  expect(typeof body.total_pages).toBe(userListSchema.total_pages);
  expect(Array.isArray(body.data)).toBe(true);
});