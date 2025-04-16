import React from 'react';
import { Shield, Truck, FileCheck } from 'lucide-react';
import CurrencyRates from './CurrencyRates';

const features = [
  {
    icon: Shield,
    title: 'Опыт и доверие',
    description: 'Более 5 лет успешной работы и сотни довольных клиентов',
  },
  {
    icon: Truck,
    title: 'Полный цикл услуг',
    description: 'От выбора до доставки и оформления документов',
  },
  {
    icon: FileCheck,
    title: 'Надежность',
    description: 'Строгая проверка состояния и истории каждого автомобиля',
  },
];

export default function Hero() {
  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact');
    contactForm?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-20">
      <section id="hero">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <img
            src="/background_car.avif"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/80" />
        </div>

        {/* Контент */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Импорт автомобилей из Азии
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Профессиональный подбор и доставка автомобилей из Китая, Японии и Южной Кореи
            </p>
            <button
              onClick={scrollToContactForm}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Подобрать автомобиль
            </button>
          </div>

          {/* Курсы валют */}
          <div className="mt-12 max-w-5xl mx-auto">
            <CurrencyRates />
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-gray-700"
              >
                <Icon className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
