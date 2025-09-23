import React from "react";

import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

export const CustomCheckbox = React.forwardRef(({ id, label, error, ...props }, ref) => (
    <div className="flex flex-col">
        <label
            htmlFor={id}
            className="flex items-center gap-3 cursor-pointer text-sm text-white"
        >
            <div className="relative flex items-center justify-center w-5 h-5">
                <input
                    id={id}
                    type="checkbox"
                    className="absolute w-full h-full opacity-0 cursor-pointer peer"
                    ref={ref}
                    {...props}
                />
                <div
                    className={cn(
                        "w-full h-full border-2 rounded-sm bg-transparent flex items-center justify-center transition-colors",
                        error ? "border-red-500" : "border-white/30", // <--- Вот оно
                        "peer-checked:bg-primary-red peer-checked:border-primary-red"
                    )}
                />
                <Check
                    className="absolute w-4 h-4 text-white opacity-0 scale-75
                     peer-checked:opacity-100 peer-checked:scale-100
                     transition-all duration-200"
                />
            </div>
            <span>{label}</span>
        </label>
    </div>
));