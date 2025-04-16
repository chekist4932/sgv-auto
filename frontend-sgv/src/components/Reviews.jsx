import React, { useState, useRef, useEffect } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '../config';

import ReviewModal from './ReviewModal';

const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};


export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${API_URL}/review/`, requestOptions);
            if (!response.ok) throw new Error("Ошибка при загрузке отзывов");
            const data = await response.json();
            const sorted = (data.items || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setReviews(sorted);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="reviews" className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Отзывы клиентов</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="relative">
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-auto scrollbar-hide scroll-smooth px-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex gap-4 md:gap-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="flex-none w-[280px] md:w-[400px]">
                                        <div
                                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700 h-full cursor-pointer hover:shadow-lg transition"
                                            onClick={() => setSelectedReview(review)}
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{review.author}</h3>
                                                    <div className="flex items-center">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-red-500 dark:text-red-400 flex items-center">
                                                    <MessageSquare className="w-4 h-4 mr-1" />
                                                    {review.source}
                                                </span>
                                            </div>

                                            {(review.image_url || (review.images && review.images.length > 0)) && (
                                                <div className="mb-4 aspect-video rounded-lg overflow-hidden relative">
                                                    <img
                                                        src={review.image_url || review.images?.[0]}
                                                        alt={`Отзыв от ${review.author}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {review.images?.length > 1 && (
                                                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                                            +{review.images.length - 1}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 whitespace-pre-line">
                                                {review.text}
                                            </p>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        Отзывы пока не добавлены
                    </div>
                )}
            </div>

            {selectedReview && (
                <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
            )}
        </section>
    );
}
