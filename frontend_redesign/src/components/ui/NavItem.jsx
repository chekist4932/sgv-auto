// src/components/ui/NavItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { SmartLink } from "./SmartLink";

export const NavItem = ({
    item,
    className = "",
    onClick,
}) => {
    const navigate = useNavigate();

    if (item.type === "route") {
        return (
            <div
                onClick={() => {
                    navigate(item.path);
                    onClick?.();
                }}
                className={`cursor-pointer ${className}`}
            >
                {item.label}
            </div>
        );
    }

    return (
        <SmartLink
            to={item.target}
            className={`cursor-pointer ${className}`}
            onClick={onClick}
        >
            {item.label}
        </SmartLink>
    );
};