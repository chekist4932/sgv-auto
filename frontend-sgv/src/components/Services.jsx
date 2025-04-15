import React from 'react';
import { Car, Truck, Tractor, Settings } from 'lucide-react';

const services = [
    {
        icon: Car,
        title: 'Автомобили из Китая',
        description: 'Подбор и доставка автомобилей из Китая',
    },
    {
        icon: Car,
        title: 'Автомобили из Кореи',
        description: 'Импорт автомобилей из Южной Кореи',
    },
    {
        icon: Car,
        title: 'Автомобили из Японии',
        description: 'Доставка санкционных и несанкционных авто',
    },
    {
        icon: Truck,
        title: 'Грузовые автомобили',
        description: 'Импорт грузовиков из Азии',
    },
    {
        icon: Tractor,
        title: 'Спецтехника',
        description: 'Поставка строительной техники',
    },
    {
        icon: Settings,
        title: 'Запчасти из Азии',
        description: 'Подбор и доставка запчастей',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-6 md:py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-900 dark:text-white">
                    Наши услуги
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 md:p-4 hover:shadow-lg transition h-full"
                        >
                            <service.icon className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-2 md:mb-3" />
                            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 dark:text-white">
                                {service.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <a
                        href="https://wa.me/79140744300"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-6 py-2 rounded-lg hover:bg-[#128C7E] transition-colors text-center text-sm"
                    >
                        WhatsApp
                    </a>
                    <a
                        href="https://t.me/SGVAutoImport"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0088cc] text-white px-6 py-2 rounded-lg hover:bg-[#0077b5] transition-colors text-center text-sm"
                    >
                        Telegram
                    </a>
                </div>
            </div>
        </section>
    );
}
