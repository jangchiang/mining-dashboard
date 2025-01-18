// src/app/page.tsx
'use client';

import { useState } from 'react';
import { TimeRange } from '@/types/mining';
import { useMiningData } from '@/hooks/useMiningData';
import { Last30DaysTable } from '@/components/stats/Last30DaysTable';
import { WorkerStats } from '@/components/stats/WorkerStats';
import { MiningChart } from '@/components/charts/MiningChart';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const { data, error, isLoading } = useMiningData(timeRange);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-red-500 dark:text-red-400 font-medium mb-2">Error Loading Data</h3>
          <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Get workers data directly from the root level of the API response
  const workers = data.workers || {};

  const formatNumberWithColor = (value: number, isPositive: boolean) => {
    const colorClass = isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
    return <span className={colorClass}>{isPositive ? '+' : ''}{value.toFixed(2)}%</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">Mining Dashboard</h1>
              {/* Network Difficulty */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Network Difficulty:
                <span className="ml-2 text-gray-900 dark:text-white font-medium">
                  {(data.network.difficulty / 1e6).toFixed(2)}M
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm">
              <div className="space-y-2 sm:space-y-0 sm:space-x-8 mb-4 sm:mb-0">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Mining Rate:</span>
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    {(data.user.expected_24h_rewards / 24).toFixed(6)} LTC/hr
                  </span>
                  <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                    {(data.user.expected_24h_rewards_doge / 24).toFixed(2)} DOGE/hr
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Hash Power:</span>
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    {(data.user.hash_rate / 1e3).toFixed(2)} MH/s
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Share Rate:</span>
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    {Math.round(parseInt(data.user.total_work) / (60 * 24))} shares/min
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {(['1H', '3H', '1D', '1M', '3M', '6M', '1Y'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Network Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
              Network Difficulty
            </h2>
            <div className="text-3xl text-gray-900 dark:text-white mb-2">
              {(data.network.difficulty / 1e6).toFixed(2)}M
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Next: </span>
              <span className="text-gray-900 dark:text-white">
                {(data.network.next_difficulty / 1e6).toFixed(2)}M
              </span>
              {formatNumberWithColor(
                ((data.network.next_difficulty - data.network.difficulty) / data.network.difficulty * 100),
                data.network.next_difficulty > data.network.difficulty
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Reset block time: </span>
              <span className="text-gray-900 dark:text-white">
                {(data.network.retarget_time / 60).toFixed(1)} min
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
              Network Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Hash Rate:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {(data.network.hash_rate / 1e12).toFixed(1)} TH/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Block Time:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {(data.network.time_per_block / 60).toFixed(1)} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mining Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
              LTC Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">24h Expected:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {data.user.expected_24h_rewards.toFixed(8)} LTC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Unpaid Rewards:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {data.user.unpaid_rewards.toFixed(8)} LTC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Paid Rewards:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {data.user.paid_rewards.toFixed(8)} LTC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Rewards:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {(data.user.unpaid_rewards + data.user.paid_rewards).toFixed(8)} LTC
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
              DOGE Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">24h Expected:</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  {data.user.expected_24h_rewards_doge.toFixed(2)} DOGE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Unpaid Rewards:</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  {data.user.unpaid_rewards_doge.toFixed(2)} DOGE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Paid Rewards:</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  {data.user.paid_rewards_doge.toFixed(2)} DOGE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Rewards:</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  {(data.user.unpaid_rewards_doge + data.user.paid_rewards_doge).toFixed(2)} DOGE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Worker Stats */}
        <div className="mb-6">
          <WorkerStats workers={workers} />
        </div>

        {/* Mining Chart */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <MiningChart timeRange={timeRange} data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}