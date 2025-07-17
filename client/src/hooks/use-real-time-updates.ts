import { useState, useEffect } from 'react';
import { AvitoListing, Review, Stats, initialAvitoListings, initialReviews, initialStats } from '@/data/mock-data';

export function useRealTimeUpdates() {
  const [listings, setListings] = useState<AvitoListing[]>(initialAvitoListings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    // Simulate real-time updates for stats
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        telegramSubscribers: prev.telegramSubscribers + Math.floor(Math.random() * 3),
        successfulDeals: prev.successfulDeals + (Math.random() < 0.3 ? 1 : 0),
        averageRating: Math.min(5, prev.averageRating + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);

    // Simulate new listings
    const listingsInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        const newListing: AvitoListing = {
          id: Date.now(),
          title: `Новое объявление ${Date.now()}`,
          description: "Качественная одежда премиум-брендов под заказ",
          status: "Активно",
          date: "Только что",
          role: "Продавец",
          url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
          image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
        };
        setListings(prev => [newListing, ...prev.slice(0, 9)]);
      }
    }, 15000);

    // Simulate new reviews
    const reviewsInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const authors = ["Анон", "Покупатель", "Клиент", "Заказчик"];
        const newReview: Review = {
          id: Date.now(),
          author: authors[Math.floor(Math.random() * authors.length)],
          date: "Только что",
          role: "Покупатель",
          status: "Сделка состоялась",
          title: "Отличное качество",
          description: "Заказывал одежду, качество превосходное! Рекомендую всем",
          url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
          rating: 5
        };
        setReviews(prev => [newReview, ...prev.slice(0, 9)]);
      }
    }, 20000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(listingsInterval);
      clearInterval(reviewsInterval);
    };
  }, []);

  return {
    listings,
    reviews,
    stats
  };
}