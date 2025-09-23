// src/components/layout/ConsultationSection.jsx

import React from 'react';
import { Button } from '~/components/ui/Button';
import { SectionTitle } from '~/components/ui/SectionTitle'


import bgImage from '~/assets/images/consultation/consultation-bg.png';
import carImage from '~/assets/images/consultation/consultation-car.png';
import lightningIcon from '~/assets/images/consultation/consultation-icon.svg';
import whatsappIcon from '~/assets/icons/whatsapp.svg';
import telegramIcon from '~/assets/icons/tg.svg';

export const ConsultationSection = ({ onOpenModal }) => {


    const consultationButtons = [
        {
            icon: lightningIcon,
            text: "Записаться на консультацию",
            action: () => onOpenModal(),
        },
        {
            icon: whatsappIcon,
            text: "Написать в WhatsApp",
            href: "https://wa.me/79140744300",
        },
        {
            icon: telegramIcon,
            text: "Написать в Telegram",
            href: "https://t.me/SGVAutoImport",
        },
    ];

    return (
        <section id='consultation'
            className="relative w-full bg-cover bg-center select-none"
            style={{ backgroundImage: `url(${bgImage})` }}
        >

            <div className="absolute inset-0 bg-black/10" />


            <div className="relative z-10 container mx-auto max-w-[1240px] px-4 py-12">


                <div className="flex flex-col items-center text-center">


                    <div className="max-w-[800px] mb-10">
                        <SectionTitle title='Бесплатная консультация по подбору' />
                        <p className="text-[15px] text-white leading-normal">
                            Наши специалисты помогут выбрать идеальный автомобиль, учитывая ваши предпочтения и бюджет. Расскажем о текущих трендах рынка, особенностях различных моделей и поможем с оформлением документов.
                        </p>
                    </div>

                    <div className="grid grid-flow-row sm:grid-flow-col auto-cols-fr gap-4 mb-8 ">
                        {consultationButtons.map((button, index) => (
                            <Button
                                key={index}
                                variant="primary-red"
                                className="gap-2 h-12 justify-center"
                                onClick={button.action || undefined}
                                asChild={!!button.href} // если есть href → рендерим <a>
                            >
                                {button.href ? (
                                    <a href={button.href} target="_blank" rel="noopener noreferrer">
                                        <img src={button.icon} alt="" className="w-5 h-5" />
                                        <span>{button.text}</span>
                                    </a>
                                ) : (
                                    <>
                                        <img src={button.icon} alt="" className="w-5 h-5" />
                                        <span>{button.text}</span>
                                    </>
                                )}
                            </Button>
                        ))}
                    </div>


                    <div className="w-full max-w-4xl">
                        <img
                            src={carImage}
                            alt="Ford F-150 Raptor"
                            className="w-[841] h-[473]"
                        />
                    </div>

                </div>
            </div>

        </section>
    );
};