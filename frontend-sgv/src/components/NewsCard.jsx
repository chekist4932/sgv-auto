import { Calendar, ChevronRight } from 'lucide-react';

export default function NewsCard({ news, onReadMore }) {
    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {news.image_url && (
                <img
                    src={news.image_url}
                    alt="News"
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(news.created_at).toLocaleDateString('ru-RU')}
                    <span className="mx-2">•</span>
                    {news.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {news.preview}
                </p>
                <button
                    onClick={() => onReadMore(news)}
                    className="text-red-500 hover:text-red-600 transition-colors flex items-center"
                >
                    Читать далее
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </article>
    );
};
