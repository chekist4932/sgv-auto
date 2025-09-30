// src/components/layout/Reviews.jsx
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ReviewCard } from './ReviewCard'
import { ReviewsModal } from '~/components/ui/modal/ReviewsModal';
import { Button } from '~/components/ui/Button'
import { Spinner } from "~/components/ui/Spinner";
import { SectionTitle } from '~/components/ui/SectionTitle'


import { useCarousel } from '~/hooks/useCarousel'
import { useCarouselPositions } from '~/hooks/useCarouselPositions'
import { useFetch } from '~/hooks/useFetch'


import { API_URL, requestOptions } from '~/config/index';

const reviewSource = [
    { text: "Все отзывы на VL.RU", href: "https://www.vl.ru/sgv-auto-import" },
    { text: "Все отзывы на 2ГИС.RU", href: "https://2gis.ru/vladivostok/geo/70000001098567282" },
    { text: "Все отзывы на Яндекс", href: "https://yandex.ru/maps/org/sgv_auto_import/47277379460/?ll=131.885494%2C43.115542&utm_campaign=1179144&utm_content=feedback_owner&utm_medium=email&utm_source=sender&utm_term=org&z=18" },
];


export const ReviewsSection = () => {
    const { data: reviews, loading } = useFetch(
        `${API_URL}/review/`,
        requestOptions,
        (items) => items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );

    const [selectedReview, setSelectedReview] = useState(null);

    const {
        width,
        currentIndex,
        prevSlide,
        nextSlide,
        activeCount,
        cardWidth,
        gap,
        getStep,
    } = useCarousel({ breakpoints: { desktop: 3, tablet: 2, mobile: 1 }, cardWidth: 300, gap: 24 });

    const total = reviews.length;
    const step = getStep(activeCount, total);
    const { activeWindowWidth, leftIndex, rightIndex, transformOffset, showSideCardsAndArrows } =
        useCarouselPositions(total, currentIndex, activeCount, cardWidth, gap, width);

    const isMobile = width < 1024;
    const scrollContainerRef = useRef(null);

    return (
        <section id='review' className="w-full bg-[#0C0E15] py-24 overflow-hidden">
            <div className="container mx-auto md:max-w-fit md:px-24">
                <SectionTitle title='Отзывы клиентов' />

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <Spinner />
                    </div>
                ) : reviews.length > 0 ? (

                    isMobile ? (
                        // Для мобилки
                        <div className="overflow-x-auto scrollbar-hide scroll-smooth"
                            ref={scrollContainerRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex justify-start gap-4 px-4">
                                {/* <div className="flex justify-center gap-4 transition-transform duration-500 ease-in-out"> */}
                                {reviews.map((review, index) => (
                                    <div key={review.id || index}>
                                        <ReviewCard
                                            review={review}
                                            isActive={true}
                                            onClick={() => setSelectedReview(review)} 
                                            />
                                    </div>
                                ))}
                                {/* </div> */}
                            </div>
                        </div>


                    ) : (

                        <div className="relative flex items-center justify-center">
                            {showSideCardsAndArrows && (
                                <div
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-500 
                                    ${activeCount === 2 ? "-translate-x-[120%]" : "-translate-x-[110%]"}`}
                                >
                                    <ReviewCard
                                        review={reviews[leftIndex]}
                                        isActive={false}
                                        onClick={() => setSelectedReview(reviews[leftIndex])}
                                    />
                                </div>
                            )}

                            {showSideCardsAndArrows && (
                                <Button onClick={() => prevSlide(step)} variant="ghost" size="icon"
                                    className="z-10 bg-black/40 rounded-full shrink-0 absolute -left-12 top-1/2 -translate-y-1/2">
                                    <ChevronLeft className="w-8 h-8 text-white" />
                                </Button>
                            )}

                            {/* Центральные активные */}
                            <div className="overflow-hidden" style={{ width: `${activeWindowWidth}px` }}>
                                <div
                                    className="flex justify-items-center gap-6 transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${transformOffset}px)` }}
                                >
                                    {reviews.map((review, index) => (
                                        <ReviewCard
                                            key={review.id || index}
                                            review={review}
                                            isActive={true}
                                            onClick={() => setSelectedReview(review)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {showSideCardsAndArrows && (
                                <Button onClick={() => nextSlide(step)} variant="ghost" size="icon"
                                    className="z-10 bg-black/40 rounded-full shrink-0 absolute -right-12 top-1/2 -translate-y-1/2">
                                    <ChevronRight className="w-8 h-8 text-white" />
                                </Button>
                            )}

                            {showSideCardsAndArrows && (
                                <div
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-500 
                                    ${activeCount === 2 ? "translate-x-[120%]" : "translate-x-[110%]"}`}
                                >
                                    <ReviewCard
                                        review={reviews[rightIndex]}
                                        isActive={false}
                                        onClick={() => setSelectedReview(reviews[rightIndex])}
                                    />
                                </div>
                            )}
                        </div>)
                ) : (
                    <div className="text-center text-white/60 py-16">
                        <p>Отзывы пока не добавлены</p>
                    </div>
                )}

                <div className="grid grid-flow-row sm:grid-flow-col auto-cols-fr gap-4 mb-8 mt-8 w-[246] mx-auto">
                    {reviewSource.map((source, index) => (
                        <Button
                            key={index}
                            variant="primary-red"
                            className="justify-center"
                            asChild={!!source.href}
                        >
                            <a href={source.href} className="text-xs" target="_blank" rel="noopener noreferrer">
                                {source.text}
                            </a>
                        </Button>
                    ))}
                </div>
            </div>

            {selectedReview && (
                <body className="overflow-hidden">
                    <ReviewsModal
                        review={selectedReview}
                        onClose={() => setSelectedReview(null)}
                    />
                </body>

            )}
        </section>
    );
};
