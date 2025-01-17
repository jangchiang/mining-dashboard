// src/components/stats/Last30DaysTable.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Last30DaysTableProps {
  data: {
    user: {
      historical: Array<{
        date: string;
        hash_rate: number;
        valid_shares: number;
        stale_shares: number;
        invalid_shares: number;
        ltc_rewards: number;
        doge_rewards: number;
      }>;
    };
  };
}

export function Last30DaysTable({ data }: Last30DaysTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayCount = isExpanded ? 30 : 3; // Show 7 days when minimized, 30 when expanded

  // Ensure data exists and is an array
  const historicalData = Array.isArray(data.user.historical) ? data.user.historical : [];

  // Filter valid rows (ensure no missing or invalid data)
  const validData = historicalData.filter(
    (day) =>
      day.date &&
      typeof day.hash_rate === 'number' &&
      typeof day.valid_shares === 'number' &&
      typeof day.stale_shares === 'number' &&
      typeof day.invalid_shares === 'number' &&
      typeof day.ltc_rewards === 'number' &&
      typeof day.doge_rewards === 'number'
  );

  // Slice data based on the display count
  const displayData = validData.slice(0, displayCount);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Last 30 Days Summary</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <span className="mr-2 text-sm">Show Less</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="mr-2 text-sm">Show More</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Average Speed
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
            {displayData.map((day) => (
              <tr key={day.date} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {day.hash_rate.toFixed(2)} MH/s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                  {day.valid_shares.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400">
                  {day.stale_shares.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400">
                  {day.invalid_shares.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400">
                  {day.ltc_rewards.toFixed(8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400">
                  {day.doge_rewards.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Summary Row */}
          <tfoot className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400 font-medium">
                {(displayData.reduce((acc, day) => acc + day.hash_rate, 0) / displayData.length).toFixed(2)} MH/s
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">
                {displayData.reduce((acc, day) => acc + day.valid_shares, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400 font-medium">
                {displayData.reduce((acc, day) => acc + day.stale_shares, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400 font-medium">
                {displayData.reduce((acc, day) => acc + day.invalid_shares, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600 dark:text-blue-400 font-medium">
                {displayData.reduce((acc, day) => acc + day.ltc_rewards, 0).toFixed(8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-yellow-600 dark:text-yellow-400 font-medium">
                {displayData.reduce((acc, day) => acc + day.doge_rewards, 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
