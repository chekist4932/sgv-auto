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
    useEffect(() => {
        if (location.hash) {
            const target = location.hash.substring(1);

            const timer = setTimeout(() => {
                scroller.scrollTo(target, { ...scrollConfig });
            }, 250);


            return () => clearTimeout(timer);
        }
    }, [location]);

    return (
        <div>
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <CarPriceCalculator />
            <Benefit />
            <ReviewsSection />
            <AboutSummary />
            <Car onOpenModalCallBack={onOpenModalCallBack} />
            <ProcessSection />
            <FaqSection />
            <News />
            <ConsultationSection onOpenModal={() => setIsModalOpen(true)} />

            <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};