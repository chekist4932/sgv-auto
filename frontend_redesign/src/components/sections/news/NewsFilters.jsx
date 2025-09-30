// src/components/sections/News/NewsFilters.jsx

import React from 'react';
import { Search } from 'lucide-react';
import { FilterPills } from '~/components/ui/news/FilterPills';

export const NewsFilters = ({ filters, setFilters, categories }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="order-1 md:order-2 flex-1">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Поиск по новостям"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-[#1A1D2A] focus:ring-1 focus:ring-[#007AFF] outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

                </div>
            </div>
            <div className="order-2 md:order-1">
                <FilterPills
                    categories={categories}
                    activeCategory={filters.category}
                    onSelect={(category) => setFilters(prev => ({ ...prev, category, page: 1 }))}
                />
            </div>
        </div>
    );
};