

import React from 'react';

import { FeatureCard } from '~/components/ui/FeatureCard';
import { BulletPointList } from '~/components/ui/BulletPointList';
import { SectionTitle } from '~/components/ui/SectionTitle'


const processSteps = [
    {
        title: ["/ 01"],
        description: ["Подбор автомобиля", "под ваши потребности"],
        bulletPoints: [
            "— Учитываем бюджет, технические требования и стиль вождения",
            "— Работаем только с проверенными поставщиками и аукционами",
        ],
    },
    {
        title: ["/ 02"],
        description: ["Полное сопровождение", "от заказа до ПТС"],
        bulletPoints: [
            "— Личный менеджер на всех этапах",
            "— Фото- и видеоотчеты, открытые документы",
            "— Собственная логистика — доставка в срок",
        ],
    },
    {
        title: ["/ 03"],
        description: ["Помощь на каждом этапе,", "гарантии и сервис"],
        bulletPoints: [
            "— Помощь с растаможкой и оформлением",
            "— Техническая поддержка после покупки",
        ],
    },
];




export const ProcessSection = () => {
    return (
        <section id='process' className="w-full bg-[#0C0E15] py-24 select-none">
            <div className="container mx-auto max-w-[1240px] px-4">

                <SectionTitle title='Почему нам доверяют?' />

                <div className="flex justify-center items-start gap-8 flex-wrap">
                    {processSteps.map((step) => (

                        <div key={step.title} className="w-full max-w-[278px] flex flex-col items-center gap-10">
                            <FeatureCard
                                title={step.title}
                                description={step.description}
                            />

                            <BulletPointList points={step.bulletPoints} />
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};