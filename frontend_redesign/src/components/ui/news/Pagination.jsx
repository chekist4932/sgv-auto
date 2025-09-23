import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const buttonStyle =
        "flex items-center text-sm gap-2 disabled:opacity-30 border-[1px] border-white/20 rounded-lg py-2 px-4 text-white/80";

    const handlePageChange = (page) => {

        const next = Math.max(1, Math.min(totalPages, page));
        if (next === currentPage) return;
        onPageChange(next);
    };

    return (
        <div className="mt-8 flex justify-center items-center gap-4 text-white">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={buttonStyle}
            >
                <ChevronLeft className="w-5 h-5" />
                <span>Предыдущая</span>
            </button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, index, arr) => (
                        <React.Fragment key={page}>
                            {index > 0 && page - arr[index - 1] > 1 && <span className="px-2">...</span>}
                            <button
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded-lg ${currentPage === page ? 'bg-blue-500' : ''}`}
                            >
                                {page}
                            </button>
                        </React.Fragment>
                    ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={buttonStyle}
            >
                <span>Следующая</span>
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};