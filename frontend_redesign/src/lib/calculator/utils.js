// src/utils/utils.js
import { SANCTIONED_JP_SHIPPING } from "./constants.js";


export const getRecyclingFee = (engineVolume, age, isPersonal = true) => {
    if (engineVolume > 3000) {
        if (engineVolume <= 3500) {
            return age === 'new' ? 2153000 : 3297000;
        } else {
            return age === 'new' ? 2742000 : 3605000;
        }
    }

    if (isPersonal) {
        return age === 'new' ? 3400 : 5200;
    }

    if (engineVolume <= 1000) {
        return age === 'new' ? 180200 : 460000;
    } else if (engineVolume <= 2000) {
        return age === 'new' ? 667400 : 1174000;
    } else {
        return age === 'new' ? 1875000 : 2839000;
    }
};


export const calculateSanctionedJPShipping = (priceJPY, rates) => {
    const entry = SANCTIONED_JP_SHIPPING.find(
        ({ priceRange }) => priceJPY >= priceRange[0] && priceJPY <= priceRange[1]
    );

    if (entry) {
        return { fob: entry.fob + 300, freight: entry.freight };
    }
    const fob = (priceJPY * (rates.JPY / rates.USD) * 0.03) + 1300;
    return { fob, freight: 2500 };
};


export const calculateShippingCost = (countryInfo, priceInCurrency, rates) => {
    if (countryInfo.sanctioned) {
        const { fob, freight } = calculateSanctionedJPShipping(priceInCurrency, rates);
        // console.log(priceInCurrency)
        const totalUSD = fob + freight;
        // const totalUSD = 100000000000;
        return {
            costRub: totalUSD * rates.USD,
            originalCost: { amount: totalUSD, currency: 'USD' }
        };
    }

    const { amount, currency } = countryInfo.shippingCosts;
    return {
        costRub: amount * rates[currency],
        originalCost: { amount, currency }
    };
};

export const calculateCustomsDuty = (priceEur, volumeCc, age) => {
    if (age === 'new') {
        if (priceEur <= 8500) {
            return Math.max(volumeCc * 2.5, priceEur * 0.54);
        } else if (priceEur <= 16700) {
            return Math.max(volumeCc * 3.5, priceEur * 0.48);
        } else if (priceEur <= 42300) {
            return Math.max(volumeCc * 5.5, priceEur * 0.48);
        } else if (priceEur <= 84500) {
            return Math.max(volumeCc * 7.5, priceEur * 0.48);
        } else if (priceEur <= 169000) {
            return Math.max(volumeCc * 15, priceEur * 0.48);
        } else {
            return Math.max(volumeCc * 20, priceEur * 0.48);
        }
    } else if (age === 'medium') {
        if (volumeCc <= 1000) {
            return volumeCc * 1.5;
        } else if (volumeCc <= 1500) {
            return volumeCc * 1.7;
        } else if (volumeCc <= 1800) {
            return volumeCc * 2.5;
        } else if (volumeCc <= 2300) {
            return volumeCc * 2.7;
        } else if (volumeCc <= 3000) {
            return volumeCc * 3;
        } else {
            return volumeCc * 3.6;
        }
    } else {
        if (volumeCc <= 1000) {
            return volumeCc * 3;
        } else if (volumeCc <= 1500) {
            return volumeCc * 3.2;
        } else if (volumeCc <= 1800) {
            return volumeCc * 3.5;
        } else if (volumeCc <= 2300) {
            return volumeCc * 4.8;
        } else if (volumeCc <= 3000) {
            return volumeCc * 5;
        } else {
            return volumeCc * 5.7;
        }
    }
};

export const getCustomsFee = (customsValue) => {
    if (customsValue <= 200000) return 775;
    if (customsValue <= 450000) return 1550;
    if (customsValue <= 1200000) return 3100;
    if (customsValue <= 2700000) return 8530;
    if (customsValue <= 4200000) return 12000;
    if (customsValue <= 5500000) return 15500;
    if (customsValue <= 7000000) return 20000;
    if (customsValue <= 8000000) return 23000;
    if (customsValue <= 9000000) return 25000;
    if (customsValue <= 10000000) return 27000;
    return 30000;
};