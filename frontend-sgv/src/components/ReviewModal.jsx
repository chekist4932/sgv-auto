import React, { useState } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, X } from 'lucide-react';


export default function ReviewModal({ review, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = review.images || (review.image_url ? [review.image_url] : []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{review.author}</h3>
                        <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-4">{review.text}</p>

                    {images.length > 0 && (
                        <div className="relative mb-4">
                            <img
                                src={images[currentImageIndex]}
                                alt={`Отзыв от ${review.author}`}
                                className="w-full rounded-lg max-h-[400px] object-contain"
                            />

                            {images.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                        {images.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        <a href={review.source_url} target="_blank" className="text-red-500 hover:text-red-600 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {review.source}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
