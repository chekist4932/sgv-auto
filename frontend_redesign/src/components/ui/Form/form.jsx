import React from "react";

import { cn } from "~/lib/utils";

import arrowDownIcon from '~/assets/icons/arrow-down.svg';


const inputBaseStyles = `
  w-full bg-[#11131B] border border-white/20 rounded-xl px-4 py-2 text-white
  placeholder:text-white/80
  focus:ring-2 focus:ring-primary-red focus:border-transparent
  outline-none caret-white transition-colors appearance-none
  hover:border-primary-red/50
`;

const selectExtraStyles = `
  pr-10 cursor-pointer
  transition duration-200 ease-in-out
`;


export const FormField = ({children, label = false }) => (
    <div className="px-4 flex flex-col  gap-2">
        {label && (<label className="text-sm font-medium text-white">{label}</label>)}
        {children}
    </div>
);


export const StyledInput = React.forwardRef(({ error, ...props }, ref) => (
    <input
        ref={ref}
        {...props}
        // Условно добавляем классы для ошибки
        className={cn(
            inputBaseStyles,
            error
                ? "border-red-500 focus:border-transparent" // Красная рамка, если есть ошибка
                : "border-white/20 hover:border-primary-red/50 focus:border-transparent" // Стандартное поведение
        )}
    />
));


export const StyledTextArea = React.forwardRef((props, ref) => (
    <textarea ref={ref} {...props} className={`${inputBaseStyles} resize-none`} />
));

export const StyledSelect = React.forwardRef((props, ref) => (
    <div className="relative w-full">
        <select
            ref={ref}
            {...props}
            className={`${inputBaseStyles} ${selectExtraStyles}`}
        />
        <img
            src={arrowDownIcon}
            alt=""
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4 transition-transform duration-200"
        />
    </div>
));


export const SuccessMessage = () => (
    <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Спасибо!</h2>
        <p className="text-white/80">Ваша заявка отправлена. Мы скоро с вами свяжемся.</p>
    </div>
);