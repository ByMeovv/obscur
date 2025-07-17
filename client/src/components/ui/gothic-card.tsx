import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GothicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
}

export default function GothicCard({ 
  children, 
  className, 
  glowColor = "purple", 
  animated = true 
}: GothicCardProps) {
  return (
    <div 
      className={cn(
        "relative group",
        "bg-black/70 backdrop-blur-sm",
        "border border-gray-600/30",
        "rounded-lg overflow-hidden",
        "transition-all duration-500",
        animated && "hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      style={{
        boxShadow: `0 0 20px rgba(${glowColor === 'purple' ? '147, 51, 234' : '120, 120, 120'}, 0.3)`,
      }}
    >
      {/* Gothic glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, rgba(${glowColor === 'purple' ? '147, 51, 234' : '120, 120, 120'}, 0.1) 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Animated border */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(${glowColor === 'purple' ? '147, 51, 234' : '120, 120, 120'}, 0.2) 50%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animation: animated ? 'gothicGlow 3s ease-in-out infinite' : 'none',
        }}
      />
    </div>
  );
}