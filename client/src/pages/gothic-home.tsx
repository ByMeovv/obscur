import React, { useState, useEffect } from 'react';
import { Users, Star, ShoppingBag, Flame, MessageSquare, ExternalLink, Menu, X } from 'lucide-react';
import GothicFireBackground from '@/components/ui/gothic-fire-background';
import GothicListingCard from '@/components/ui/gothic-listing-card';
import GothicReviewCard from '@/components/ui/gothic-review-card';
import GothicStatsCard from '@/components/ui/gothic-stats-card';
import HorizontalCarousel from '@/components/ui/horizontal-carousel';
import { useRealTimeUpdates } from '@/hooks/use-real-time-updates';

export default function GothicHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { listings, reviews, stats } = useRealTimeUpdates();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <GothicFireBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center animate-glow">
                <img src="/logo.svg" alt="OBSCUR Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">OBSCUR</h1>
                <p className="text-gray-400 text-xs font-mono">CLOTHES</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('listings')}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Объявления
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection('stats')}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Статистика
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Контакты
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-purple-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800/50">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('listings')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Объявления
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection('stats')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Статистика
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Контакты
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="gentle-float"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center border-2 border-purple-500/20 subtle-glow">
              <img src="/logo.svg" alt="OBSCUR Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 fade-in text-subtle-glow">
            Премиальная<br />
            <span className="gradient-text">уличная одежда</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed text-subtle-glow">
            Rick Owens, Balenciaga, и эксклюзивные бренды.<br />
            Только оригинальные вещи под заказ из Поднебесной.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('listings')}
              className="primary-button text-white px-8 py-4 rounded-xl font-semibold"
            >
              Посмотреть объявления
            </button>
            <a 
              href="https://t.me/obscur_clothes"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button text-white px-8 py-4 rounded-xl font-semibold"
            >
              Telegram канал
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-subtle-glow scroll-reveal">
              Наша <span className="gradient-text">статистика</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Цифры в реальном времени от нашего Telegram канала и Avito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GothicStatsCard
              title="Подписчики Telegram"
              value={stats.telegramSubscribers.toLocaleString()}
              subtitle="Растет каждый день"
              icon={<Users className="text-purple-400" size={24} />}
              trend="+12 сегодня"
              realTime={true}
            />
            <GothicStatsCard
              title="Успешных сделок"
              value={stats.successfulDeals.toLocaleString()}
              subtitle="Довольных клиентов"
              icon={<ShoppingBag className="text-green-400" size={24} />}
              trend="+3 за неделю"
              realTime={true}
            />
            <GothicStatsCard
              title="Средний рейтинг"
              value={stats.averageRating.toFixed(1)}
              subtitle="Из 5 звезд"
              icon={<Star className="text-yellow-400" size={24} />}
              trend="Стабильно высокий"
              realTime={true}
            />
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-subtle-glow scroll-reveal">
              Актуальные <span className="gradient-text">объявления</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Свежие предложения с нашего профиля на Avito
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Обновляется автоматически</span>
            </div>
          </div>
          
          <HorizontalCarousel showControls>
            {listings.map((listing) => (
              <GothicListingCard key={listing.id} listing={listing} />
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Отзывы <span className="gradient-text">клиентов</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Реальные отзывы от довольных покупателей
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Обновляется автоматически</span>
            </div>
          </div>
          
          <HorizontalCarousel showControls>
            {reviews.map((review) => (
              <GothicReviewCard key={review.id} review={review} />
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Связаться с <span className="gradient-text">нами</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Готовы помочь вам найти идеальные вещи. Свяжитесь с нами любым удобным способом.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Telegram</h3>
              <p className="text-gray-300 mb-6">
                Наш основной канал связи для заказов и консультаций
              </p>
              <div className="space-y-2">
                <a 
                  href="https://t.me/obscur_clothes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  @obscur_clothes
                </a>
                <a 
                  href="https://t.me/yywayne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  @yywayne (заказы)
                </a>
                <a 
                  href="https://t.me/allyyxtee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  @allyyxtee (заказы)
                </a>
              </div>
            </div>
            
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Avito</h3>
              <p className="text-gray-300 mb-6">
                Наш профиль на Avito с актуальными объявлениями
              </p>
              <a 
                href="https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Посетить профиль</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">Доставляем заказы по СНГ, Европе и Америке</p>
            <p className="text-purple-400 font-semibold">Одевайтесь красиво 💔</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 bg-black/80 backdrop-blur-sm border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-xl flex items-center justify-center">
                  <Flame className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">OBSCUR</h3>
                  <p className="text-gray-400 text-sm font-mono">CLOTHES</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Премиальная уличная одежда из Поднебесной. Только оригинальные бренды и качественный сервис.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://t.me/obscur_clothes" className="hover:text-purple-400 transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a" className="hover:text-purple-400 transition-colors">
                    Avito
                  </a>
                </li>
                <li>
                  <a href="https://t.me/obscur_otzivi" className="hover:text-purple-400 transition-colors">
                    Отзывы
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Заказы</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://t.me/yywayne" className="hover:text-purple-400 transition-colors">
                    @yywayne
                  </a>
                </li>
                <li>
                  <a href="https://t.me/allyyxtee" className="hover:text-purple-400 transition-colors">
                    @allyyxtee
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OBSCUR CLOTHES. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}