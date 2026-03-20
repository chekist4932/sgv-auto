// src\components\sections\catalog\CatalogFilters.jsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '~/components/ui/Button';
import { StyledInput, StyledSelect } from '~/components/ui/Form/form';

import {PRIV_TYPES, KPP_TYPES} from '~/lib/catalog_page/constants'

import { API_URL } from "~/config";



const optionalString = z
    .string()
    .optional()

const schema = z.object({
    marka_name: optionalString,
    model_name: optionalString,

    year_gte: optionalString,
    year_lte: optionalString,

    mileage_gte: optionalString,
    mileage_lte: optionalString,

    eng_v_gte: optionalString,
    eng_v_lte: optionalString,

    pw_gte: optionalString,
    pw_lte: optionalString,

    priv: optionalString,
    kpp: optionalString,

    finish_gte: optionalString,
    finish_lte: optionalString,
});

export const CatalogFilters = ({ country, onSubmit }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });


    // состояния
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    // следим за выбранной маркой
    const selectedBrand = watch("marka_name");

    // 1. Загружаем марки
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch(`${API_URL}/catalog/${country}/brands`); // 👈 твой endpoint
                const data = await res.json();
                const sortedBrands = [...data].sort((a, b) =>
                    a.MARKA_NAME.localeCompare(b.MARKA_NAME)
                );

                setBrands(sortedBrands);
            } catch (e) {
                console.error(e);
            }
        };

        fetchBrands();
    }, []);

    //  2. Загружаем модели при выборе марки
    useEffect(() => {
        if (!selectedBrand) {
            setModels([]);
            setValue("model_name", ""); // сброс модели
            return;
        }

        const fetchModels = async () => {
            try {
                const res = await fetch(`${API_URL}/catalog/${country}/models/${selectedBrand}`);
                const data = await res.json();
                const sortedModels = [...data].sort((a, b) =>
                    a.MODEL_NAME.localeCompare(b.MODEL_NAME)
                );
                setModels(sortedModels);
                setValue("model_name", ""); // сброс при смене марки
            } catch (e) {
                console.error(e);
            }
        };

        fetchModels();
    }, [selectedBrand, setValue]);

    const submitHandler = (data) => {
        const cleaned = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== "" && v !== undefined)
        );

        onSubmit(cleaned);
    };

    const resetFilters = () => {
        reset(); // Сбрасывает все поля к defaultValues
        onSubmit({}); // Отправляем пустые фильтры
    };

    const row_gap = 'grid grid-cols-3 gap-4'
    const col_gap = 'grid grid-cols-2 gap-2'

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mb-8 space-y-2">

            {/* 1 строка */}
            <div className={row_gap}>
                <StyledSelect {...register("marka_name")}>
                    <option value="">Марка</option>
                    {brands.map((brand) => (
                        <option key={brand.MARKA_NAME} value={brand.MARKA_NAME}>
                            {brand.MARKA_NAME}
                        </option>
                    ))}
                </StyledSelect>

                {/* Модель */}
                <StyledSelect {...register("model_name")} disabled={!selectedBrand}>
                    <option value="">Модель</option>
                    {models.map((model) => (
                        <option key={model.MODEL_NAME} value={model.MODEL_NAME}>
                            {model.MODEL_NAME}
                        </option>
                    ))}
                </StyledSelect>

                <div className={col_gap}>
                    <StyledInput placeholder="Год от" {...register("year_gte")} />
                    <StyledInput placeholder="Год до" {...register("year_lte")} />
                </div>
            </div>

            {/* 2 строка */}
            <div className={row_gap}>
                <div className={col_gap}>
                    <StyledInput placeholder="Пробег от" {...register("mileage_gte")} />
                    <StyledInput placeholder="Пробег до" {...register("mileage_lte")} />
                </div>

                <div className={col_gap}>
                    <StyledInput placeholder="Объем от" {...register("eng_v_gte")} />
                    <StyledInput placeholder="Объем до" {...register("eng_v_lte")} />
                </div>

                <div className={col_gap}>
                    <StyledInput placeholder="Мощность от" {...register("pw_gte")} />
                    <StyledInput placeholder="Мощность до" {...register("pw_lte")} />
                </div>
            </div>

            {/* 3 строка */}
            <div className={row_gap}>
                <StyledSelect {...register("priv")} >
                    <option value="">Привод</option>
                    {PRIV_TYPES.map((item) => (
                        <option key={item.code} value={item.code}>{item.info}</option>
                    ))}
                </StyledSelect>
                <StyledSelect {...register("kpp")} >
                    <option value="">Коробка</option>
                    {Object.entries(KPP_TYPES).map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </StyledSelect>

                <div className={col_gap}>
                    <StyledInput placeholder="Цена от" {...register("finish_gte")} />
                    <StyledInput placeholder="Цена до" {...register("finish_lte")} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 pt-6">
                <Button
                    type="submit"
                    variant="primary-red"
                    size="lg"
                    className="w-full sm:w-1/4"
                >
                    Показать
                </Button>
                <Button
                    type="button"
                    onClick={resetFilters}
                    variant="primary-red"
                    size="lg"
                    className="w-full sm:w-1/4"
                >
                    Сбросить все
                </Button>
            </div>

        </form>
    );
};


