// src/components/stats/WorkerStats.tsx
import React from 'react';

interface Worker {
  connected: boolean;
  hash_rate: number | string; // Updated to handle number or string
  hash_rate_24h: number | string;
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

interface WorkerStatsProps {
  workers: Record<string, Worker>;
}

export const WorkerStats: React.FC<WorkerStatsProps> = ({ workers }) => {
  const workerEntries = Object.entries(workers);

  const formatHashRate = (hashRate: number | string): string =>
    `${parseFloat(hashRate as string).toFixed(2)} MH/s`;

  const formatRewards = (rewards: number): string =>
    rewards.toFixed(8);

  const formatShares = (shares: number): string =>
    shares.toLocaleString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Worker Statistics</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Worker Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Connected
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hash Rate
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                24h Hash Rate
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Valid Shares
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stale Shares
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Invalid Shares
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                LTC Rewards
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                DOGE Rewards
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {workerEntries.map(([workerName, worker]) => (
              <tr key={workerName} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {workerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                  {worker.connected ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {formatHashRate(worker.hash_rate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {formatHashRate(worker.hash_rate_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                  {formatShares(worker.valid_shares)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400">
                  {formatShares(worker.stale_shares)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400">
                  {formatShares(worker.invalid_shares)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {formatRewards(worker.rewards)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400">
                  {formatRewards(worker.rewards_doge)}
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
