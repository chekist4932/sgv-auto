import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Euro, Pen as Yen } from 'lucide-react';

export default function CurrencyRates() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
                const { USD, EUR, CNY, JPY, KRW } = response.data.Valute;
                setRates([USD, EUR, CNY, JPY, KRW]);
            } catch (error) {
                console.error('Error fetching rates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 3600000); // Update every hour
        return () => clearInterval(interval);
    }, []);

    const getIcon = (code) => {
        switch (code) {
            case 'USD':
                return <span className="w-5 h-5">USD</span>;
            case 'EUR':
                return <span className="w-5 h-5">EUR</span>;
            case 'CNY':
                return <span className="w-5 h-5">CNY</span>;
            case 'JPY':
                return <span className="w-5 h-5">JPY</span>;
            case 'KRW':
                return <span className="w-5 h-5">KRW</span>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Курсы валют ЦБ РФ
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {rates.map((rate) => (
                    <div
                        key={rate.CharCode}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                        <div className="text-red-500">
                            {getIcon(rate.CharCode)}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {rate.Value.toFixed(2)} ₽
                            </div>
                            <div
                                className={`text-xs ${rate.Value > rate.Previous
                                        ? 'text-green-500'
                                        : rate.Value < rate.Previous
                                            ? 'text-red-500'
                                            : 'text-gray-500'
                                    }`}
                            >
                                {rate.Value > rate.Previous
                                    ? '↑'
                                    : rate.Value < rate.Previous
                                        ? '↓'
                                        : '='}
                                {Math.abs(rate.Value - rate.Previous).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}