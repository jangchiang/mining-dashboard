// src/components/header/MiningHeader.tsx
import { TimeRange } from '@/types/mining';

interface MiningHeaderProps {
  miningStats: {
    ltcPerHour: number;
    dogePerHour: number;
    hashPower: {
      value: number;
      unit: string;
    };
    shareRate: {
      value: number;
      unit: string;
    };
  };
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function MiningHeader({ miningStats, timeRange, onTimeRangeChange }: MiningHeaderProps) {
  const timeRanges: TimeRange[] = ['1H', '3H', '1D', '1M', '3M', '6M', '1Y'];

  return (
    <header className="bg-slate-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-semibold">Mining Dashboard</h1>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {/* Mining Rate */}
              <div>
                <span className="text-slate-400 text-sm">Mining Rate:</span>
                <span className="ml-2 text-emerald-400 text-sm">
                  {miningStats.ltcPerHour.toFixed(6)} LTC/hr
                </span>
                <span className="ml-2 text-yellow-400 text-sm">
                  {miningStats.dogePerHour.toFixed(2)} DOGE/hr
                </span>
              </div>

              {/* Hash Power */}
              <div>
                <span className="text-slate-400 text-sm">Hash Power:</span>
                <span className="ml-2 text-blue-400 text-sm">
                  {miningStats.hashPower.value.toFixed(1)} {miningStats.hashPower.unit}
                </span>
              </div>

              {/* Share Rate */}
              <div>
                <span className="text-slate-400 text-sm">Share Rate:</span>
                <span className="ml-2 text-blue-400 text-sm">
                  {miningStats.shareRate.value} {miningStats.shareRate.unit}
                </span>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="bg-slate-700 rounded-full px-4 py-1.5 flex space-x-4">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`text-sm px-2 py-1 rounded-full transition-colors ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-300 hover:text-white'
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
  );
}