// src/components/ui/ReviewCard.jsx

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

import { RatingStars } from '~/components/ui/RatingStars';

import ribbonIcon from '~/assets/images/review/ribbon.svg'
import noResultImage from '/no-results.jpg'




export const ReviewCard = ({ review, isActive, onClick }) => {

    const { author, rating, source, source_url, text, image_url } = review;

    return (
        <div
            className={`
        relative shrink-0 rounded-2xl bg-[#11131B] border border-white/10
        flex flex-col
        transition-all duration-500 ease-in-out
        w-[300px] h-full lg:h-auto
        ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.85] '}
      `}
        >

            <div className="relative group rounded-t-2xl aspect-[4/3] overflow-hidden">
                <img
                    onClick={onClick}
                    src={image_url || noResultImage}
                    alt={`Отзыв от ${author}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <a
                    href={source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-1 right-[-1px] flex items-center justify-center"
                    aria-label={`Читать отзыв на ${source}`}
                >

                    <div className="relative">
                        <img
                            src={ribbonIcon}
                            alt={`Иконка источника ${source}`}
                            className="w-20 h-16"
                        />

                        <span className="absolute left-2 inset-0 flex items-center justify-center text-xs font-semibold text-white uppercase">
                            {source}
                        </span>
                    </div>
                </a>
            </div>

            <div className="p-4 flex flex-col flex-grow">

                <div className="flex justify-between items-center mb-2 gap-4">
                    <h3 className="text-xl font-semibold text-white text-left">{author}</h3>
                    <RatingStars rating={rating} />
                </div>

                <p className="text-white text-xs text-justify leading-relaxed mb-4 line-clamp-3">
                    {text}
                </p>


                <div className="mt-auto inline-block">
                    <span
                        className="text-primary-red font-semibold text-sm inline-flex items-center gap-1 group select-none cursor-pointer hover:underline "
                        onClick={onClick}
                    >
                        Подробнее
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                </div>
            </div>
        </div>
    );
};