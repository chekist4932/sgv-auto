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
        variant: "title",
    },
    {
        title: ["Полный цикл услуг:"],
        subtitle: "от выбора до доставки и оформления документов",
        col: 2,
        row: 1,
        variant: "title",
    },
    {
        title: ["Строгая проверка состояния"],
        subtitle: "и истории каждого автомобиля",
        col: 3,
        row: 1,
        variant: "title",
    },
    {
        title: ["Возможность покупки", "автомобиля"],
        subtitle: "через аккредитив",
        col: 1,
        row: 2,
        variant: "subtitle",
    },
    {
        title: ["Работа"],
        subtitle: "с индивидуальной потребностью",
        col: 3,
        row: 2,
        variant: "subtitle",
    },
];

export const Benefit = () => {
    return (
        <section id='benefit' className="w-full py-10 bg-[#0C0E15] overflow-hidden min-h-[627px] select-none">
            <div className="container mx-auto max-w-[1240px] px-4 relative">
                <SectionTitle title='Преимущества работы с нами' />

                <div className="relative grid grid-cols-3 grid-rows-2 mx-28 gap-y-4 justify-items-center z-20">
                    {benefits.map((item, i) => (
                        <BenefitCard key={i} {...item} />
                    ))}
                </div>


                <img
                    src={carImage}
                    alt="Showcase Car"
                    aria-hidden="true"
                    draggable="false"
                    className={`absolute bottom left-1/2 -translate-x-1/2 -translate-y-[35%] w-[800px] h-auto z-10 "`}
                />


                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 
                    bg-blue-900/25 rounded-full blur-3xl z-0 select-none pointer-events-none`} />
            </div>
        </section>
    );
};
