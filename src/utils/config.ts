import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  apiUrl: process.env.API_BASE_URL || '',
  uiUrl: process.env.UI_BASE_URL || '',
  username: process.env.USERNAME_DEMO || '',
  password: process.env.PASSWORD || '',
  apiKey: process.env.REQRES_API_KEY || '',
};