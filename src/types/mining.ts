// types/mining.ts
export enum TimeRange {
  OneHour = '1H',
  ThreeHours = '3H',
  OneDay = '1D',
  OneMonth = '1M',
  ThreeMonths = '3M',
  SixMonths = '6M',
  OneYear = '1Y'
}

export interface Worker {
  connected: boolean;
  hash_rate: number | string; // Handle both number and string
  hash_rate_24h: number | string;
  valid_shares: number;
  stale_shares: number;
  invalid_shares: number;
  rewards: number;
  rewards_24h: number;
  rewards_doge: number;
  rewards_24h_doge: number;
  last_share_time: number; // Unix timestamp
  reset_time: number;      // Unix timestamp
}

export interface User {
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
}

export interface Pool {
  hash_rate: number;
  active_users: number;
  active_workers: number;
  total_work: number;
  pps_ratio: number;
  pps_rate: number;
  pps_rate_avg_doge?: number; // Optional in case it's missing
}

export interface Network {
  hash_rate: number;
  block_number: number;
  time_per_block: number;
  difficulty: number;
  next_difficulty: number;
  retarget_time: number;
  difficulty_avg_doge?: number; // Optional
}

export interface PoolData {
  user: User;
  pool: Pool;
  network: Network;
}
