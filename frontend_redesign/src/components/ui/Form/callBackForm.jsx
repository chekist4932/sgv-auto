// src/components/ui/CallbackModal.jsx

import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../Button";
import { CustomCheckbox } from "./Checkbox";
import { Spinner } from "../Spinner";


import {
    FormField,
    StyledInput,
    StyledTextArea
} from "./form";

import { SuccessMessage } from "./form";

import { API_URL } from "../../../config";

// --- Схема валидации ---
const schema = z.object({
    name: z.string().min(2, "Пожалуйста, введите ваше имя"),
    phone: z
        .string()
        .min(10, "Введите корректный номер телефона")
        .regex(/^[0-9+\s()-]+$/, "Некорректный формат номера"),
    comment: z.string().optional(),
    privacy: z
        .boolean()
        .refine((val) => val === true, "Вы должны согласиться с политикой конфиденциальности"),
    data: z
        .boolean()
        .refine((val) => val === true, "Вы должны согласиться с политикой обработки данных"),
});


// --- Основная модалка ---
export const CallbackForm = ({ isOpen, onClose }) => {
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
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${API_URL}/notification/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone,
                    comment: data.comment,
                }),
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-center mb-2">Заказать звонок</h2>

                    <StyledInput type="text" placeholder="Имя" {...register("name")} error={errors.name} />
                    <StyledInput type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Номер телефона"
                        error={errors.phone}
                        {...register("phone")} />
                    <StyledTextArea rows="3" placeholder="Комментарий" {...register("comment")} />

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
                    <Button
                        type="submit"
                        disabled={loading}
                        variant="primary-red"
                        size="lg"
                        className="flex items-center justify-center gap-2 w-1/2 mx-auto "
                    >
                        {loading ? (
                            <>
                                Отправка... <Spinner />
                            </>
                        ) : (
                            "Перезвоните мне"
                        )}
                    </Button>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
            )}
        </>
    );
};
