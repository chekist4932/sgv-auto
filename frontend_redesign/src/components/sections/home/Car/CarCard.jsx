// src/components/ui/CarCard.jsx

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";


import { Button } from '~/components/ui/Button';
import { Badge } from '~/components/ui/Badge';



const CarSpecs = ({ specs }) => {
    const format_specs = {
        "Двигатель": specs.engine,
        "Пробег": specs.mileage,
        "Коробка передач": specs.transmission,
        "Мощность": specs.power,
        "Руль": specs.drivetrain,
    };

    return (
        <div className="grid grid-cols-2 text-xs text-white gap-x-2">
            {Object.entries(format_specs).map(([key, value]) => (
                <React.Fragment key={key}>
                    <span >{key}:</span>
                    <span className="text-right">{value}</span>
                </React.Fragment>
            ))}
        </div>
    );
}

export const CarCard = ({ car, isActive, onClick }) => {


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = car.images || []; 

    const nextImage = (e) => {
        e.stopPropagation(); 
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'in_stock':
                return 'В наличии';
            case 'on_order':
                return 'Под заказ';
            case 'sold':
                return 'Продано';
            case 'in_transit':
                return 'В пути';
            default:
                return 'В наличии';
        }
    };


    return (
        <div
            className={`
        relative shrink-0 p-5 rounded-2xl bg-[#11131B] border border-white/10
        flex flex-col
        transition-all duration-500 ease-in-out
        w-[260px]
        ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.85]'}
      `} onClick={onClick}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-base text-white h-14 flex items-center">
                    {car.brand} {car.model}
                </h3>
                <Badge>{car.year}</Badge>
            </div>

            <div className="relative my-4 -mx-5 group  aspect-[4/3] overflow-hidden">
                <img
                    src={images[currentImageIndex].url}
                    alt={car.model}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            variant="ghost" size="icon"
                            className="absolute bottom-0 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-0"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={nextImage}
                            variant="ghost" size="icon"
                            className="absolute bottom-0 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-0"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </>
                )}
            </div>

            <div className="flex justify-between items-center mb-4">
                <p className="text-base text-primary-red">{car.price}</p>
                <Badge >{getStatusText(car.status)}</Badge>
            </div>

            <div className="mb-4"> {/* Убрал space-y, так как gap в CarSpecs уже есть */}
                <CarSpecs specs={car.specs} />
            </div>

            <Button variant="primary-red" className="mt-auto w-full">
                Подробнее
            </Button>
        </div>
    );
};