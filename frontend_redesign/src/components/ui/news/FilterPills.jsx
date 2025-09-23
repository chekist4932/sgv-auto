import React from "react";

export const FilterPills = ({ categories, activeCategory, onSelect }) => (
    <div className="flex flex-wrap items-center gap-4 ">
        {categories.map(category => (
            <button
                key={category}
                onClick={() => onSelect(category === 'Все новости' ? '' : category)}
                className={`px-4 py-2  rounded-lg text-sm transition-colors border-[1px] border-[#007AFF]
                    ${activeCategory === (category === 'Все новости' ? '' : category)
                        ? 'bg-[#348BDC] text-white'
                        : 'bg-[#0C0E15] text-white/80 hover:bg-white/10'
                    }`}
            >
                {category}
            </button>
        ))}
    </div>
);
