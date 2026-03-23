// src/components/sections/catalog/CarGrid.jsx

import React from 'react';
import { CarCard } from '~/components/sections/home/Car/CarCard';
import { formatLotForDisplay } from '~/lib/catalog_page/utils';
import { useCustomsCalculator } from '~/hooks/useCustomsCalculator';


const CarCardSkeleton = () => (
    <div className="rounded-2xl overflow-hidden bg-white/5 animate-pulse">
        {/* изображение */}
        <div className="h-40 bg-white/10" />

        {/* контент */}
        <div className="p-4 space-y-3">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
            <div className="h-6 bg-white/10 rounded w-1/3 mt-4" />
        </div>
    </div>
);



export const CarGrid = ({ cars, loading, onCardClick }) => {

    const skeletonArray = Array.from({ length: 12 });
    const { rates } = useCustomsCalculator({ /* заглушка пропсов */ });

    return (
        <div className='flex justify-center'>
            <div className="grid items-stretch gap-6 md:grid-cols-3 lg:grid-cols-4">
                {loading
                    ? skeletonArray.map((_, index) => (
                        <CarCardSkeleton key={`skeleton-${index}-${Date.now()}`}/>
                    ))
                    : cars.length > 0
                        ? cars.map((car) => (
                            <CarCard
                                key={car.ID}
                                car={formatLotForDisplay(car, rates)}
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