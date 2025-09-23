import React from "react";

export const RadioGroup = ({ engTypes, name, selectedValue, onChange }) => (
    <div className="flex flex-col gap-2">
        {engTypes.map((engType) => (
            <label
                key={engType.id}
                className="flex items-center gap-1 cursor-pointer text-sm text-white"
            >
                <input
                    type="radio"
                    name={name}
                    value={engType.id}
                    checked={selectedValue === engType.id}
                    onChange={onChange}
                    className={`
            peer
            h-4 w-4 rounded-full border-2 border-white/20
            appearance-none cursor-pointer
            bg-black
            hover:border-primary-red/50
            checked:border-primary-red checked:bg-primary-red
            relative transition-colors duration-200
            after:content-[''] after:absolute after:inset-1
            after:rounded-full after:bg-white after:scale-0
            checked:after:scale-100
            after:transition-transform after:duration-200
          `}
                />
                <span className="ml-2 text-white">{engType.label}</span>
            </label>
        ))}
    </div>
);

