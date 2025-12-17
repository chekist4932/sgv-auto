// src/components/calculator/CalculationResult.jsx
import { Button } from "~/components/ui/Button";
import { COUNTRIES } from "~/lib/calculator/constants";

export const CalculationResult = ({ result, country, onScroll }) => (
    <div className="mt-2 space-y-3 p-4 bg-[#11131B] text-white rounded-lg">
        <h4 className="font-semibold">Расчет полной стоимости:</h4>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span>Стоимость автомобиля:</span>
                <span className="font-medium">
                    {result.carCostOriginal.toLocaleString()} {COUNTRIES[country].currency} ({result.carCostRub.toLocaleString()} ₽)
                </span>
            </div>
            <div className="flex justify-between">
                <span>Стоимость доставки:</span>
                <span className="font-medium">
                    {result.shippingCostOriginal.amount.toLocaleString()} {result.shippingCostOriginal.currency} ({result.shippingCostRub.toLocaleString()} ₽)
                </span>
            </div>
            <div className="flex justify-between">
                <span>Таможенная пошлина:</span>
                <span className="font-medium">{result.customsDuty.toLocaleString()} ₽</span>
            </div>
            {/* <div className="flex justify-between">
                <span>Утилизационный сбор:</span>
                <span className="font-medium">{result.recyclingFee.toLocaleString()} ₽</span>
            </div> */}
            <div className="flex justify-between">
                <span>Таможенный сбор:</span>
                <span className="font-medium">{result.customsFee.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
                <span>Брокерские услуги:</span>
                <span className="font-medium">{result.brokerFee.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
                <span>Комиссия компании:</span>
                <span className="font-medium">{result.commission.toLocaleString()} ₽</span>
            </div>
            {/* <div className="flex justify-between">
                <span>Утилизационный сбор (перепродажа):</span>
                <span className="font-medium">{result.commercialRecyclingFee.toLocaleString()} ₽</span>
            </div> */}
            <div className="flex justify-between">
                <span>Утилизационный сбор:</span>
                <span className="font-medium">{result.recyclingFee.toLocaleString()} ₽</span>
            </div>
            <div className="pt-2 border-t border-gray-600">
                <div className="flex justify-between font-semibold">
                    <span>Итого с утилизационным сбором:</span>
                    <span className="text-red-500">{result.total.toLocaleString()} ₽</span>
                </div>
                {/* <div className="flex justify-between font-semibold">
                    <span>Итого с утилизационным сбором (перепродажа):</span>
                    <span>{result.totalWithCommercial.toLocaleString()} ₽</span>
                </div> */}
            </div>
        </div>
        {/* <div className="flex justify-center">
            <Button onClick={onScroll} variant="primary-red" size="lg">
                Получить точный расчет у менеджера
            </Button>
        </div> */}
    </div>
);
