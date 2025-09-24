import React from 'react';

import { BenefitCard } from './BenefitCard';
import { SectionTitle } from '~/components/ui/SectionTitle'

import carImage from '~/assets/images/benefit/car.png';

const benefits = [
    {
        title: ["Реферальная", "программа"],
        subtitle: "для клиентов",
        col: 1,
        row: 1,
        gridClass: "lg:col-start-1 lg:row-start-1",
        variant: "title",
    },
    {
        title: ["Полный цикл услуг:"],
        subtitle: "от выбора до доставки и оформления документов",
        col: 2,
        row: 1,
        gridClass: "lg:col-start-2 lg:row-start-1",
        variant: "title",
    },
    {
        title: ["Строгая проверка состояния"],
        subtitle: "и истории каждого автомобиля",
        col: 3,
        row: 1,
        gridClass: "lg:col-start-3 lg:row-start-1",
        variant: "title",
    },
    {
        title: ["Возможность покупки", "автомобиля"],
        subtitle: "через аккредитив",
        col: 1,
        row: 2,
        gridClass: "lg:col-start-1 lg:row-start-2",
        variant: "subtitle",
    },
    {
        title: ["Работа"],
        subtitle: "с индивидуальной потребностью",
        col: 3,
        row: 2,
        gridClass: "lg:col-start-3 lg:row-start-2",
        variant: "subtitle",
    },
];

export const Benefit = () => {
    return (
        <section id='benefit' className="relative  w-full py-8 bg-[#0C0E15] select-none  overflow-hidden pb-20">
            <div className="container mx-auto max-w-[1240px] px-4">
                <SectionTitle title='Преимущества работы с нами' />

                <div className="relative mx-36 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center z-20 mb-14">
                    {benefits.map((item, i) => (
                        <BenefitCard
                            key={i}
                            title={item.title}
                            subtitle={item.subtitle}
                            variant={item.variant}
                            // Передаем адаптивные классы
                            className={`${item.gridClass}`}
                        />
                    ))}
                    <div className='col-span-1 row-start-6 lg:col-start-2 lg:row-start-2' ></div>
                </div>


                <img
                    src={carImage}
                    alt="Showcase Car"
                    aria-hidden="true"
                    draggable="false"
                    className={`
                    absolute bottom-0 left-1/2 lg:-translate-x-1/2 -translate-x-1/4 translate-y-[20%] z-10 
                    max-w-none h-auto
                    lg:w-full lg:max-w-3xl
                `}
                />


                <div className=" lg:block absolute bottom-0 left-1/2 lg:-translate-x-1/2 -translate-x-1/4 translate-y-1/4 w-3/4 h-48 
                    bg-blue-900/25 rounded-full blur-3xl z-0" />
            </div>
        </section>
    );
};
