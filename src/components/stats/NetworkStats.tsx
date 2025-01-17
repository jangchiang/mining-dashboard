// src/components/stats/NetworkStats.tsx
interface NetworkStatsProps {
    difficulty: {
      current: number;
      next?: number;
      changePercent?: number;
    };
    networkStats: {
      hashRate: {
        value: number;
        unit: string;
      };
      blockTime: number;
    };
  }
  
  export function NetworkStats({ difficulty, networkStats }: NetworkStatsProps) {
    return (
      <div className="grid grid-cols-2 gap-5">
        {/* Difficulty Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-slate-500 text-sm font-medium">Network Difficulty</h3>
          <div className="mt-2">
            <div className="text-2xl font-semibold text-slate-900">
              {formatHashRate(difficulty.current)}
            </div>
            {difficulty.next && (
              <div className="text-sm text-slate-600 mt-1 flex items-center">
                Next: {formatHashRate(difficulty.next)}
                <span className={`ml-2 ${
                  difficulty.changePercent >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  ({difficulty.changePercent >= 0 ? '↑' : '↓'}
                  {Math.abs(difficulty.changePercent).toFixed(1)}%)
                </span>
              </div>
            )}
          </div>
        </div>
  
        {/* Network Stats Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-slate-500 text-sm font-medium">Network Stats</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Hash Rate:</span>
              <span className="text-slate-900 font-medium">
                {networkStats.hashRate.value.toFixed(1)} {networkStats.hashRate.unit}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Block Time:</span>
              <span className="text-slate-900 font-medium">
                {networkStats.blockTime.toFixed(1)} min
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function formatHashRate(value: number): string {
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
  }