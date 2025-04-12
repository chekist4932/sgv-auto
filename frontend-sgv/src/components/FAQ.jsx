import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const faqData = [
    {
        id: 1,
        question: 'Как быстро я получу свой автомобиль?',
        answer: 'В среднем процесс занимает от 4 до 8 недель — многое зависит от конкретной страны (Китай, Япония или Корея) и текущих логистических условий. Мы стараемся максимально ускорить доставку, но при этом соблюдаем все формальности и проверяем каждый этап.',
    },
    {
        id: 2,
        question: 'Как узнать, что машина действительно в хорошем состоянии?',
        answer: 'Мы работаем только с проверенными дилерами и частными продавцами. Для каждого авто собираем максимум данных: историю эксплуатации, пробег, результаты диагностики. По возможности делаем дополнительную проверку на месте (фото/видео осмотр), чтобы исключить сюрпризы вроде скрытых аварий или скрученного пробега.',
    },
    {
        id: 3,
        question: 'Есть ли риск «вылезания» скрытых платежей?',
        answer: 'Мы ценим прозрачность и репутацию, поэтому заранее прописываем все расходы: стоимость машины, доставку, таможенные пошлины и сопутствующие издержки. Если в процессе обнаружится необходимость в дополнительных тратах (например, редкие запчасти или специфическая сертификация), мы сразу же согласовываем это с клиентом.',
    },
    {
        id: 4,
        question: 'Что делать, если с машиной возникнут проблемы после покупки?',
        answer: 'До передачи авто мы проводим тщательную проверку. Но если всё же возникнут вопросы по техническому состоянию или документам, мы поможем с консультацией и при необходимости найдём решение: от сервисного осмотра до поиска нужных деталей.',
    },
    {
        id: 5,
        question: 'Вы занимаетесь растаможкой и документами самостоятельно?',
        answer: 'Да, мы полностью берём на себя взаимодействие с таможенными органами и оформление всех требуемых документов. Вам не нужно тратить время на бюрократию — мы предоставим готовый пакет и проконсультируем, какие шаги остались для регистрации в ГИБДД (или аналогичном органе).',
    },
    {
        id: 6,
        question: 'Какие машины вы рекомендуете к покупке: новые или с пробегом?',
        answer: 'Всё зависит от ваших целей и бюджета. Мы можем помочь подобрать как практически новые авто (с минимальным пробегом), так и надёжные модели с пробегом. Главное — учитывать ваши потребности и финансовые возможности.',
    },
    {
        id: 7,
        question: 'Как с вами связаться и начать процесс выбора машины?',
        answer: 'Свяжитесь с нами любым удобным способом (через сайт, мессенджер, телефон), расскажите о своих пожеланиях по авто, бюджете и сроках. Мы подготовим варианты и расчёт, чтобы вы сразу понимали, на что можете рассчитывать.',
    }
];

export default function FAQ() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [openFaqId, setOpenFaqId] = useState(null);

    const displayFaqs = isMobile ? faqData.slice(0, 6) : faqData;

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <section id="faq" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                    Часто задаваемые вопросы
                </h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {displayFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                        >
                            <div
                                className="flex items-center justify-between p-4 md:p-6 cursor-pointer"
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>
                            {openFaqId === faq.id && (
                                <div className="px-4 md:px-6 pb-4 md:pb-6">
                                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
