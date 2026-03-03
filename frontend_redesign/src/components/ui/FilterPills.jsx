// \src\components\ui\news\FilterPills.jsx

import React from "react";


const FilterButton = ({ category, activeCategory, onSelect }) => {
    const value = category === "Все новости" ? "" : category;

    return (
        <button
            onClick={() => onSelect(value)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors border border-[#007AFF] 
                overflow-hidden text-ellipsis whitespace-nowrap
                ${activeCategory === value
                    ? "bg-[#348BDC] text-white"
                    : "bg-[#0C0E15] text-white/80 hover:bg-white/10"
                }`}
        >
            {category}
        </button>
    );
};


export const FilterPills = ({ categories = [], activeCategory, onSelect }) => {
    if (!Array.isArray(categories)) return null;

    const firstRow = categories.slice(0, 2);
    const secondRow = categories.slice(2);

    return (
        <div className="w-full">
            {/* 🔹 Мобильная версия (грид 2 + 3) */}
            <div className="block md:hidden">
                {/* Первая строка — 2 кнопки */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {firstRow.map((category) => (
                        <FilterButton
                            key={category}
                            category={category}
                            activeCategory={activeCategory}
                            onSelect={onSelect}
                        />
                    ))}
                </div>

                {/* Вторая строка — 3 кнопки */}
                <div className="grid grid-cols-3 gap-2">
                    {secondRow.map((category) => (
                        <FilterButton
                            key={category}
                            category={category}
                            activeCategory={activeCategory}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>

            {/* 🔹 Десктопная версия — всё в одну строку */}
            <div className="hidden md:flex md:flex-wrap md:gap-4">
                {categories.map((category) => (
                    <FilterButton
                        key={category}
                        category={category}
                        activeCategory={activeCategory}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
};


