import React from 'react';
import { Phone, FileText, DollarSign, Ship, Car } from 'lucide-react';

const steps = [
    {
        icon: Phone,
        title: 'Оставить заявку',
        text: 'Мы рассчитаем вам автомобиль "под ключ"',
    },
    {
        icon: FileText,
        title: 'Заключить договор',
        text: 'В офисе или онлайн',
    },
    {
        icon: DollarSign,
        title: 'Подбор и покупка',
        text: 'Проверим и согласуем все с вами',
    },
    {
        icon: Ship,
        title: 'Доставка и таможня',
        text: 'Срок от 2-х недель',
    },
    {
        icon: Car,
        title: 'Выдача авто',
        text: 'Отдадим лично или доставим до ТК',
    },
];

export default function HowToBuy() {
    return (
        <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900 dark:text-white">
                    Как купить автомобиль
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 items-stretch">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md h-full"
                        >
                            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                                <step.icon className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                            </div>
                            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 dark:text-white">
                                {step.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
