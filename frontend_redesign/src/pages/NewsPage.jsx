// src/pages/NewsPage.jsx

import React, { useEffect, useState, useRef } from 'react';
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
import { ITEMS_PER_PAGE, categories } from '~/lib/news_page/constants'
import bgImage from '~/assets/news/bg-form.png';

import { NewsFilters } from '~/components/sections/news/NewsFilters';
import { NewsGrid } from '~/components/sections/news/NewsGrid';
import { useNewsFeed } from '~/hooks/useNewsFeed';


const CallToActionSection = () => (
    <section className="mt-8 bg-[#1A1D2A] bg-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container mx-auto max-w-[1280px] px-4 grid lg:grid-cols-5 items-center">
            <div className="lg:col-span-3 flex flex-col">
            </div>
            <div className='lg:col-span-2 flex flex-col bg-[#0C0E15] px-6 py-6'>
                <RequestForm />
            </div>
        </div>
    </section>
);


export const NewsPage = () => {
    const {
        loading,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageNews,
    } = useNewsFeed();

    const [selectedNews, setSelectedNews] = useState(null);
    const isFirstRender = React.useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const target = document.getElementById('breadcrumbs');
        if (!target) return;

        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }, [currentPage]);

    return (
        <div className="w-full bg-[#0C0E15] text-white py-12">
            <div className="container mx-auto max-w-[1280px] px-4 py-12">
                <AdBanner />
                <Breadcrumbs />
                <NewsFilters filters={filters} setFilters={setFilters} categories={categories} />
                <NewsGrid news={currentPageNews} loading={loading} onCardClick={setSelectedNews} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
            <CallToActionSection />
            <NewsModal
                news_item={selectedNews}
                onClose={() => setSelectedNews(null)}
            />
        </div>
    );
};