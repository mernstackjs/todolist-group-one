import { expect, test, describe } from 'vitest';
import HttpClient from '../helper/httpClient';

const httpClient = new HttpClient();

describe('HttpClient Profile', () => {
  test('should have a defined supabase client instance', () => {
    expect(httpClient.client).toBeDefined();
  });

  test('should return null if no user is logged in', async () => {
    const user = await httpClient.getCurrentUser();
    expect(user).toBe(null);
  });
});
