import { ExternalLink, Calendar, User, CheckCircle } from 'lucide-react';
import { AvitoListing } from '@/data/mock-data';
import GothicCard from './gothic-card';

interface GothicListingCardProps {
  listing: AvitoListing;
}

export default function GothicListingCard({ listing }: GothicListingCardProps) {
  return (
    <GothicCard className="min-w-80 max-w-80 h-full">
      <div className="space-y-4">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 right-2">
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
              <CheckCircle size={12} className="inline mr-1" />
              {listing.status}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg line-clamp-2 hover:text-purple-400 transition-colors">
            {listing.title}
          </h3>
          
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {listing.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{listing.role}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{listing.date}</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2">
            <a
              href={listing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span className="text-sm">Посмотреть на Avito</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </GothicCard>
  );
}