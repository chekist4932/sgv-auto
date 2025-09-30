// src/components/layout/FaqSection.jsx

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/Accordion";
import { SectionTitle } from '~/components/ui/SectionTitle'

const faqs = [
    {
        id: "item-1",
        question: ["Как быстро я получу свой", "автомобиль?"],
        answer: "В среднем процесс занимает от 4 до 8 недель — многое зависит от конкретной страны (Китай, Япония или Корея) и текущих логистических условий. Мы стараемся максимально ускорить доставку.",
    },
    {
        id: "item-2",
        question: ["Как узнать, что машина действительно", "в хорошем состоянии?"],
        answer: "Мы предоставляем полный фото- и видеоотчет, а также официальные документы, такие как аукционный лист, где указаны все детали и оценки.",
    },
    {
        id: "item-3",
        question: ["Есть ли риск «вылезания»", "скрытых платежей?"],
        answer: "Нет. Все платежи, включая стоимость автомобиля, доставку, пошлины и наши услуги, прописываются в договоре. Цена является финальной.",
    },
    {
        id: "item-4",
        question: ["Что делать, если возникнут", "проблемы после покупки?"],
        answer: "Мы предоставляем техническую поддержку и консультации после получения автомобиля, помогая решить любые возникающие вопросы.",
    },
    {
        id: "item-5",
        question: ["Вы занимаетесь растаможкой", "и документами самостоятельно?"],
        answer: "Да, мы берем на себя весь процесс таможенного оформления и подготовки документов, включая получение ПТС.",
    },
    {
        id: "item-6",
        question: ["Какие машины вы рекомендуете", "к покупке: новые или с пробегом?"],
        answer: "Это зависит от вашего бюджета и целей. Автомобили с пробегом из Японии и Кореи часто предлагают лучшее соотношение цены и качества, в то время как из Китая выгодно привозить новые электромобили.",
    },
    {
        id: "item-7",
        question: ["Как с вами связаться и начать", "процесс выбора машины?"],
        answer: "Просто свяжитесь с нами через любую из кнопок на сайте. Мы проведем бесплатную консультацию и начнем подбор вариантов под ваши требования.",
    },
];

export const FaqSection = () => {
    const midPoint = Math.ceil(faqs.length / 2);
    const leftColumnFaqs = faqs.slice(0, midPoint);
    const rightColumnFaqs = faqs.slice(midPoint);

    const renderQuestion = (question) => {
        return (
            <div>
                {question.map((line, index) => (
                    <span key={index} className="block">{line}</span>
                ))}
            </div>
        );
    };

    return (
        <section id='faq' className="w-full bg-[#0C0E15] py-10">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="bg-[#11131B] p-12 lg:p-16 rounded-[30px]">
                    <SectionTitle title='Часто задаваемые вопросы' />

                    <div className="flex flex-col lg:flex-row justify-center lg:gap-16">

                        {/* Левая колонка */}
                        <div className="w-full lg:w-1/2">
                            <Accordion type="single" collapsible defaultValue="item-1">
                                {leftColumnFaqs.map((faq) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger className="text-left text-base font-medium">
                                            {renderQuestion(faq.question)}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-white">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Правая колонка */}
                        <div className="w-full lg:w-1/2">
                            <Accordion type="single" collapsible>
                                {rightColumnFaqs.map((faq) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger className="text-left text-base font-medium">
                                            {renderQuestion(faq.question)}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-white">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};