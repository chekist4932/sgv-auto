import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { Button } from "../Button";
import { CustomCheckbox } from "./Checkbox";
import { StyledInput } from "./form";
import { SuccessMessage } from "./form";
import { Spinner } from "../Spinner";

import { API_URL } from "~/config";




const schema = z.object({
    name: z.string().min(2, "Введите ваше имя"),
    phone: z
        .string()
        .min(10, "Введите корректный номер телефона")
        .regex(/^[0-9+\s()-]+$/, "Некорректный формат номера"),
    budget: z.string().min(1, "Укажите ваш бюджет"),
    city: z.string().min(2, "Укажите ваш город"),
    contactMethod: z.enum(["whatsapp", "telegram", "phone"], {
        required_error: "Выберите способ связи",
    }),
    privacy: z
        .boolean()
        .refine((val) => val === true, "Вы должны согласиться с политикой конфиденциальности"),
    data: z
        .boolean()
        .refine((val) => val === true, "Вы должны согласиться с политикой обработки данных"),
});


export const RequestForm = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            contactMethod: "telegram",
            data: true,
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${API_URL}/notification/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        name: data.name,
                        phone: data.phone,
                        budget: data.budget,
                        city: data.city,
                        contactMethod: data.contactMethod,
                    }
                ),
            });

            if (!response.ok) throw new Error("Ошибка сервера");

            setSuccess(true);
            reset();
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        } catch (err) {
            setError("Ошибка при отправке. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSuccess(false);
        setError(null);
    }, [isOpen]);


    return (
        <>
            {success ? (
                <SuccessMessage />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow gap-4">
                    <h2 className="text-3xl font-bold text-center mb-2">
                        Задумались об авто? <br /> Давайте поможем выбрать
                    </h2>

                    <StyledInput type="text" placeholder="Имя" {...register("name")} error={errors.name} />
                    <StyledInput type="tel" placeholder="Номер телефона" {...register("phone")} error={errors.phone} />
                    <StyledInput type="text" placeholder="Бюджет" {...register("budget")} error={errors.budget} />
                    <StyledInput type="text" placeholder="Город" {...register("city")} error={errors.city} />

                    <div>
                        <p className="text-base font-medium mb-2 text-center text-white">
                            Предпочитаемый способ связи
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {["whatsapp", "telegram", "phone"].map((method) => (
                                <label key={method} className="relative flex cursor-pointer ">
                                    <input
                                        type="radio"
                                        value={method}
                                        {...register("contactMethod")}
                                        className="peer sr-only"
                                    />

                                    <div className="flex items-center justify-center w-full py-2 
                                    rounded-lg border border-white/20 text-white hover:border-primary-red/50
                                     peer-checked:border-primary-red peer-checked:text-primary-red peer-checked:bg-primary-red/10 transition-colors">
                                        {method === "phone"
                                            ? "Звонок"
                                            : method.charAt(0).toUpperCase() + method.slice(1)}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <CustomCheckbox
                            id="privacy"
                            label={
                                <>
                                    Ознакомлен с{" "}
                                    <a
                                        href="/docs/user-agreement.pdf"
                                        target="_blank"
                                        className="underline hover:text-primary-red"
                                    >
                                        политикой конфиденциальности
                                    </a>
                                </>
                            }
                            error={errors.privacy}
                            {...register("privacy")}
                        />
                        <CustomCheckbox
                            id="data"
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
                            error={errors.data}
                            {...register("data")}
                        />
                    </div>
                    <div className="grid grid-flow-row sm:grid-flow-col auto-cols-fr w-[246px] mx-auto">
                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary-red"
                            size="lg"
                            className="flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    Отправка... <Spinner />
                                </>
                            ) : (
                                <>
                                    Отправить заявку
                                </>
                            )}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
            )}
        </>
    );
};
