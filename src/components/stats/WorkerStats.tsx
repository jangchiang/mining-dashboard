// src/components/stats/WorkerStats.tsx
import React from 'react';

interface Worker {
  connected: boolean;
  hash_rate: number | string;
  hash_rate_24h: number | string;
  valid_shares: string | number;
  stale_shares: string | number;
  invalid_shares: string | number;
  rewards: number;
  rewards_doge: number;
  rewards_24h: number;
  rewards_24h_doge: number;
  last_share_time: number;
  reset_time: number;
}

interface WorkerStatsProps {
  workers: Record<string, Worker>;
}

export const WorkerStats: React.FC<WorkerStatsProps> = ({ workers }) => {
  const workerEntries = Object.entries(workers);

  const formatHashRate = (hashRate: number | string): string => {
    const rate = typeof hashRate === 'string' ? parseFloat(hashRate) : hashRate;
    if (rate >= 1_000_000) {
      return `${(rate / 1_000_000).toFixed(2)} GH/s`;
    } else if (rate >= 1_000) {
      return `${(rate / 1_000).toFixed(2)} MH/s`;
    }
    return `${rate.toFixed(2)} kH/s`;
  };

  const formatTime = (timestamp: number): string => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatRewards = (rewards: number): string => {
    if (!rewards) return '0.00000000';
    return rewards.toFixed(8);
  };

  const formatShares = (shares: string | number): string => {
    const shareNum = typeof shares === 'string' ? parseInt(shares) : shares;
    if (!shareNum) return '0';
    return shareNum.toLocaleString();
  };

  if (workerEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No worker data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-black dark:text-white text-xl font-medium">Worker Statistics</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Worker Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hash Rate
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                24h Hash Rate
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                LTC Rewards
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                DOGE Rewards
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {workerEntries.map(([workerName, worker]) => (
              <tr 
                key={workerName} 
                className="transition-colors duration-150 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {workerName}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                  worker.connected 
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {worker.connected ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {formatHashRate(worker.hash_rate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {formatHashRate(worker.hash_rate_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="text-green-600 dark:text-green-400">
                    {formatShares(worker.valid_shares)}
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">
                    Stale: {formatShares(worker.stale_shares)}
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400">
                    Invalid: {formatShares(worker.invalid_shares)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="text-blue-600 dark:text-blue-400">
                    {formatRewards(worker.rewards)} LTC
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    24h: {formatRewards(worker.rewards_24h)} LTC
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="text-yellow-600 dark:text-yellow-400">
                    {formatRewards(worker.rewards_doge)} DOGE
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    24h: {formatRewards(worker.rewards_24h_doge)} DOGE
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600 dark:text-gray-400">
                  {formatTime(worker.last_share_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerStats;