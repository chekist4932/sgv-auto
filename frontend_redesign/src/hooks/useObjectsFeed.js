// src/hooks/useCarsFeed.js

import { useState, useMemo } from 'react';
import { useFetch } from './useFetch';
import { API_URL, requestOptions } from '~/config/index';

export const useObjectsFeed = (api_path, items_per_page) => {
    const { data: objects, loading } = useFetch(
        `${API_URL}/${api_path}/`,
        requestOptions,
        (items) => items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
    
    const [filters, setFilters] = useState({ search: '', category: '' });
    const [currentPage, setCurrentPage] = useState(1);

    const filteredObjects = useMemo(() => {
        return objects.filter(n => {
            const matchesSearch = n.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = !filters.category || n.category === filters.category;
            return matchesSearch && matchesCategory;
        });
    }, [objects, filters]);
    
    // Сбрасываем страницу при изменении фильтров
    useState(() => {
        setCurrentPage(1);
    }, [filters]);

    const totalPages = Math.ceil(filteredObjects.length / items_per_page);
    const currentPageObjects = filteredObjects.slice((currentPage - 1) * items_per_page, currentPage * items_per_page);

    return {
        loading,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageObjects,
    };
};