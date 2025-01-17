// src/hooks/useMiningData.ts
import { useState, useEffect } from 'react';
import { TimeRange } from '@/types/mining';

const API_KEY = 'fb0475ac189acd566760ca9c50c890e0';
const API_URL = 'https://www.litecoinpool.org/api';

interface DailyStats {
  date: string;
  hash_rate: number;
  valid_shares: number;
  stale_shares: number;
  invalid_shares: number;
  ltc_rewards: number;
  doge_rewards: number;
}

interface Worker {
  connected: boolean;
  hash_rate: number;
  hash_rate_24h: number;
  valid_shares: number;
  stale_shares: number;
  invalid_shares: number;
  rewards: number;
  rewards_24h: number;
  rewards_doge: number;
  rewards_24h_doge: number;
  last_share_time: number;
  reset_time: number;
}

interface Payout {
  time: number;
  amount: number;
}

interface MiningData {
  user: {
    hash_rate: number;
    expected_24h_rewards: number;
    total_rewards: number;
    paid_rewards: number;
    unpaid_rewards: number;
    past_24h_rewards: number;
    expected_24h_rewards_doge: number;
    total_rewards_doge: number;
    paid_rewards_doge: number;
    unpaid_rewards_doge: number;
    past_24h_rewards_doge: number;
    total_work: number;
    blocks_found: number;
    workers: Record<string, Worker>;
    historical: DailyStats[];
  };
  pool: {
    hash_rate: number;
    active_users: number;
    active_workers: number;
    total_work: number;
    pps_ratio: number;
    pps_rate: number;
    pps_rate_avg_doge: number;
  };
  network: {
    hash_rate: number;
    block_number: number;
    time_per_block: number;
    difficulty: number;
    next_difficulty: number;
    retarget_time: number;
    difficulty_avg_doge: number;
  };
  recent_payouts: Payout[];
  recent_payouts_doge: Payout[];
  market: {
    ltc_btc: number;
    ltc_usd: number;
    ltc_cad: number;
    ltc_eur: number;
    ltc_gbp: number;
    ltc_rub: number;
    ltc_cny: number;
    ltc_aud: number;
    ltc_zar: number;
    doge_btc: number;
    doge_usd: number;
    doge_cad: number;
    doge_eur: number;
    doge_gbp: number;
    doge_rub: number;
    doge_cny: number;
    doge_aud: number;
    doge_zar: number;
    btc_usd: number;
  };
}

export function useMiningData(timeRange: TimeRange) {
  const [data, setData] = useState<MiningData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 5000; // 5 seconds

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Validate the response structure
        if (!result.user || !result.pool || !result.network) {
          throw new Error('Invalid API response structure');
        }

        // Use the historical data directly from the API
        const historical = Array.isArray(result.user.historical) ? result.user.historical : [];

        if (mounted) {
          setData({
            ...result,
            user: {
              ...result.user,
              historical,
            },
          });
          setError(null);
          retryCount = 0;
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (mounted) {
          setError(err as Error);
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(fetchData, RETRY_DELAY);
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    // Update frequency: every minute as per API docs
    const interval = setInterval(fetchData, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [timeRange]);

  return { data, error, isLoading };
}
