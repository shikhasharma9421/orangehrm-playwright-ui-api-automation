import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/apiClient';
import { users } from '../../src/api/data/users';
import { UsersEndpoint } from '../../src/api/data/endpoints';

let client: ApiClient;

test.beforeEach(async () => {
  client = new ApiClient();
  await client.init();
});

test.afterEach(async () => {
  await client.dispose();
});

// A1.1
test('GET users list', async () => {
  const response = await client.get(UsersEndpoint + '?page=2');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.page).toBe(2);
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.total).toBeGreaterThan(0);
});

// A1.2
test('GET single user', async () => {
  const response = await client.get(UsersEndpoint + '/2');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.id).toBe(2);
  expect(body.data.email).toContain('@');
  expect(body.data.first_name).toBeTruthy();
  expect(body.data.last_name).toBeTruthy();
});

// A1.3
test('POST create user', async () => {
  const response = await client.post(UsersEndpoint, users.createUser);
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.name).toBe(users.createUser.name);
  expect(body.job).toBe(users.createUser.job);
  expect(body.id).toBeTruthy();
  expect(body.createdAt).toBeTruthy();
});

// A1.4
test('PUT update user', async () => {
  const response = await client.put(UsersEndpoint + '/2', users.updateUser);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe(users.updateUser.name);
  expect(body.job).toBe(users.updateUser.job);
  expect(body.updatedAt).toBeTruthy();
});

// A1.5
test('DELETE user', async () => {
  const response = await client.delete(UsersEndpoint + '/2');
  expect(response.status()).toBe(204);
});