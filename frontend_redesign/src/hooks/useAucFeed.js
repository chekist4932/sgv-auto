// src/hooks/useAucFeed.js
import { useState, useEffect, useMemo } from 'react';
import { useFetchLot } from './useFetchLot';
import { API_URL, requestOptions } from '~/config/index';

export const useAucFeed = (api_path, items_per_page) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Вычисляем offset на основе текущей страницы
    const offset = (currentPage - 1) * items_per_page;

    const dataUrl = useMemo(() => {
        const url = new URL(`${API_URL}/${api_path}limit=${items_per_page}&offset=${offset}`);
        console.log(`build dataUrl ${url}`);
        return url.toString();
    }, [api_path, currentPage]);
    
    // Запрос для данных
    const { 
        data: itemsData, 
        loading: itemsLoading, 
        error: itemsError 
    } = useFetchLot(dataUrl, requestOptions);
    
    const objects = itemsData?.items || [];

        const totalCount = itemsData?.total ? parseInt(itemsData.total) : 0;


    const totalPages = useMemo(() => {
        // Добавил проверку на валидные числа
        if (!totalCount || totalCount === 0 || !items_per_page) return 0;
        return Math.ceil(totalCount / items_per_page);
    }, [totalCount, items_per_page]);

    const loading = itemsLoading;
    const error = itemsError;


    return {
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        objects,
        totalCount,
        error
    };
};