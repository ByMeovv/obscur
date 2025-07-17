import { useState, useEffect } from "react";
import { Flame, Menu, Star } from "lucide-react";
import FireBackground from "@/components/ui/fire-background";
import StatsCard from "@/components/ui/stats-card";
import ListingCard from "@/components/ui/listing-card";
import ReviewCard from "@/components/ui/review-card";
import { useRealTimeData } from "@/hooks/use-real-time-data";

export default function Home() {
  const { avitoListings, reviews, stats } = useRealTimeData();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FireBackground />
      
      {/* Header */}
      <header className="relative z-20 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center animate-glow">
              <Flame className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Obscur</h1>
              <p className="text-gray-400 text-sm font-mono">CLOTHES</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#listings" 
              onClick={(e) => handleSmoothScroll(e, "listings")}
              className="hover:text-purple-400 transition-colors"
            >
              Каталог
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => handleSmoothScroll(e, "reviews")}
              className="hover:text-purple-400 transition-colors"
            >
              Отзывы
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="hover:text-purple-400 transition-colors"
            >
              Контакты
            </a>
          </nav>
          <div className="md:hidden">
            <button className="text-white hover:text-purple-400 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-float">
            <img 
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128" 
              alt="Dark streetwear fashion model" 
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-purple-500 shadow-2xl object-cover" 
            />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Премиальная<br />
            <span className="gradient-text">уличная одежда</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Rick Owens, Balenciaga, и эксклюзивные бренды.<br />
            Только оригинальные вещи под заказ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#listings" 
              onClick={(e) => handleSmoothScroll(e, "listings")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Посмотреть каталог
            </a>
            <a 
              href="https://t.me/obscur_clothes" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fab fa-telegram"></i>
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Telegram Stats Section */}
      <section className="relative z-10 py-12 px-4 md:px-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              title="Подписчики Telegram"
              value={stats.telegramSubscribers.toLocaleString()}
              subtitle="Растет в реальном времени"
              valueClassName="telegram-counter"
              showRealTimeIndicator={true}
            />
            <StatsCard
              title="Успешных сделок"
              value={stats.successfulDeals.toLocaleString()}
              subtitle="За последний месяц"
              valueClassName="text-green-400"
            />
            <StatsCard
              title="Средняя оценка"
              value={stats.averageRating.toFixed(1)}
              subtitle="Из 5.0"
              valueClassName="text-yellow-400"
              icon={
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Avito Listings Section */}
      <section id="listings" className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Актуальные <span className="gradient-text">предложения</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Первые 5 объявлений с нашего Avito профиля
            </p>
            <div className="flex items-center justify-center mt-4">
              <div className="real-time-indicator mr-3"></div>
              <span className="text-sm text-green-400 font-mono">Обновляется в реальном времени</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {avitoListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative z-10 py-16 px-4 md:px-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Отзывы <span className="gradient-text">клиентов</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Реальные отзывы покупателей в режиме реального времени
            </p>
            <div className="flex items-center justify-center mt-4">
              <div className="real-time-indicator mr-3"></div>
              <span className="text-sm text-green-400 font-mono">Обновляется автоматически</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Связаться с <span className="gradient-text">нами</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Готовы помочь вам найти идеальные вещи. Свяжитесь с нами любым удобным способом.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-telegram text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Telegram</h3>
              <p className="text-gray-300 mb-4">Основной канал связи для заказов и вопросов</p>
              <a 
                href="https://t.me/obscur_clothes" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Написать в Telegram
              </a>
            </div>
            
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-bag text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Avito</h3>
              <p className="text-gray-300 mb-4">Проверенный профиль с множеством отзывов</p>
              <a 
                href="https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Посетить Avito
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h3>
            <div className="space-y-4 text-left">
              <div className="border-b border-gray-700 pb-4">
                <h4 className="font-semibold text-lg mb-2">Как сделать заказ?</h4>
                <p className="text-gray-300">Свяжитесь с нами в Telegram, опишите желаемую вещь, и мы поможем с заказом под ваши требования.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h4 className="font-semibold text-lg mb-2">Гарантия качества?</h4>
                <p className="text-gray-300">Мы работаем только с оригинальными брендами и проверенными поставщиками. Все отзывы реальные.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h4 className="font-semibold text-lg mb-2">Сроки доставки?</h4>
                <p className="text-gray-300">Обычно заказы приходят в течение 1-2 недель, в зависимости от сложности и наличия товара.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 md:px-8 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
                  <Flame className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">Obscur</h3>
                  <p className="text-gray-400 text-sm font-mono">CLOTHES</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Эксклюзивная уличная одежда премиум-брендов. Rick Owens, Balenciaga и другие топовые бренды под заказ.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://t.me/obscur_clothes" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <i className="fab fa-telegram text-xl"></i>
                </a>
                <a 
                  href="https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <i className="fas fa-shopping-bag text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a 
                    href="#listings" 
                    onClick={(e) => handleSmoothScroll(e, "listings")}
                    className="hover:text-purple-400 transition-colors"
                  >
                    Каталог
                  </a>
                </li>
                <li>
                  <a 
                    href="#reviews" 
                    onClick={(e) => handleSmoothScroll(e, "reviews")}
                    className="hover:text-purple-400 transition-colors"
                  >
                    Отзывы
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => handleSmoothScroll(e, "contact")}
                    className="hover:text-purple-400 transition-colors"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Гарантии</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Obscur Clothes. Все права защищены.</p>
            <p className="mt-2 text-sm">Работаем только с оригинальными брендами</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
