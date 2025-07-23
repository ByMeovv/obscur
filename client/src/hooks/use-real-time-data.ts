import { useState, useEffect } from "react";
import { initialAvitoListings, initialReviews, initialStats } from "@/data/mock-data";
import type { AvitoListing, Review, Stats } from "@/data/mock-data";

export function useRealTimeData() {
  const [avitoListings, setAvitoListings] = useState<AvitoListing[]>(initialAvitoListings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    // Update Telegram subscribers every 5 seconds
    const telegramInterval = setInterval(() => {
      setStats(prev => {
        const randomChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let newSubscribers = prev.telegramSubscribers + randomChange;
        if (newSubscribers < 2800) newSubscribers = 2800;
        if (newSubscribers > 3000) newSubscribers = 3000;
        
        return {
          ...prev,
          telegramSubscribers: newSubscribers
        };
      });
    }, 5000);

    // Update successful deals every 15 seconds
    const dealsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        successfulDeals: prev.successfulDeals + Math.floor(Math.random() * 3)
      }));
    }, 15000);

    // Update average rating every 30 seconds
    const ratingInterval = setInterval(() => {
      setStats(prev => {
        const randomChange = (Math.random() - 0.5) * 0.02;
        let newRating = prev.averageRating + randomChange;
        if (newRating < 4.8) newRating = 4.8;
        if (newRating > 5.0) newRating = 5.0;
        
        return {
          ...prev,
          averageRating: newRating
        };
      });
    }, 30000);

    // Shuffle listings and reviews every 10 seconds to simulate real-time updates
    const shuffleInterval = setInterval(() => {
      setAvitoListings(prev => [...prev].sort(() => 0.5 - Math.random()));
      setReviews(prev => [...prev].sort(() => 0.5 - Math.random()));
    }, 10000);

    return () => {
      clearInterval(telegramInterval);
      clearInterval(dealsInterval);
      clearInterval(ratingInterval);
      clearInterval(shuffleInterval);
    };
  }, []);

  return {
    avitoListings,
    reviews,
    stats
  };
}
