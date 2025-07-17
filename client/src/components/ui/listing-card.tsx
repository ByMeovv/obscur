import { ExternalLink } from "lucide-react";
import type { AvitoListing } from "@/data/mock-data";

interface ListingCardProps {
  listing: AvitoListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{listing.title}</h3>
          <p className="text-gray-300 mb-4">{listing.description}</p>
        </div>
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-16 h-16 rounded-lg object-cover ml-4" 
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">{listing.date}</span>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full font-mono">
            {listing.status}
          </span>
        </div>
        <a 
          href={listing.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <ExternalLink size={16} />
          Перейти
        </a>
      </div>
    </div>
  );
}
