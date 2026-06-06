import { request, APIRequestContext } from '@playwright/test';
import { config } from '../../utils/config';

export class ApiClient {
  private context!: APIRequestContext;

  async init() {
    this.context = await request.newContext({
      baseURL: config.apiUrl,
      extraHTTPHeaders: {
        'x-api-key': config.apiKey,
      },
    });
  }

  async get(endpoint: string) {
    return await this.context.get(endpoint);
  }

  async post(endpoint: string, data: object) {
    return await this.context.post(endpoint, { data });
  }

  async put(endpoint: string, data: object) {
    return await this.context.put(endpoint, { data });
  }

  async delete(endpoint: string) {
    return await this.context.delete(endpoint);
  }

  async dispose() {
    await this.context.dispose();
  }
}