// src/hooks/useCustomsCalculator.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENGINE_TYPES, COUNTRIES, BROKER_FEE } from '../lib/calculator/constants';
import { getRecyclingFee, getCustomsFee, calculateShippingCost, calculateCustomsDuty } from '../lib/calculator/utils';

// Наш хук принимает данные, за которыми нужно следить, и функцию для обновления формы
export const useCustomsCalculator = ({ country, engineType, engineVolume, enginePower, setValue }) => {
    // 1. Вся логика состояния переезжает сюда

    
    const [rates, setRates] = useState({});
    // const [result, setResult] = useState(null);
    const [showSanctionedWarning, setShowSanctionedWarning] = useState(false);

    // 2. Логика загрузки курсов валют
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
                const { EUR, JPY, KRW, CNY, USD } = response.data.Valute;
                setRates({
                    EUR: EUR.Value,
                    JPY: JPY.Value / JPY.Nominal,
                    KRW: KRW.Value / KRW.Nominal,
                    CNY: CNY.Value,
                    USD: USD.Value
                });
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        };
        fetchRates();
    }, []);

    // 3. Логика проверки на санкции
    useEffect(() => {
        const selectedEngineType = ENGINE_TYPES.find(t => t.id === engineType);
        const volume = parseFloat(engineVolume);

        if (country?.startsWith('JP')) {
            if (volume > 1900 || (selectedEngineType && selectedEngineType.sanctioned)) {
                if (country !== 'JP_SANCTIONED') setValue('country', 'JP_SANCTIONED');
                setShowSanctionedWarning(true);
            } else {
                if (country === 'JP_SANCTIONED') setValue('country', 'JP');
                setShowSanctionedWarning(false);
            }
        }
    }, [engineVolume, engineType, country, setValue]);

    // 4. Функция расчета, которая теперь является частью хука
    const calculate = (data) => {
        if (Object.keys(rates).length === 0) return null;
        
        const priceNum = parseFloat(data.price);
        const volumeNum = parseFloat(data.engineVolume);

        if (!priceNum || !volumeNum) return null;

        const carCostRub = priceNum * rates[COUNTRIES[data.country].currency];
        const carCostEur = carCostRub / rates.EUR;

        const shipping = calculateShippingCost(COUNTRIES[data.country], priceNum, rates);
        const customsDutyEur = calculateCustomsDuty(carCostEur, volumeNum, data.carAge);
        const customsDutyRub = customsDutyEur * rates.EUR;
        const customsFee = getCustomsFee(carCostRub);
        const commission = COUNTRIES[data.country].commission;
        const recyclingFee = getRecyclingFee(volumeNum, data.carAge, data.enginePower);
        const commercialRecyclingFee = getRecyclingFee(volumeNum, data.carAge, data.enginePower, false);

        const total = carCostRub + shipping.costRub + customsDutyRub + customsFee + BROKER_FEE + commission + recyclingFee;
        const totalWithCommercial = carCostRub + shipping.costRub + customsDutyRub + customsFee + BROKER_FEE + commission + commercialRecyclingFee;

        return {
            carCostRub,
            carCostOriginal: priceNum,
            shippingCostRub: shipping.costRub,
            shippingCostOriginal: shipping.originalCost,
            customsDuty: customsDutyRub,
            customsFee,
            brokerFee: BROKER_FEE,
            commission,
            recyclingFee,
            commercialRecyclingFee,
            total,
            totalWithCommercial,
            country: data.country,
        };
    };

    // 5. Хук возвращает все необходимое для рендеринга и вычислений
    return { rates, showSanctionedWarning, calculate };
    
};