import { Star, ExternalLink, Calendar, User } from 'lucide-react';
import { Review } from '@/data/mock-data';
import GothicCard from './gothic-card';

interface GothicReviewCardProps {
  review: Review;
}

export default function GothicReviewCard({ review }: GothicReviewCardProps) {
  return (
    <GothicCard className="min-w-80 max-w-80 h-full" glowColor="gray">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg line-clamp-1">
              {review.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-300 text-sm">{review.author}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-4 leading-relaxed">
          {review.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{review.role}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{review.date}</span>
          </div>
        </div>

        {/* Status */}
        <div className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full w-fit border border-green-500/20">
          {review.status}
        </div>

        {/* Action */}
        <div className="pt-2">
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors group"
          >
            <span className="text-sm">Посмотреть отзыв</span>
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </GothicCard>
  );
}