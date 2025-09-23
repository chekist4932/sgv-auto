export const ENGINE_TYPES = [
    { id: 'petrol', label: 'бензиновый', sanctioned: false },
    { id: 'diesel', label: 'дизельный', sanctioned: false },
    { id: 'hybrid_petrol', label: 'бензиновый и электрический', sanctioned: true },
    { id: 'hybrid_diesel', label: 'дизельный и электрический', sanctioned: true },
    { id: 'electric', label: 'электрический', sanctioned: true }
];

export const COUNTRIES = {
    JP: {
        currency: 'JPY',
        name: 'Япония',
        commission: 50000,
        sanctioned: false,
        shippingCosts: {
            amount: 180000,
            currency: 'JPY'
        }
    },
    JP_SANCTIONED: {
        currency: 'JPY',
        name: 'Япония (санкционная)',
        commission: 100000,
        sanctioned: true,
        shippingCosts: {
            amount: 0,
            currency: 'USD'
        }
    },
    KR: {
        currency: 'KRW',
        name: 'Корея',
        commission: 75000,
        shippingCosts: {
            amount: 2500000,
            currency: 'KRW'
        }
    },
    CN: {
        currency: 'CNY',
        name: 'Китай',
        commission: 75000,
        shippingCosts: {
            amount: 17000,
            currency: 'CNY'
        }
    }
};

export const SANCTIONED_JP_SHIPPING = [
    { priceRange: [0, 999999], fob: 0, freight: 2800 },
    { priceRange: [1000000, 1999999], fob: 0, freight: 3200 },
    { priceRange: [2000000, 2999999], fob: 0, freight: 3400 },
    { priceRange: [3000000, 3999999], fob: 0, freight: 3600 },
    { priceRange: [4000000, 4999999], fob: 0, freight: 3800 },
    { priceRange: [5000000, 5999999], fob: 0, freight: 4000 },
    { priceRange: [6000000, 6999999], fob: 0, freight: 4200 },
    { priceRange: [7000000, 7999999], fob: 0, freight: 4400 },
    { priceRange: [8000000, 8999999], fob: 0, freight: 4600 },
    { priceRange: [9000000, 9999999], fob: 0, freight: 4800 }
];

export const BROKER_FEE = 90000;