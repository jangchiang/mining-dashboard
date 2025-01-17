// lib/api.ts
const API_KEY = 'fb0475ac189acd566760ca9c50c890e0';
const API_URL = 'https://www.litecoinpool.org/api';

export async function fetchMiningData() {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch mining data');
    }
    const data = await response.json();
    return data as PoolData;
  } catch (error) {
    console.error('Error fetching mining data:', error);
    throw error;
  }
}