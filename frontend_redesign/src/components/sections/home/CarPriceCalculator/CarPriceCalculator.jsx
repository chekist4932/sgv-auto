
import React, { useCallback } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField, StyledInput, StyledSelect } from '~/components/ui/Form/form';
import { RadioGroup } from '~/components/ui/Form/RadioGroup'
import { Button } from '~/components/ui/Button';
import { CustomCheckbox } from '~/components/ui/Form/Checkbox';
import { CalculationResult } from './CalculationResult';
import { SanctionedWarning } from './SanctionedWarning';

import { ENGINE_TYPES, COUNTRIES } from '~/lib/calculator/constants';
import { useCustomsCalculator } from '~/hooks/useCustomsCalculator';

import AlertIcon from '~/assets/images/calculator/Alert.png';


const schema = z.object({
    country: z.string(),
    price: z.string().min(1, "Введите стоимость"),
    engineType: z.string(),
    engineVolume: z.string().min(1, "Введите объем"),
    enginePower: z.string().min(1, "Введите мощность в л.с."),
    carAge: z.string(),
    name: z.string().min(2, "Введите имя"),
    phone: z.string().min(10, "Введите номер телефона"),
    dataAgreement: z.boolean().refine(val => val === true, "Необходимо согласие"),
    privacyPolicy: z.boolean().refine(val => val === true, "Необходимо согласие"),
});



export const CarPriceCalculator = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            engineType: "petrol",
            privacyPolicy: true,
        },
    });

    const country = watch('country');
    const engineType = watch('engineType');
    const engineVolume = watch('engineVolume');
    const enginePower = watch('enginePower');

    const { rates, result, showSanctionedWarning, calculate } = useCustomsCalculator({
        country,
        engineType,
        engineVolume,
        enginePower,
        setValue,
    });

    const onSubmit = useCallback((data) => {
        calculate(data);
    }, [calculate]);

    const scrollToContactForm = useCallback(() => {
        const contactForm = document.getElementById('consultation');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
        }
    }, [])


    return (
        <section id='calculator' className="w-full bg-[#0C0E15] py-20">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="bg-[#11131B] p-12 lg:p-16 rounded-[30px]">
                    <h2 className="text-4xl font-semibold text-white text-center mb-12">
                        Калькулятор стоимости автомобиля
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Левая колонка */}
                            <div className="lg:col-span-1 flex flex-col gap-4">
                                <FormField label="Страна" error={errors.country}>
                                    <StyledSelect {...register("country")} >
                                        {Object.entries(COUNTRIES).map(([code, info]) => (
                                            <option key={code} value={code}>{info.name}</option>
                                        ))}
                                    </StyledSelect>
                                </FormField>
                                <FormField label={`Стоимость автомобиля (${COUNTRIES[country]?.currency})`} error={errors.price}>
                                    <StyledInput placeholder="Введите стоимость" {...register("price")} />
                                </FormField>
                                <FormField label={`Мощность автомобиля в л.с.`} error={errors.price}>
                                    <StyledInput placeholder="Например: 160" {...register("enginePower")} />
                                </FormField>
                                <FormField label="Тип двигателя">
                                    <RadioGroup
                                        name="engineType"
                                        engTypes={ENGINE_TYPES}
                                        selectedValue={engineType}
                                        onChange={(e) => setValue('engineType', e.target.value, { shouldValidate: true })}
                                    />
                                </FormField>
                            </div>

                            {/* Центральная колонка */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <FormField label="Объем двигателя (куб. см)" error={errors.engineVolume}>
                                    <StyledInput placeholder="Например: 2000" {...register("engineVolume")} />
                                </FormField>
                                <FormField label="Возраст автомобиля" error={errors.carAge}>
                                    <StyledSelect {...register("carAge")}>
                                        <option value="new">Младше 3 лет</option>
                                        <option value="medium">3-5 лет</option>
                                        <option value="old">Старше 5 лет</option>
                                    </StyledSelect>
                                </FormField>
                                <FormField label="Ваше имя" error={errors.name}>
                                    <StyledInput placeholder="Введите ваше имя" {...register("name")} />
                                </FormField>
                                <FormField label="Ваш номер телефона" error={errors.phone}>
                                    <StyledInput placeholder="+7 (___) ___-__-__" {...register("phone")} />
                                </FormField>
                            </div>

                            {/* Правая колонка */}
                            <div className="lg:col-span-1 bg-[#0C0E15] rounded-3xl flex flex-col p-6 text-center">
                                <img src={AlertIcon} alt="Внимание" className="w-24 h-24 mx-auto mb-4" />
                                <p className="text-white/80 text-sm mb-4">
                                    Для получения точной стоимости и актуальных условий доставки, пожалуйста, заполните все поля и отправьте заявку
                                </p>
                                <p className="text-white text-sm font-semibold">
                                    Менеджер свяжется в ближайшее время
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-8 gap-y-4">
                                <CustomCheckbox
                                    id="privacyPolicy"
                                    label={
                                        <>
                                            Соглашаюсь с{" "}
                                            <a
                                                href="/docs/privacy-policy.pdf"
                                                target="_blank"
                                                className="underline hover:text-primary-red"
                                            >
                                                политикой в отношении персональных данных
                                            </a>
                                        </>
                                    }
                                    {...register("privacyPolicy")}
                                    error={errors.privacyPolicy}
                                />
                                <CustomCheckbox
                                    id="dataAgreement"
                                    label={
                                        <>
                                            Ознакомлен с
                                            <a
                                                href="/docs/user-agreement.pdf"
                                                target="_blank"
                                                className="underline hover:text-primary-red"
                                            >
                                                политикой конфиденциальности
                                            </a>
                                        </>
                                    }
                                    {...register("dataAgreement")}
                                    error={errors.dataAgreement}
                                />
                            </div>
                            <Button type="submit" variant="primary-red" size="lg">
                                Отправить запрос
                            </Button>
                        </div>
                    </form>
                    <div className='h-12 my-4'>
                        {showSanctionedWarning && (
                            <SanctionedWarning />
                        )}
                    </div>

                    {result && (
                        <CalculationResult result={result} country={country} onScroll={scrollToContactForm} />
                    )}
                </div>
            </div>
        </section>
    );
};