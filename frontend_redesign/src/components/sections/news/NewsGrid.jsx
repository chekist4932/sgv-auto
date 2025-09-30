// src/components/sections/News/NewsGrid.jsx

import React from 'react';
import { NewsCard } from '~/components/ui/news/NewsCard';
import { Spinner } from '~/components/ui/Spinner';

export const NewsGrid = ({ news, loading, onCardClick }) => {
    if (loading) {
        return <div className="flex justify-center h-96"><Spinner /></div>;
    }

    if (news.length === 0) {
        return <div className="text-center text-white/60 py-16">Новости не найдены</div>;
    }

    return (
        <div className='flex justify-center'>
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((news_item) => (
                    <NewsCard key={news_item.id} news_item={news_item} isActive={true} onClick={() => onCardClick(news_item)} />
                ))}
            </div>
        </div>
    );
};