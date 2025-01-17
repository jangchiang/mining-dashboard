// src/components/charts/MiningChart.tsx
import { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TimeRange, PoolData } from '@/types/mining';

interface MiningChartProps {
  timeRange: TimeRange;
  data: PoolData;
}

export function MiningChart({ timeRange, data }: MiningChartProps) {
  // Generate mock historical data based on current values
  const chartData = useMemo(() => {
    const hours = timeRange === '1H' ? 1 : 
                 timeRange === '3H' ? 3 : 
                 timeRange === '1D' ? 24 : 24;
    
    const baseHashRate = data.user.hash_rate;
    const baseShares = data.user.total_work / 24;

    return Array.from({ length: hours }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() - (hours - i - 1));
      
      // Add some random variation to make the chart more realistic
      const variation = 0.9 + Math.random() * 0.2;
      
      return {
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        hashRate: baseHashRate * variation,
        shares: Math.floor(baseShares * variation),
        rewards: (data.user.expected_24h_rewards / 24) * variation
      };
    });
  }, [timeRange, data]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-slate-500 text-sm font-medium mb-4">Mining Performance</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="hashRate"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              name="Hash Rate"
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
            />
            <YAxis 
              yAxisId="shares"
              orientation="right"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              name="Shares"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem'
              }}
              labelStyle={{ color: '#64748b' }}
            />
            <Legend />
            <Line
              yAxisId="hashRate"
              type="monotone"
              dataKey="hashRate"
              name="Hash Rate"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="shares"
              type="monotone"
              dataKey="shares"
              name="Shares"
              stroke="#eab308"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="hashRate"
              type="monotone"
              dataKey="rewards"
              name="Rewards"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}