'use client';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient?: 'purple' | 'blue' | 'green';
}

export default function StatCard({ title, value, icon, trend, gradient = 'purple' }: StatCardProps) {
  const gradients = {
    purple: 'from-purple-600/20 to-purple-900/20 border-purple-500/30',
    blue: 'from-blue-600/20 to-blue-900/20 border-blue-500/30',
    green: 'from-green-600/20 to-green-900/20 border-green-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[gradient]} border border-gray-800 rounded-xl p-5 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-gray-400">{title}</div>
      </div>
    </div>
  );
}

