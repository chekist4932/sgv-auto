import React from 'react';
import { X } from 'lucide-react';

export default function NewsModal({ isOpen, onClose, news }) {
    if (!isOpen || !news) return null;

    const normalizedContent = news.content?.toString().replace(/\r\n/g, '\n');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col relative">
                {/* Шапка с заголовком и кнопкой закрытия */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start sticky top-0 bg-white dark:bg-gray-900 z-10 rounded-t-lg">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {news.title}
                        </h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(news.created_at).toLocaleDateString('ru-RU')} • {news.category}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Прокручиваемое содержимое */}
                <div className="overflow-y-auto p-6 space-y-4">
                    {news.image_url && (
                        <img
                            src={news.image_url}
                            alt="News"
                            className="w-full h-64 object-cover rounded"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                            }}
                        />
                    )}

                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {normalizedContent}
                    </p>

                    {news.source_url && (
                        <a
                            href={news.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:underline block"
                        >
                            Перейти к источнику новости →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
