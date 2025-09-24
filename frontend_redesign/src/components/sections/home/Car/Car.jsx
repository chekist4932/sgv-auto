// src/components/layout/Cars.jsx

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, InfoIcon } from "lucide-react";

import { CarCard } from "./CarCard";
import { Button } from "~/components/ui/Button";
import { SectionTitle } from '~/components/ui/SectionTitle'
import { CarModal } from "~/components/ui/modal/CarModal";


import { useCarousel } from '~/hooks/useCarousel'
import { useCarouselPositions } from '~/hooks/useCarouselPositions'
import { useFetch } from '~/hooks/useFetch'

import { API_URL, requestOptions } from '~/config/index';

import { formatCarForDisplay, formatCarForModal } from '~/lib/car/utils'


async function fetchCarImages(cars) {
    const updatedCars = await Promise.all(
        cars.map(async (car) => {
            try {
                const response = await fetch(`${API_URL}/car/${car.id}/image/`, requestOptions);

                if (response.status === 404) {
                    return { ...car, images: [] };
                }

                if (!response.ok) throw new Error(`Ошибка загрузки изображений для ${car.id}: ${response.statusText}`);

                const data = await response.json();
                const images = data.items;
                return { ...car, images };
            } catch {
                return { ...car, images: [] };
            }
        })
    );
    return updatedCars;
}




export const Car = ({ onOpenModalCallBack }) => {
    const [selectedCar, setSelectedCar] = useState(null);

    const { data: cars = [], loading, error } = useFetch(
        `${API_URL}/car/`,
        requestOptions,
        async (items) => {
            const carsWithImages = await fetchCarImages(items || []);
            // console.log(carsWithImages);
            return carsWithImages.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }
    );

    const {
        width,
        currentIndex,
        prevSlide,
        nextSlide,
        activeCount,
        cardWidth,
        gap,
        getStep,
    } = useCarousel({ breakpoints: { desktop: 4, tablet: 2, mobile: 1 }, cardWidth: 260, gap: 24 });

    const total = cars.length;
    const step = getStep(activeCount, total);
    const { activeWindowWidth, leftIndex, rightIndex, transformOffset, showSideCardsAndArrows } =
        useCarouselPositions(total, currentIndex, activeCount, cardWidth, gap, width);


    const isMobile = width < 1024;
    const scrollContainerRef = useRef(null);


    return (
        <section id='cars' className="w-full bg-[#11131B] py-24 overflow-hidden">
            <div className="container mx-auto md:max-w-fit md:px-24">
                <SectionTitle title='Автомобили в наличии – ваше быстрое решение' />
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white
                    md:text-base text-xs">
                        <InfoIcon className="w-5 h-5" color='rgba(52, 139, 220, 1)' />
                        <span>Доставка осуществляется автовозом по всей России</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">Ошибка загрузки автомобилей</p>
                ) : cars.length > 0 ? (
                    isMobile ? (
                        // Для мобилки
                        <div className="overflow-x-auto scrollbar-hide scroll-smooth"
                            ref={scrollContainerRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex justify-start gap-4 px-4">
                                {/* <div className="flex justify-center gap-4 transition-transform duration-500 ease-in-out"> */}
                                    {cars.map((car, index) => (
                                        <CarCard
                                            key={car.id || index}
                                            car={formatCarForDisplay(car)}
                                            isActive={true}
                                            onClick={() => setSelectedCar(car)}
                                        />
                                    ))}
                                {/* </div> */}
                            </div>
                        </div>


                    ) : (
                        <div className="relative flex items-center justify-center">
                            {/* Левая карточка */}
                            {showSideCardsAndArrows && (
                                <div
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-500 
                                    ${activeCount === 2 ? "-translate-x-[120%]" : "-translate-x-[110%]"}`}
                                >
                                    <CarCard
                                        car={formatCarForDisplay(cars[leftIndex])}
                                        isActive={false}
                                        onClick={() => setSelectedCar(cars[leftIndex])}
                                    />
                                </div>
                            )}

                            {showSideCardsAndArrows && (
                                <Button onClick={() => prevSlide(step)} variant="ghost" size="icon"
                                    className="z-10 bg-black/40 rounded-full shrink-0 absolute -left-11 top-1/2 -translate-y-1/2">
                                    <ChevronLeft className="w-8 h-8 text-white" />
                                </Button>
                            )}

                            {/* Центральные карточки */}
                            <div className="overflow-hidden" style={{ width: `${activeWindowWidth}px` }}>
                                <div
                                    className="flex items-center gap-6 transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${transformOffset}px)` }}
                                >
                                    {cars.map((car, index) => (
                                        <CarCard
                                            key={car.id || index}
                                            car={formatCarForDisplay(car)}
                                            isActive={true}
                                            onClick={() => setSelectedCar(car)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {showSideCardsAndArrows && (
                                <Button onClick={() => nextSlide(step)} variant="ghost" size="icon"
                                    className="z-10 bg-black/40 rounded-full shrink-0 absolute -right-11 top-1/2 -translate-y-1/2">
                                    <ChevronRight className="w-8 h-8 text-white" />
                                </Button>
                            )}

                            {/* Правая карточка */}
                            {showSideCardsAndArrows && (
                                <div
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-500 
                                    ${activeCount === 2 ? "translate-x-[120%]" : "translate-x-[110%]"}`}
                                >
                                    <CarCard
                                        car={formatCarForDisplay(cars[rightIndex])}
                                        isActive={false}
                                        onClick={() => setSelectedCar(cars[rightIndex])}
                                    />
                                </div>
                            )}
                        </div>)
                ) : (
                    <div className="text-center text-white/60 py-16">
                        <p>Автомобили в наличии пока не добавлены</p>
                    </div>
                )}
            </div>

            {selectedCar && (
                <CarModal
                    car={formatCarForModal(selectedCar)}
                    onClose={() => setSelectedCar(null)}
                    onOpenModal={onOpenModalCallBack}
                />
            )}
        </section>
    );
};
