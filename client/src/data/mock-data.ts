export interface AvitoListing {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
  role: string;
  url: string;
  image: string;
}

export interface Review {
  id: number;
  author: string;
  date: string;
  role: string;
  status: string;
  title: string;
  description: string;
  url: string;
  rating: number;
}

export interface Stats {
  telegramSubscribers: number;
  successfulDeals: number;
  averageRating: number;
}

export const initialAvitoListings: AvitoListing[] = [
  {
    id: 1,
    title: "Rick Owens DRKSHDW Hoodie",
    description: "Оригинальная толстовка Rick Owens в идеальном состоянии. Размер M, цвет черный. Под заказ из Азии.",
    status: "Активно",
    date: "Сегодня",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 2,
    title: "Balenciaga Triple S Sneakers",
    description: "Культовые кроссовки Balenciaga Triple S. Размеры 41-45 в наличии. Качество 1:1, неотличимо от оригинала.",
    status: "Активно",
    date: "Вчера",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 3,
    title: "Amiri Jeans Distressed",
    description: "Джинсы Amiri с фирменными потертостями. Размер 32. Оригинальная фурнитура и качество материала.",
    status: "Активно",
    date: "2 дня назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 4,
    title: "Stone Island Cargo Pants",
    description: "Брюки Stone Island в стиле cargo. Размер L. Знаменитая съемная нашивка в комплекте.",
    status: "Активно",
    date: "3 дня назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 5,
    title: "Chrome Hearts T-Shirt",
    description: "Футболка Chrome Hearts с готическим принтом. Размер XL. Плотный хлопок, оригинальные бирки.",
    status: "Активно",
    date: "Неделю назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 6,
    title: "Off-White Arrows Hoodie",
    description: "Толстовка Off-White с фирменными стрелками. Размер M. Оригинальная молния и принт.",
    status: "Активно",
    date: "2 недели назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 7,
    title: "Fear of God Essentials",
    description: "Комплект Fear of God Essentials: худи + штаны. Размер L. Нейтральные цвета, отличное качество.",
    status: "Активно",
    date: "3 недели назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1603252109303-2751441b83e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    id: 8,
    title: "Yeezy Boost 350 V2",
    description: "Кроссовки Yeezy Boost 350 V2 в расцветке Zebra. Размер 43. Оригинальная подошва Boost.",
    status: "Активно",
    date: "1 месяц назад",
    role: "Продавец",
    url: "https://www.avito.ru/brands/1cac165925fef68f3b0fac4c635f231a",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  }
];

export const initialReviews: Review[] = [
  {
    id: 1,
    author: "Евгеша Золотын",
    date: "2 июля",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Одежда Rick Owens, Balenciaga и тд",
    description: "Заказывайте не пожалеете!!",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/1",
    rating: 5
  },
  {
    id: 2,
    author: "Татьяна",
    date: "3 марта",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Игры на Sony PlayStation PS4",
    description: "Приобрели диск, работает, все хорошо",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/2",
    rating: 5
  },
  {
    id: 3,
    author: "shy yss",
    date: "18 февраля",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Balenciaga Zip Hoodie Polo",
    description: "good<3",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/3",
    rating: 5
  },
  {
    id: 4,
    author: "Никита Крузенштерн",
    date: "26 января",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Balenciaga 10xl 41 размер на руках",
    description: "Очень крутые кроссы, спасибо большое)",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/4",
    rating: 5
  },
  {
    id: 5,
    author: "Покупатель",
    date: "3 декабря 2024",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Под заказ",
    description: "Прекрасный продавец, футболка пришла отличного качества, упакована очень бережно. крайне рекомендую",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/5",
    rating: 5
  },
  {
    id: 6,
    author: "Анонимный покупатель",
    date: "Вчера",
    role: "Покупатель",
    status: "Сделка состоялась",
    title: "Rick Owens",
    description: "Заказал Rick Owens, качество на высоте! Доставка быстрая, рекомендую всем",
    url: "https://www.avito.ru/user/danila_tg_obscur/review/6",
    rating: 5
  }
];

export const initialStats: Stats = {
  telegramSubscribers: 2216,
  successfulDeals: 1847,
  averageRating: 4.9
};
