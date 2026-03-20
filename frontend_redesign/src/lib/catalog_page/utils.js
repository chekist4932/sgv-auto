import noResultImage from "/no-results.jpg";


export const formatPrice = (price, country) => {
    const currencySymbols = {
        china: '¥',
        korea: '₩',
        japan: 'JP¥',
        usa: '$',
        europe: '€'
    };

    const symbol = currencySymbols[country] || '¥'; // по умолчанию юань
    
    return `${price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ${symbol}`;
};


export const formatLotForDisplay = (car) => {


    const imagesArray = car.IMAGES || [];


    return {
        brand: car.MARKA_NAME || "Не указан",
        model: car.MODEL_NAME || "Не указан",
        year: car.YEAR || "Не указан",
        price: formatPrice(car.FINISH, car.COUNTRY_AUCTION),
        description: car.description || "",
        images: imagesArray.map((img) => ({ 
            url: img || noResultImage, 
            alt: car.name || `${car.MARKA_NAME} ${car.MODEL_NAME}`.trim() || "Автомобиль"
        })),
        specs: {
            engine: car.ENG_V ? car.ENG_V + ' см3' : 'не указан',
            power: car.PW || "Не указан",
            transmission: car.KPP || "Не указан",
            drivetrain: car.PRIV || "Не указан",
            steering: car.steering || "Не указан",
            mileage: car.MILEAGE || "Не указан",
        },
        status: car.status || "on_order",
    };
};

export const formatLotForModal = (car) => {
    
    const brand = car.MARKA_NAME;
    const model = car.MODEL_NAME;
    const imagesArray = car.IMAGES || [];


    return {
        id: car.id,
        brand: { name: brand, id: 1 },
        model: { name: model, id: 1 },
        generation: {
            name: "",
            years: car.YEAR,
            specs: [
                {
                    engine: car.ENG_V ? car.ENG_V + ' см3' : 'не указан',
                    power: car.PW + " л.с." || "Не указан",
                    transmission: car.KPP,
                    drivetrain: car.PRIV || "Не указан",
                    steering: car.steering || "Не указан",
                },
            ],
        },
        price: formatPrice(car.FINISH, car.COUNTRY_AUCTION),
        description: car.INFO || '',
        images: imagesArray.map((img) => ({ 
            url: img || noResultImage, 
            alt: car.name || `${car.MARKA_NAME} ${car.MODEL_NAME}`.trim() || "Автомобиль"
        })),
        status: car.status || "on_order",
    };
};



export const parseCarInfo = (rawHtml) => {
    if (!rawHtml) return [];

    // 1. Очистка от HTML сущностей и тегов
    const decoded = rawHtml
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&times;/g, '×')
        .replace(/&ndash;/g, '–')
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)); // Декодируем китайские символы

    const lines = decoded.split('\n');
    const sections = [];
    let currentSection = null;
    const seenKeys = new Set(); // Для удаления дублей, так как в вашем логе данные повторяются

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Определяем заголовок секции (строка заканчивается на :)
        if (trimmed.endsWith(':') && !trimmed.includes('YES') && !trimmed.includes('-')) {
            const title = trimmed.replace(':', '');
            // Если секция уже была (дубль из лога), не создаем новую, а переключаемся на старую или игнорим
            currentSection = { title, items: [] };
            sections.push(currentSection);
        } else {
            // Разделяем Ключ: Значение
            const separatorIndex = trimmed.indexOf(':');
            if (separatorIndex !== -1) {
                const key = trimmed.substring(0, separatorIndex).trim();
                const value = trimmed.substring(separatorIndex + 1).trim();

                // Фильтруем мусор: пустые значения "-", дубликаты и технические заголовки
                if (value && value !== '-' && !seenKeys.has(key)) {
                    if (currentSection) {
                        currentSection.items.push({ key, value });
                        // seenKeys.add(key); // Раскомментируйте, если хотите абсолютно уникальные ключи
                    }
                }
            }
        }
    });

    // Убираем пустые секции
    return sections.filter(s => s.items.length > 0);
};