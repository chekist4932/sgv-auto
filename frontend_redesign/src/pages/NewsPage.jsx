// src/pages/NewsPage.jsx

import React, { useEffect, useState } from 'react';

import { NewsModal } from '~/components/ui/modal/NewsModal';

import { Breadcrumbs } from '~/components/ui/Breadcrumbs'
import { Pagination } from '~/components/ui/news/Pagination'
import { AdBanner } from '~/components/ui/news/AdBanner'

import { NewsFilters } from '~/components/sections/news/NewsFilters';
import { NewsGrid } from '~/components/sections/news/NewsGrid';
import { CallToActionSection } from '~/components/sections/CallToActionSection'

import { useObjectsFeed } from '~/hooks/useObjectsFeed';
import { ITEMS_PER_PAGE } from '~/lib/news_page/constants'




export const NewsPage = () => {
    const {
        loading,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageObjects: currentPageNews,
    } = useObjectsFeed('news', ITEMS_PER_PAGE);


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
                <Breadcrumbs dir={'Новости'}/>
                <NewsFilters filters={filters} setFilters={setFilters} />
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
            {selectedNews && (<NewsModal
                news_item={selectedNews}
                onClose={() => setSelectedNews(null)}
            />
            )}
        </div>
    );
};