import React from "react";
import { FilterPills } from "~/components/ui/FilterPills";

const categories = [
    "В наличии",
    "Под заказ",
    "Продано",
];

const statusMap = {
    "В наличии": "in_stock",
    "Под заказ": "on_order",
    "Продано": "sold",
};

export const CatalogFilters = ({ activeStatus, onChange }) => {
    return (
        <div className="mb-8">
            <FilterPills
                categories={categories}
                activeCategory={
                    Object.keys(statusMap).find(
                        (key) => statusMap[key] === activeStatus
                    )
                }
                onSelect={(category) => {
                    onChange(statusMap[category]);
                }}
            />
        </div>
    );
};