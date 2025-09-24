// src/components/layout/Hero.jsx

import React from 'react';
import { Button } from '~/components/ui/Button';
import { FeatureCard } from '~/components/ui/FeatureCard';

// Локальные ассеты
import heroBg from '~/assets/images/hero/background.png';
import carImg from '~/assets/images/hero/car.png';
import plusIcon from '~/assets/images/hero/icon-plus.svg';
import tgIcon from '~/assets/icons/tg.svg';

const features = [
    {
        title: ['Качественный', 'подбор'],
        description: [
            'строго по вашим',
            'критериям и параметрам'
        ],
    },
    {
        title: ['Прозрачная', 'работа'],
        description: [
            'все условия и этапы',
            'зафиксированы в договоре'
        ],
    },
    {
        title: ['Выгодная', 'стоимость'],
        description: [
            'экономия до -44%',
            'от цены автомобиля в РФ'
        ],
    },
];
export const Hero = ({ onOpenModal }) => {
    return (
        <section id='hero'
            className="relative w-full -mt-24 bg-center bg-cover " // h-20 = 5rem = 80px
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div className="container mx-auto max-w-[1240px]  px-4 pt-40 pb-12">

                <div className="lg:flex lg:justify-between  items-start mb-4">
                    <h1 className="text-3xl font-bold text-white max-w-xl select-none">
                        Автомобили, спецтехника и запчасти из Японии, Кореи и Китая с доставкой по РФ
                    </h1>

                    <div className="flex flex-col items-end gap-2 lg:text-right text-left w-[246px]">
                        <p className="text-sm text-white w-full pr-2 select-none mt-2">
                            <span className="block">Профессиональный подбор</span>
                            <span className="block">и доставка в любой город России</span>
                        </p>
                        <Button variant="primary-red" className="gap-4 w-full pl-2" onClick={onOpenModal}>
                            <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                <img src={plusIcon} alt="plusIcon" className="w-5 h-5 scale-150" />
                            </span>
                            <span>Подобрать автомобиль</span>
                        </Button>


                        <Button asChild className="w-full">
                            <a href="https://t.me/SGVauto_tg" target="_blank" rel="noopener noreferrer" className="gap-2">
                                <img src={tgIcon} alt="Telegram" className="w-5 h-5" />
                                <span>Telegram-канал</span>
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="relative min-h-[360px] lg:min-h-[460px]">

                    <img
                        src={carImg}
                        alt="BMW 4 Series"
                        aria-hidden="true"
                        draggable="false"
                        className={`max-w-none h-auto absolute bottom-0 lg:left-1/4 left-1/2 -translate-x-1/4 lg:-translate-y-1/6 z-20`}
                        // className={`absolute bottom-0 left-1/2 -translate-x-[57%] w-[990px] h-auto z-20`}
                    // transition-transform duration-300 ease-in-out hover:scale-105
                    />
                    <div className="hidden lg:flex justify-between items-start h-full z-10 ">
                        <div className="w-[278px]">
                            <FeatureCard
                                title={features[0].title}
                                description={features[0].description}
                            />
                        </div>
                        <div className="flex flex-col gap-6 w-[278px]">
                            <FeatureCard
                                title={features[1].title}
                                description={features[1].description}
                            />
                            <FeatureCard
                                title={features[2].title}
                                description={features[2].description}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};