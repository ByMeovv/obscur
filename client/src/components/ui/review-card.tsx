import { ExternalLink, Star, User } from "lucide-react";
import type { Review } from "@/data/mock-data";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={16} />
          </div>
          <div>
            <h4 className="font-semibold">{review.author}</h4>
            <p className="text-sm text-gray-400">{review.date}</p>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 mb-4">{review.description}</p>
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-mono">
          {review.status}
        </span>
        <a 
          href={review.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
        >
          <ExternalLink size={14} />
          Источник
        </a>
      </div>
    </div>
  );
}
