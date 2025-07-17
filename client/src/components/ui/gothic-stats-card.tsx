import { TrendingUp, Users, Star, ShoppingBag } from 'lucide-react';
import { ReactNode } from 'react';
import GothicCard from './gothic-card';

interface GothicStatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  trend?: string;
  realTime?: boolean;
}

export default function GothicStatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  realTime = false
}: GothicStatsCardProps) {
  return (
    <GothicCard className="text-center" animated>
      <div className="space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-gray-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
            {icon}
          </div>
        </div>

        {/* Value */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white font-mono">
            {value}
            {realTime && (
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />
            )}
          </div>
          <h3 className="text-gray-300 font-medium">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Trend */}
        {trend && (
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
            <TrendingUp size={16} />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </GothicCard>
  );
}