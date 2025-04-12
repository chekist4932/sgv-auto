import React from 'react';
import { X } from 'lucide-react';

export default function NewsModal({ isOpen, onClose, news }) {
    if (!isOpen || !news) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-3xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{news.title}</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(news.created_at).toLocaleDateString('ru-RU')} • {news.category}
                </div>
                {news.image_url && (
                    <img
                        src={news.image_url}
                        alt="News"
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                )}
                <div
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />
                {news.source_url && (
                    <a
                        href={news.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:underline block mt-4"
                    >
                        Перейти к источнику новости →
                    </a>
                )}
            </div>
        </div>
    );
};