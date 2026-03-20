// src/components/sections/catalog/CarGrid.jsx

import React from 'react';
import { CarCard } from '~/components/sections/home/Car/CarCard';

import { Spinner } from '~/components/ui/Spinner'

import { formatCarForDisplay } from '~/lib/car/utils';




export const SoldGrid = ({ cars, loading, onCardClick }) => {

    if (loading) {
        return (
            <div className={`flex justify-center items-center`}>
                <Spinner />
            </div>
        );
    }

    const skeletonArray = Array.from({ length: 12 });

    return (
        <div className='flex justify-center'>
            <div className="grid items-stretch gap-6 md:grid-cols-3 lg:grid-cols-4">
                {loading
                    ? (
                        <div className={`flex justify-center items-center`}>
                            <Spinner />
                        </div>
                    )
                    : cars.length > 0
                        ? cars.map((car) => (
                            <CarCard
                                key={car.id}
                                car={formatCarForDisplay(car)}
                                isActive={true}
                                onClick={() => onCardClick(car)}
                            />
                        ))
                        : (
                            <div className="col-span-full text-center text-white/60 py-16">
                                Автомобили не добавлены
                            </div>
                        )
                }

            </div>
        </div>
    );
};