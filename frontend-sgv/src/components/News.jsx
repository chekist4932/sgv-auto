import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, ChevronRight, ChevronLeft, X, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import { API_URL } from '../config';

const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};


function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNewsItem, setSelectedNewsItem] = useState(null);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const scrollContainerRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/news/`, requestOptions);
            if (response.status === 404) {
                throw new Error(`Отзывов нет`);
            }

            const data = await response.json();

            const news = data.items

            // Сортировка по дате (сначала новые)
            const sortedNews = news.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setNews(sortedNews || []);

        } catch (error) {
            console.error('Error fetching reviews:', error); // Если ошибка, оставляем пустой массив изображений
        } finally {
            setLoading(false);
        }
    }



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

    const openNewsModal = (item) => {
        setSelectedNewsItem(item);
        setShowNewsModal(true);
    };

    return (
        <section id="news" className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    <div
                        onClick={() => navigate('/news')}
                        className="inline-block text-red-500 hover:text-red-600 hover:underline cursor-pointer transition"
                    >
                        Новости
                    </div>
                </h2>


                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                ) : news.length > 0 ? (
                    <div className="relative">
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 -ml-4"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-auto scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex gap-4 px-4">
                                {news.map((item) => (
                                    <article
                                        key={item.id}
                                        className="flex-none w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                                        onClick={() => openNewsModal(item)}
                                    >
                                        {item.image_url && item.image_url.trim() !== '' && (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-48 object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                                }}
                                            />
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {format(new Date(item.created_at), 'd MMMM yyyy', { locale: ru })}
                                                <span className="mx-2">•</span>
                                                {item.category}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {item.excerpt}
                                            </p>
                                            <button className="text-red-500 hover:text-red-600 transition-colors flex items-center">
                                                Читать далее
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 -mr-4"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        Новости пока не добавлены
                    </div>
                )}
            </div>

            {showNewsModal && selectedNewsItem && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowNewsModal(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {selectedNewsItem.title}
                            </h3>
                            <button
                                onClick={() => setShowNewsModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            >
                                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <Calendar className="w-4 h-4 mr-2" />
                                {format(new Date(selectedNewsItem.created_at), 'd MMMM yyyy', { locale: ru })}
                                <span className="mx-2">•</span>
                                {selectedNewsItem.category}
                            </div>

                            {selectedNewsItem.image_url && selectedNewsItem.image_url.trim() !== '' && (
                                <img
                                    src={selectedNewsItem.image_url}
                                    alt={selectedNewsItem.title}
                                    className="w-full h-auto rounded-lg mb-6"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                    }}
                                />
                            )}
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-4">{selectedNewsItem.content}</p>
                            {selectedNewsItem.source_url && (
                                <a
                                    href={selectedNewsItem.source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:underline block mt-4"
                                >
                                    Перейти к источнику новости →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default News;