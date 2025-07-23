import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  showRealTimeIndicator?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  className,
  valueClassName,
  showRealTimeIndicator = false
}: StatsCardProps) {
  return (
    <div className={cn("bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20", className)}>
      <div className="flex items-center justify-center mb-4">
        {showRealTimeIndicator && <div className="real-time-indicator mr-3" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-center">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <p className={cn("text-3xl font-bold", valueClassName)}>{value}</p>
        <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
      </div>
    </div>
  );
}
