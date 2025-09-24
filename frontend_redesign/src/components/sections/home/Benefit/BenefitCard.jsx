// src/components/ui/BenefitCard.jsx

import React from "react";

const colStartClasses = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
};

const rowStartClasses = {
  1: "row-start-1",
  2: "row-start-2",
};

const textStyles = {
  title: "text-2xl font-semibold text-white leading-tight select-none",
  subtitle: "text-base font-normal text-white leading-tight select-none",
};

export const BenefitCard = ({ title, subtitle, col, row, variant = "title" }) => {
  return (
    <div
      className={`
        w-[290px] min-h-[115px] p-2 rounded-[30px] text-center
        bg-[#11131B] 
        flex flex-col items-center justify-center
        transition-transform duration-300 ease-in-out hover:scale-105
      `}
    >
      <h3 className={textStyles[variant]}>
        {Array.isArray(title) ? title.map((line, idx) => (
          <span key={idx} className="block">{line}</span>
        )) : title}
      </h3>
      <p className={`mt-1 ${variant === "subtitle" ? textStyles.title : textStyles.subtitle}`}>
        {subtitle}
      </p>
    </div>
  );
};