// src/components/sections/catalog/CarGrid.jsx

import React from 'react';
import { CarCard } from '~/components/sections/home/Car/CarCard';
import { Spinner } from '~/components/ui/Spinner';
import { formatCarForDisplay } from '~/lib/car/utils'

export const CarGrid = ({ cars, loading, onCardClick }) => {
    if (loading) {
        return <div className="flex justify-center h-96"><Spinner /></div>;
    }

    if (cars.length === 0) {
        return <div className="text-center text-white/60 py-16">Автомобили в наличии пока не добавлены</div>;
    }

    return (
        <div className='flex justify-center'>
            <div className="grid items-stretch gap-6 md:grid-cols-3 lg:grid-cols-4">
                {cars.map((car) => (
                    <CarCard key={car.id} car={formatCarForDisplay(car)} isActive={true} onClick={() => onCardClick(car)} />
                ))}
            </div>
        </div>
    );
};