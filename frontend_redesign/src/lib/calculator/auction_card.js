
import { ENGINE_TYPES, COUNTRIES, BROKER_FEE } from '~/lib/calculator/constants';
import { getRecyclingFee, getCustomsFee, calculateShippingCost, calculateCustomsDuty } from '~/lib/calculator/utils';


// Вспомогательная функция для определения категории возраста
const getAgeCategory = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(year);
    if (age < 3) return 'new';
    if (age <= 5) return 'medium';
    return 'old';
};

// Маппинг стран аукциона на ключи вашего калькулятора
const countryMapping = {
    'china': 'CN',
    'korea': 'KR',
    'japan': 'JP',
    // добавьте другие соответствия
};

/**
 * Главная функция расчета итоговой стоимости для лота
 */
export const calculateFullCarPrice = (car, rates) => {
    if (!rates || Object.keys(rates).length === 0 || !car.FINISH) return null;

    const calcCountry = countryMapping[car.COUNTRY_AUCTION] || 'CN';

    const data = {
        price: parseFloat(car.FINISH),
        engineVolume: parseFloat(car.ENG_V) || 0,
        enginePower: parseFloat(car.PW) || 0,
        carAge: getAgeCategory(car.YEAR),
        country: calcCountry,
        engineType: 'petrol', // По умолчанию бензин, если в API нет точного типа
    };

    // Импортируем ваши функции из калькулятора
    const priceNum = data.price;
    const volumeNum = data.engineVolume;

    const carCostRub = priceNum * rates[COUNTRIES[data.country].currency];
    const carCostEur = carCostRub / rates.EUR;

    const shipping = calculateShippingCost(COUNTRIES[data.country], priceNum, rates);
    const customsDutyEur = calculateCustomsDuty(carCostEur, volumeNum, data.carAge);
    const customsDutyRub = customsDutyEur * rates.EUR;
    const customsFee = getCustomsFee(carCostRub);
    const commission = COUNTRIES[data.country].commission;
    const recyclingFee = getRecyclingFee(volumeNum, data.carAge, data.enginePower);

    const total = carCostRub + shipping.costRub + customsDutyRub + customsFee + BROKER_FEE + commission + recyclingFee;

    return Math.round(total);
};