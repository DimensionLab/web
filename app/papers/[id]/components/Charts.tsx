'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Define types for our data
interface ViewData {
  date: string;
  views: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-sm">
        <p className="text-gray-200">{`${label}: ${payload[0].value} views`}</p>
      </div>
    );
  }
  return null;
};

export function WeeklyChart({ data }: { data: ViewData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="views"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorViews)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MonthlyChart({ data }: { data: ViewData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          tickFormatter={(day) => {
            const date = new Date();
            date.setDate(day);
            return date.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short'
            });
          }}
        />
        <YAxis 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="views" 
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 