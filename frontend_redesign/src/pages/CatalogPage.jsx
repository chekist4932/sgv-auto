// src/pages/CatalogPage.jsx

import React, { useEffect, useState } from 'react';

import { CarModal } from '~/components/ui/modal/CarModal';
import { formatCarForModal } from '~/lib/car/utils'

import { CallToActionSection } from '~/components/sections/CallToActionSection'

import { Pagination } from '~/components/ui/news/Pagination'
import { AdBanner } from '~/components/ui/news/AdBanner'

import { CarGrid } from '~/components/sections/catalog/CarGrid';
import { useCatalogFeed } from '~/hooks/useCatalogFeed';
import { ITEMS_PER_PAGE } from '~/lib/catalog_page/constants'




export const CatalogPage = ({ onOpenModalCallBack }) => {
    const {
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageObjects: currentPageCatalog,
    } = useCatalogFeed('car', ITEMS_PER_PAGE);

    const [selectedCar, setSelectedCar] = useState(null);
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
                <CarGrid cars={currentPageCatalog} loading={loading} onCardClick={setSelectedCar} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
            <CallToActionSection />
            {selectedCar && (
                <CarModal
                    // Теперь эта функция вызывается только когда `selectedCar` - это объект
                    car={formatCarForModal(selectedCar)}
                    onClose={() => setSelectedCar(null)}
                    onOpenModal={onOpenModalCallBack}
                />
            )}
        </div>
    );
};