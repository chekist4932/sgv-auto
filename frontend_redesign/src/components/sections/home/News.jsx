import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { NewsCard } from '~/components/ui/news/NewsCard'
import { Button } from '~/components/ui/Button'
import { SectionTitle } from '~/components/ui/SectionTitle'

import { Spinner } from "~/components/ui/Spinner";
import { NewsModal } from '~/components/ui/modal/NewsModal'


import { API_URL, requestOptions } from '~/config/index';
import { useFetch } from '~/hooks/useFetch'





export const News = () => {
    const { data: news, loading } = useFetch(
        `${API_URL}/news/?limit=3&offset=0`,
        requestOptions,
        (items) => items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );


    const [selectedNews, setSelectedNews] = useState(null);
    const scrollContainerRef = useRef(null);

    const navigate = useNavigate();


    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id='news' className="w-full bg-[#0C0E15] py-24 overflow-hidden">
            <div className="container mx-auto">
                <SectionTitle title='Новости' />

                {loading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : news.length > 0 ? (
                    <div>
                        <div className="overflow-x-auto scrollbar-hide scroll-smooth"
                            ref={scrollContainerRef}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex justify-center gap-4 px-4">

                                <div className="flex justify-center gap-4 transition-transform duration-500 ease-in-out">
                                    {news.map((news_item, index) => (
                                        <NewsCard key={news_item.id || index} news_item={news_item} isActive={true} onClick={() => setSelectedNews(news_item)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-flow-row sm:grid-flow-col auto-cols-fr gap-4 mb-8 mt-8 w-[246px] mx-auto">
                            <Button
                                variant="primary-red"
                                className="justify-center text-xs"
                                onClick={() => navigate('/news')}
                            >
                                Все новости
                            </Button>
                        </div>

                    </div>

                ) : (
                    <div className="text-center text-white/60 py-16">
                        Новости пока не добавлены
                    </div>
                )}
            </div>
            {selectedNews && (
                <NewsModal
                    news_item={selectedNews}
                    onClose={() => setSelectedNews(null)}
                />
            )}
        </section>
    );
}
