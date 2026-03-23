import noResultImage from "/no-results.jpg";


import { calculateFullCarPrice } from '../calculator/auction_card';

export const formatPrice = (price, country, rates = null, car = null) => {
    const currencySymbols = {
        china: '¥',
        korea: '₩',
        japan: 'JP¥',
        usa: '$',
        europe: '€'
    };

    const symbol = currencySymbols[country] || '¥';
    const originalPrice = `${price.toLocaleString('ru-RU')} ${symbol}`;

    // Если переданы курсы, считаем итоговую цену в рублях
    if (rates && car && country != 'korea') {
        const fullPriceRub = calculateFullCarPrice(car, rates);
        if (fullPriceRub) {
            return `~ ${fullPriceRub.toLocaleString('ru-RU')} ₽`;
        }
    }

    return originalPrice;
};



// export const formatPrice = (price, country) => {
//     const currencySymbols = {
//         china: '¥',
//         korea: '₩',
//         japan: 'JP¥',
//         usa: '$',
//         europe: '€'
//     };

//     const symbol = currencySymbols[country] || '¥'; // по умолчанию юань

//     return `${price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ${symbol}`;
// };


export const formatLotForDisplay = (car, rates = null) => {


    const imagesArray = car.IMAGES || [];


    return {
        brand: car.MARKA_NAME || "н/д",
        model: car.MODEL_NAME || "н/д",
        year: car.YEAR || "н/д",
        price: formatPrice(car.FINISH, car.COUNTRY_AUCTION, rates, car),
        originalPrice: formatPrice(car.FINISH, car.COUNTRY_AUCTION),
        description: car.description || "",
        auction_country: car.COUNTRY_AUCTION || undefined,
        images: imagesArray.map((img) => ({
            url: img || noResultImage,
            alt: car.name || `${car.MARKA_NAME} ${car.MODEL_NAME}`.trim() || "Автомобиль"
        })),
        specs: {
            engine: car.ENG_V ? car.ENG_V + ' см3' : 'н/д',
            power: car.PW ? car.PW + " л.с." : "н/д",
            transmission: car.KPP || "н/д",
            drivetrain: car.PRIV || "н/д",
            steering: car.steering || "н/д",
            mileage: car.MILEAGE || "н/д",
        },
        status: car.status || "on_order",
    };
};

export const formatLotForModal = (car, rates = null) => {

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
                    engine: car.ENG_V ? car.ENG_V + ' см3' : 'н/д',
                    power: car.PW ? car.PW + " л.с." : "н/д",
                    transmission: car.KPP,
                    drivetrain: car.PRIV || "н/д",
                    steering: car.steering || "н/д",
                },
            ],
        },
        price: formatPrice(car.FINISH, car.COUNTRY_AUCTION, rates, car),
        originalPrice: formatPrice(car.FINISH, car.COUNTRY_AUCTION),
        description: car.INFO || '',
        auction_country: car.COUNTRY_AUCTION || undefined,
        images: imagesArray.map((img) => ({
            url: img || noResultImage,
            alt: car.name || `${car.MARKA_NAME} ${car.MODEL_NAME}`.trim() || "Автомобиль"
        })),
        status: car.status || "on_order",
    };
};



export const parseCarInfo = (rawHtml) => {
    if (!rawHtml) return [];

    // 1. Очистка и декодирование
    const decoded = rawHtml
        .replace(/\r\n/g, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&times;/g, '×')
        .replace(/&ndash;/g, '–')
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

    // Проверяем, не является ли это простым списком через ";" (Ваш случай №1)
    if (decoded.includes(';') && !decoded.includes('\n')) {
        const [title, content] = decoded.split(':');
        if (content) {
            return [{
                title: title.trim(),
                items: content.split(';').map(item => ({ key: '', value: item.trim() }))
            }];
        }
    }

    const lines = decoded.split('\n').map(l => l.trim()).filter(Boolean);
    const sections = [];
    let currentSection = { title: 'Информация', items: [] };

    lines.forEach(line => {
        // Проверка на заголовок секции (напр. "Body:", "engine:", "Комплектация:")
        if (line.endsWith(':') && line.length < 50) {
            if (currentSection.items.length > 0) sections.push(currentSection);
            currentSection = { title: line.replace(':', ''), items: [] };
            return;
        }

        // Проверка на формат "Ключ: Значение"
        const separatorIndex = line.indexOf(':');
        if (separatorIndex !== -1 && separatorIndex < 40) {
            const key = line.substring(0, separatorIndex).trim();
            const value = line.substring(separatorIndex + 1).trim();
            if (value && value !== '-') {
                currentSection.items.push({ key, value });
            }
        }
        // Проверка на пункты списка (начинаются с "-" или "•")
        else if (line.startsWith('-') || line.startsWith('•')) {
            currentSection.items.push({
                key: '',
                value: line.replace(/^[-•]\s*/, '')
            });
        }
        // Просто текст
        else {
            currentSection.items.push({ key: '', value: line });
        }
    });

    if (currentSection.items.length > 0) sections.push(currentSection);

    // Если ничего не распарсилось (редкий случай), вернем текст как есть
    return sections.length > 0 ? sections : [{ title: 'Описание', items: [{ key: '', value: decoded }] }];
};