import React from 'react';
import { Star } from 'lucide-react';


export const RatingStars = ({ rating = 5, maxRating = 5 }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, index) => (
                <Star
                    key={index}
                    className={`w-3 h-3 ${index < rating ? 'text-primary-red fill-primary-red' : 'text-gray-600'}`}
                />
            ))}
        </div>
    );
};