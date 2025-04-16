import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';

import { API_URL } from '../config';

const categories = ['Все новости', 'Компания', 'Законодательство', 'Автомобили', 'Мероприятия'];

const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};


const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        dateFrom: '',
        dateTo: ''
    });

    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleReadMore = (news) => {
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    useEffect(() => {
        // console.log('⏳ Компонент смонтирован, вызываем fetchNews()');
        fetchNews();
    }, []);

    async function fetchNews() {
        setLoading(true);
        try {
            // console.log('🔄 Отправка запроса на сервер...');
            const response = await fetch(`${API_URL}/news/`, requestOptions);
            if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

            const data = await response.json();
            // console.log('✅ Получены данные:', data);

            const news = (data.items || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setNews(news);
        } catch (error) {
            console.error('❌ Ошибка при загрузке новостей:', error.message);
            setNews([]);
        } finally {
            setLoading(false);
        }
    }

    const filteredNews = news.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || n.category === filters.category;
        const matchesDateFrom = !filters.dateFrom || new Date(n.created_at) >= new Date(filters.dateFrom);
        const matchesDateTo = !filters.dateTo || new Date(n.created_at) <= new Date(filters.dateTo);
        return matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo;
    });

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageNews = filteredNews.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header navIsActive={false}/>

            <main className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Новости</h1>

                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Поиск по новостям"
                                    value={filters.search}
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setFilters({ ...filters, search: e.target.value });
                                    }}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <select
                                value={filters.category}
                                onChange={(e) => {
                                    setCurrentPage(1);
                                    setFilters({ ...filters, category: e.target.value });
                                }}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category === 'Все новости' ? '' : category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => {
                                    setCurrentPage(1);
                                    setFilters({ ...filters, dateFrom: e.target.value });
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />

                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => {
                                    setCurrentPage(1);
                                    setFilters({ ...filters, dateTo: e.target.value });
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* News Grid */}
                    {loading ? (
                        <p className="text-center text-gray-600 dark:text-gray-300">Загрузка...</p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {currentPageNews.map((item) => (
                                <NewsCard key={item.id} news={item} onReadMore={handleReadMore} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                Предыдущая
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                        ? 'bg-red-500 text-white'
                                        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                Следующая
                            </button>
                        </nav>
                    </div>
                </div>
            </main>

            <NewsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                news={selectedNews}
            />

            <Footer />
        </div>
    );
}
