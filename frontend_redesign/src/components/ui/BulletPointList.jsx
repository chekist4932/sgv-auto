// src/components/ui/BulletPointList.jsx

import React from 'react';

export const BulletPointList = ({ points, className = '' }) => {
    return (
        <div className={`flex flex-col gap-3 max-w-sm text-center ${className}`}>
            {points.map((point, index) => (
                <p key={index} className="text-white text-[15px] leading-normal">
                    {point}
                </p>
            ))}
        </div>
    );
};