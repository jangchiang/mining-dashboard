// types/mining.ts
export type TimeRange = '1H' | '3H' | '1D' | '1M' | '3M' | '6M' | '1Y';

export interface Worker {
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

export interface PoolData {
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
}