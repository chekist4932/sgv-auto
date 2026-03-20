import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SmartLink } from "./SmartLink";
import { ChevronDown } from "lucide-react";

export const NavItem = ({
    item,
    className = "",
    onClick,
    isMobile = false,
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // закрытие при клике вне (desktop)
    useEffect(() => {
        if (isMobile) return;

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile]);

    // главный клик
    const handleClick = (e) => {
        if (item.submenu) {
            e.stopPropagation();
            setOpen((prev) => !prev);
            return;
        }

        if (item.type === "route") {
            navigate(item.path);
            onClick?.();
        }
    };

    return (
        <div ref={ref} className={`relative ${className}`}>

            {item.submenu ? (
                <div
                    onClick={handleClick}
                    className="cursor-pointer flex items-center gap-2"
                >
                    <span>{item.label}</span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </div>
            ) : item.type === "route" ? (
                <div
                    onClick={handleClick}
                    className="cursor-pointer"
                >
                    {item.label}
                </div>
            ) : (
                <SmartLink
                    to={item.target}
                    className="cursor-pointer"
                    onClick={onClick}
                >
                    {item.label}
                </SmartLink>
            )}

            {isMobile && item.submenu && open && (
                // Mobile submenu
                <div className="pl-4 mt-2 flex flex-col gap-2">
                    {item.submenu.map((subItem) =>
                        subItem.type === "route" ? (
                            <div
                                key={subItem.label}
                                onClick={() => {
                                    navigate(subItem.path);
                                    onClick?.();
                                }}
                                className="text-sm text-white cursor-pointer"
                            >
                                {subItem.label}
                            </div>
                        ) : (
                            <SmartLink
                                key={subItem.label}
                                to={subItem.target}
                                className="text-sm text-white cursor-pointer"
                                onClick={onClick}
                            >
                                {subItem.label}
                            </SmartLink>
                        )
                    )}
                </div>
            )}



            {!isMobile && item.submenu && open && (
                // Desktop submenu
                <div className="absolute top-full left-0 w-56 bg-[#0C0E15] rounded-sm shadow-lg z-50">
                    {item.submenu.map((subItem) =>
                        subItem.type === "route" ? (
                            <div
                                key={subItem.label}
                                onClick={() => {
                                    navigate(subItem.path);
                                    setOpen(false);
                                    onClick?.();
                                }}
                                className="px-3 py-2 text-sm text-white hover:bg-white/10 cursor-pointer transition"
                            >
                                {subItem.label}
                            </div>
                        ) : (
                            <SmartLink
                                key={subItem.label}
                                to={subItem.target}
                                className="block px-3 py-2 text-sm text-white hover:bg-white/10 transition"
                                onClick={() => {
                                    setOpen(false);
                                    onClick?.();
                                }}
                            >
                                {subItem.label}
                            </SmartLink>
                        )
                    )}
                </div>
            )}
        </div>
    );
};