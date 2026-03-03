import React, { useState, useEffect } from 'react';
import { Hero } from '~/components/sections/home/Hero';
import { CarPriceCalculator } from '~/components/sections/home/CarPriceCalculator/CarPriceCalculator';
import { Benefit } from '~/components/sections/home/Benefit/Benefit';
import { AboutSummary } from '~/components/sections/home/About';
import { ProcessSection } from '~/components/sections/home/ProcessSection';
import { ConsultationSection } from '~/components/sections/home/Consultation';
import { FaqSection } from '~/components/sections/home/Faq';
import { Car } from '~/components/sections/home/Car/Car';
import { ReviewsSection } from '~/components/sections/home/Reviews/Reviews';
import { News } from '~/components/sections/home/News';
import { RequestModal } from '~/components/ui/modal/RequestModal';

import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { scrollConfig } from '~/config/scroll';

export const HomePage = ({ onOpenModalCallBack }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const scrollToElement = (target) => {
        setTimeout(() => {
            scroller.scrollTo(target, {
                ...scrollConfig,
                smooth: true,
                duration: 500
            });
        }, 250); // Увеличил задержку для гарантии загрузки DOM
    };

    // Обработка hash из URL
    useEffect(() => {
        if (location.hash) {
            const target = location.hash.substring(1);
            scrollToElement(target);
        }
    }, [location.hash]);

    // Обработка state из навигации
    useEffect(() => {
        if (location.state?.scrollTo) {
            const target = location.state.scrollTo;
            scrollToElement(target);

            // Очищаем state, чтобы при обновлении страницы не скроллило снова
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <div>
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <CarPriceCalculator />
            <Benefit />
            <ReviewsSection />
            <AboutSummary />
            <Car section_id='cars_in_stock' onOpenModalCallBack={onOpenModalCallBack} />
            <ProcessSection />
            <FaqSection />
            <News />
            <ConsultationSection onOpenModal={() => setIsModalOpen(true)} />

            <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};