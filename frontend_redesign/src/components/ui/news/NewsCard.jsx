// src/components/ui/ReviewCard.jsx

import React from 'react';

import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';


import { Badge } from '../Badge';

// import ribbonIcon from '../../assets/images/review/ribbon.svg'
import noResultImage from '/no-results.jpg'


export const NewsCard = ({ news_item, isActive, onClick }) => {

    const { title, excerpt, category, created_at, source_url, image_url } = news_item;

    return (
        <div
            className={`
        relative shrink-0 rounded-lg bg-[#11131B] border border-white/10
        h-full flex flex-col
        transition-all duration-500 ease-in-out
        w-[361px]
        ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.85]'}`
            }
            onClick={onClick}
        >

            <div className="relative group rounded-t-lg aspect-[4/3] overflow-hidden">
                <img
                    src={image_url || noResultImage}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">

                <div className="flex gap-2 justify-start items-center mb-2">
                    <Badge >{format(new Date(created_at), 'd MMMM yyyy', { locale: ru })}</Badge>
                    <Badge >{category}</Badge>
                </div>

                <div className="flex justify-between items-center mb-4 gap-4">
                    <h3 className="text-md font-semibold text-white text-left leading-tight">{title}</h3>
                </div>

                <p className="text-white text-xs text-justify leading-tight mb-4 line-clamp-3">
                    {excerpt}
                </p>
                <div className="mt-auto inline-block">
                    <a
                        href={source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red font-semibold text-sm inline-flex items-center gap-1 group hover:no-underline"
                    >
                        Подробнее
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </div>
            </div>
        </div>
    );
};