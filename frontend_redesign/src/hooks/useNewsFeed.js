// src/hooks/useNewsFeed.js

import { useState, useMemo } from 'react';
import { useFetch } from './useFetch';
import { API_URL, requestOptions } from '~/config/index';
import { ITEMS_PER_PAGE } from '~/lib/news_page/constants';

export const useNewsFeed = () => {
    const { data: news, loading } = useFetch(
        `${API_URL}/news/`,
        requestOptions,
        (items) => items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );

    const [filters, setFilters] = useState({ search: '', category: '' });
    const [currentPage, setCurrentPage] = useState(1);

    const filteredNews = useMemo(() => {
        return news.filter(n => {
            const matchesSearch = n.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = !filters.category || n.category === filters.category;
            return matchesSearch && matchesCategory;
        });
    }, [news, filters]);
    
    // Сбрасываем страницу при изменении фильтров
    useState(() => {
        setCurrentPage(1);
    }, [filters]);

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const currentPageNews = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return {
        loading,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageNews,
    };
};