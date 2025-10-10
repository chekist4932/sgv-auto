// src/hooks/useCatalogFeed.js

import { useState, useMemo } from 'react';
import { useFetch } from './useFetch';
import { API_URL, requestOptions } from '~/config/index';


async function fetchCarImages(cars) {
    const updatedCars = await Promise.all(
        cars.map(async (car) => {
            try {
                const response = await fetch(`${API_URL}/car/${car.id}/image/`, requestOptions);

                if (response.status === 404) {
                    return { ...car, images: [] };
                }

                if (!response.ok) throw new Error(`Ошибка загрузки изображений для ${car.id}: ${response.statusText}`);

                const data = await response.json();
                const images = data.items;
                return { ...car, images };
            } catch {
                return { ...car, images: [] };
            }
        })
    );
    return updatedCars;
}


export const useCatalogFeed = (api_path, items_per_page) => {
    const { data: objects = [], loading, error } = useFetch(
        `${API_URL}/${api_path}/`,
        requestOptions,
        async (items) => {
            const carsWithImages = await fetchCarImages(items || []);
            // console.log(carsWithImages);
            return carsWithImages.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }
    );
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(objects.length / items_per_page);
    const currentPageObjects = objects.slice((currentPage - 1) * items_per_page, currentPage * items_per_page);

    return {
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        currentPageObjects,
    };
};