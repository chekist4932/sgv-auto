// src/pages/CatalogPage.jsx

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from "react-router-dom";

import { CarModal } from '~/components/ui/modal/CarModal';

import { CallToActionSection } from '~/components/sections/CallToActionSection'

import { Pagination } from '~/components/ui/news/Pagination'
import { AdBanner } from '~/components/ui/news/AdBanner'
import { Breadcrumbs } from '~/components/ui/Breadcrumbs'

import { CarGrid } from '~/components/sections/catalog/CarGrid';
import { CatalogFilters } from '~/components/sections/catalog/CatalogFilters';
import { useAucFeed } from '~/hooks/useAucFeed';
import { ITEMS_PER_PAGE } from '~/lib/catalog_page/constants'

const countryTitles = {
    china: "Авто из Китая",
    korea: "Авто из Кореи"
};


export const CatalogPage = ({ onOpenModalCallBack }) => {


    const [selectedCar, setSelectedCar] = useState(null);
    const [filters, setFilters] = useState({});
    const isFirstRender = useRef(true);
    const gridContainerRef = useRef(null); // Создаем ref для сетки
    const { country } = useParams();

    const prevCountryRef = useRef(country);

    // Сбрасываем фильтры и страницу при смене страны
    useEffect(() => {
        if (prevCountryRef.current !== country) {
            setFilters({});
            prevCountryRef.current = country;
        }
    }, [country]);

    const getApiPath = () => {
        let path = country ? `catalog/${country}` : 'catalog/china';

        // Добавляем фильтры в URL если они есть
        const filterParams = new URLSearchParams();
        if (filters.marka_name) filterParams.append('marka_name', filters.marka_name);
        if (filters.model_name) filterParams.append('model_name', filters.model_name);
        if (filters.priv) filterParams.append('priv', filters.priv);
        if (filters.kpp) filterParams.append('kpp', filters.kpp);
        if (filters.year_gte) filterParams.append('year_gte', filters.year_gte);
        if (filters.year_lte) filterParams.append('year_lte', filters.year_lte);
        if (filters.mileage_gte) filterParams.append('mileage_gte', filters.mileage_gte);
        if (filters.mileage_lte) filterParams.append('mileage_lte', filters.mileage_lte);
        if (filters.eng_v_gte) filterParams.append('eng_v_gte', filters.eng_v_gte);
        if (filters.eng_v_lte) filterParams.append('eng_v_lte', filters.eng_v_lte);
        if (filters.pw_gte) filterParams.append('pw_gte', filters.pw_gte);
        if (filters.pw_lte) filterParams.append('pw_lte', filters.pw_lte);
        if (filters.finish_gte) filterParams.append('finish_gte', filters.finish_gte);
        if (filters.finish_lte) filterParams.append('finish_lte', filters.finish_lte);

        const filterString = filterParams.toString();
        return filterString ? `${path}?${filterString}&` : `${path}?`;
    };

    const apiPath = useMemo(() => getApiPath(), [filters]);

    const {
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        objects: currentPageCatalog,
        error
    } = useAucFeed(apiPath, ITEMS_PER_PAGE);



    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            // Ищем элемент сетки по классу или используем ref
            const gridElement = gridContainerRef.current;

            if (gridElement) {
                const offset = 80;
                const top = gridElement.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            }
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [currentPage]);


    const handleFiltersSubmit = (data) => {
        setCurrentPage(1); // всегда сбрасываем пагинацию
        setFilters(data);
    };

    return (
        <div className="w-full bg-[#0C0E15] text-white py-12">
            <div className="container mx-auto max-w-[1280px] px-4 py-12">
                <div ref={gridContainerRef}>
                    <AdBanner />
                </div>

                <Breadcrumbs
                    dir={countryTitles[country] || "Каталог"}
                />
                <CatalogFilters
                    country={country}
                    onSubmit={handleFiltersSubmit}
                />
                <CarGrid
                    cars={currentPageCatalog}
                    loading={loading}
                    onCardClick={setSelectedCar}
                />
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
                    car={selectedCar}
                    isLot={true}
                    onClose={() => setSelectedCar(null)}
                    onOpenModal={onOpenModalCallBack}
                />
            )}
        </div>
    );
};