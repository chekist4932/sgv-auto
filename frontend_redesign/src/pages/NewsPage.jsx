// src/pages/NewsPage.jsx

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { NewsModal } from '~/components/ui/modal/NewsModal';
import { NewsCard } from '~/components/ui/news/NewsCard';
import { Spinner } from '~/components/ui/Spinner';
import { RequestForm } from '~/components/ui/Form/requestForm';

import { Breadcrumbs } from '~/components/ui/news/Breadcrumbs'
import { FilterPills } from '~/components/ui/news/FilterPills'
import { Pagination } from '~/components/ui/news/Pagination'
import { AdBanner } from '~/components/ui/news/AdBanner'

import { useFetch } from '~/hooks/useFetch';
import { API_URL, requestOptions } from '~/config/index';
import bgImage from '~/assets/news/bg-form.png';



const categories = ['Все новости', 'Авто', 'Мероприятия', 'Компания', 'Клиентам'];
const ITEMS_PER_PAGE = 6;

export const NewsPage = () => {

    const { data: news, loading } = useFetch(
        `${API_URL}/news/`,
        requestOptions,
        (items) => items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
    const [filters, setFilters] = useState({ search: '', category: '' });
    const [selectedNews, setSelectedNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const target = document.getElementById('news_border');
        if (!target) return;

        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }, [currentPage]);

    const filteredNews = news.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || n.category === filters.category;
        return matchesSearch && matchesCategory;
    });



    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const currentPageNews = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="w-full bg-[#0C0E15] text-white">
            <div className="container mx-auto max-w-[1280px] px-4 py-12">

                <AdBanner />
                <Breadcrumbs />

                <div className="flex items-center gap-4 mb-8">
                    <FilterPills
                        categories={categories}
                        activeCategory={filters.category}
                        onSelect={(category) => {
                            setCurrentPage(1);
                            setFilters({ ...filters, category });
                        }}
                    />
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Поиск по новостям"
                            value={filters.search}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setFilters({ ...filters, search: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-[#1A1D2A] focus:ring-1 focus:ring-[#007AFF] outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center ">
                        <Spinner />
                    </div>
                ) : currentPageNews.length > 0 ? (
                    <div className='flex justify-center'>
                        <div className="grid items-stretch gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                            {currentPageNews.map((news_item) => (
                                <NewsCard key={news_item.id} news_item={news_item} isActive={true} onClick={() => setSelectedNews(news_item)} />
                            ))}
                        </div>
                    </div>

                ) : (
                    <div className="text-center text-white/60 py-16">
                        Новости пока не добавлены
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}



            </div>

            <section className="mt-8 bg-[#1A1D2A] bg-auto" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="container mx-auto max-w-[1280px] px-4 grid lg:grid-cols-5 items-center">
                    <div className="lg:col-span-3 flex flex-col">
                    </div>
                    <div className='lg:col-span-2 flex flex-col bg-[#0C0E15] px-6 py-6'>
                        <RequestForm />
                    </div>
                </div>
            </section>

            <NewsModal
                news_item={selectedNews}
                onClose={() => setSelectedNews(null)}
            />
        </div>
    );
};