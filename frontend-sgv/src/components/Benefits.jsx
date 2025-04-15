import React from 'react';
import { ParkingMeter as Parking, Award, Shield, Search, Calendar } from 'lucide-react';

const items = [
    {
        icon: Parking,
        title: 'Сервис',
        text: 'Наш менеджер с вами на связи без выходных',
    },
    {
        icon: Award,
        title: 'Прозрачность',
        text: 'Вы получаете полный расчет стоимости авто со всеми статьями и ссылками',
    },
    {
        icon: Shield,
        title: 'Надежность',
        text: 'Мы работаем официально',
    },
    {
        icon: Search,
        title: 'Опыт',
        text: 'Мы работаем уже более 5 лет\nнаши клиенты возвращаются и приводят друзей',
    },
    {
        icon: Calendar,
        title: 'Удобство',
        text: 'Мы берем на себя все работы, вам остается только наслаждаться процессом',
    },
];

export default function Benefits() {
    return (
        <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900 dark:text-white">
                    Наши преимущества
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 items-stretch">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-900 rounded-md h-full"
                        >
                            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                            </div>
                            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
