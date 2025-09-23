import noResultImage from "/no-results.jpg";


export const formatCarForDisplay = (car) => {
    const images = car.images || [];
    const mainImage = images.find((image) => image.is_main) || {};
    const otherImages = images.filter((image) => !image.is_main);

    return {
        brand: car.name.split(" ")[0] || "",
        model: car.name.split(" ").slice(1).join(" ") || "",
        year: car.year.toString(),
        price: `${car.price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽`,
        description: car.description,
        images: [
            { url: mainImage.image_url || noResultImage, alt: car.name },
            ...otherImages.map((img) => ({ url: img.image_url, alt: car.name })),
        ],
        specs: {
            engine: car.engine,
            power: car.power || "",
            transmission: car.transmission,
            drivetrain: car.drivetrain || "",
            mileage: car.mileage,
        },
        status: car.status,
    };
};

export const formatCarForModal = (car) => {
    const nameParts = car.name.split(" ");
    const brand = nameParts[0] || "";
    const model = nameParts.slice(1).join(" ") || "";

    const images = car.images || [];
    const mainImage = images.find((image) => image.is_main) || {};
    const otherImages = images.filter((image) => !image.is_main);

    return {
        id: car.id,
        brand: { name: brand, id: 1 },
        model: { name: model, id: 1 },
        generation: {
            name: "",
            years: car.year.toString(),
            specs: [
                {
                    engine: car.engine,
                    power: car.power + " л.с." || "",
                    transmission: car.transmission,
                    drivetrain: car.drivetrain || "",
                    acceleration: car.acceleration
                },
            ],
        },
        price: `${car.price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽`,
        description: car.description,
        images: [
            { url: mainImage.image_url || noResultImage, alt: car.name },
            ...otherImages.map((img) => ({ url: img.image_url, alt: car.name })),
        ],
        status: car.status,
    };
};