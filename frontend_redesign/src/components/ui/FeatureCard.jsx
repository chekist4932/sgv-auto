// src/components/ui/FeatureCard.jsx
import * as React from "react";
import { cn } from "~/lib/utils";

import lightningIcon from '~/assets/icons/Icon-lightning.svg'

const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
        `relative  w-full aspect-[278/164] p-5 rounded-[30px] bg-white/5 backdrop-blur-lg 
        border border-primary-red/40 shadow flex flex-col justify-between select-none 
        transition-transform duration-300 ease-in-out hover:scale-105`,
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export const FeatureCard = ({ title, description, className }) => {
    return (
        <Card className={className}>
            {/* Иконка в углу */}
            <img
                src={lightningIcon}
                alt=""
                className="absolute top-1 left-1 "
            />


            <div className="flex flex-col items-end justify-center h-full pr-2">
                <h3 className="font-semibold text-2xl text-primary-red leading-tight text-right">
                    {/* {title.split(" ").map((word, index) => ( */}
                    {title.map((word, index) => (
                        <div key={index}>{word}</div>
                    ))}
                </h3>
                <p className="text-base text-white text-right">
                    {description.map((line, index) => (
                        <span key={index} className="block">{line}</span>
                    ))}
                </p>
            </div>
        </Card>
    );
};
