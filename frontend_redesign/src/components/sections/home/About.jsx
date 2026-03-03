// src/components/layout/AboutSummary.jsx

import React from 'react';

import carImage from '~/assets/images/about/car.png';

export const AboutSummary = () => {

    const titleParts = ["SGV AUTO —", "профессиональная", "команда"];

    return (

        <section id='about' className="w-full bg-[#11131B] py-24 overflow-hidden">


            <div className="relative container mx-auto max-w-[1240px] px-4">

                <div className="flex justify-between items-center gap-10 flex-wrap lg:flex-nowrap">


                    <div className="flex-shrink-0 w-full max-w-[680px] select-none z-10">
                        <img
                            src={carImage}
                            alt="Автомобиль Audi"
                            draggable="false"
                            className="rounded-2xl"
                        />
                    </div>


                    <div className="max-w-xl select-none z-20">

                        <h2 className="text-4xl font-bold text-white mb-6 leading-none">
                            {titleParts.map((part, index) => (
                                <span
                                    key={index}
                                    className={`block ${index === 0 ? 'mb-2' : 'mb-0'}`}
                                >
                                    {part}
                                </span>
                            ))}
                        </h2>
                        <p className="text-[15px] text-white">
                            которая вот уже 5 лет помогает клиентам находить и доставлять автомобили из Китая, Кореи и Японии. Наш принцип —{' '}
                            <strong className="font-bold text-white">
                                максимальная прозрачность, ответственность и индивидуальный
                            </strong >
                            <br />
                            <strong className="font-bold text-white">
                                подход
                            </strong >
                            {' '}к каждому заказу.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};