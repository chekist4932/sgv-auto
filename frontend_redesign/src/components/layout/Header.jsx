// src/components/layout/Header.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { X, Menu, Phone } from "lucide-react";

import { Logo } from "../ui/branding/Logo";
import { Button } from "../ui/Button";
import { SocialChip } from "../ui/SocialChip";
import { SmartLink } from '../ui/SmartLink';

import { scrollConfig } from '~/config/scroll';

import arrowDownIcon from '~/assets/icons/arrow-down.svg';
import plusIcon from '~/assets/images/hero/icon-plus.svg';
import tgIcon from '~/assets/icons/tg.svg';

const navLinks = [
    {
        title: "Каталог",
        target: 'cars',
        // hasDropdown: true,
        // submenu: [
        //     { title: "Автомобили из Японии", target: "cars" },
        //     { title: "Автомобили из Китая", target: "cars" },
        //     { title: "Автомобили из Кореи", target: "cars" },
        // ],
    },
    { title: "О нас", target: "about" },
    { title: "Новости", target: "news" },
    // { title: "Контакты", target: "footer" },
];

export const Header = ({ onOpenModalCallBack, navIsActive }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Закрываем меню при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    const scrollToTop = useCallback(() => {
        scroll.scrollToTop(scrollConfig);
    }, []);


    return (
        <header
            className={
                `fixed top-0 z-50 w-full transition-colors duration-300 
                ${isScrolled ? "bg-[#0C0E15] shadow-lg" : "bg-transparent"}`
            }
        >
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="h-20 flex items-center justify-between">
                    {/* Лого */}
                    <div className="shrink-0 h-8 cursor-pointer">
                        <SmartLink>
                            <Logo />
                        </SmartLink>
                    </div>

                    {/* Десктопное меню */}
                    {navIsActive && (
                        <nav className="hidden lg:flex items-center select-none">
                            {navLinks.map((item, i) => (
                                <React.Fragment key={item.title}>
                                    <div key={item.title} className="relative group">
                                        <SmartLink
                                            to={item.target || (item.submenu && item.submenu[0].target)}
                                            className="flex items-center gap-2 px-4 h-20 hover:opacity-80 transition-opacity cursor-pointer"
                                        >
                                            {item.title}
                                            {item.hasDropdown && (
                                                <img
                                                    src={arrowDownIcon}
                                                    alt="arrow down"
                                                    className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                                                />
                                            )}
                                        </SmartLink>
                                        {item.hasDropdown && (
                                            <div className="absolute top-full left-0 w-56 rounded-md shadow-lg
                                             bg-block-dark-blue opacity-0 invisible group-hover:opacity-100 
                                             group-hover:visible transition-all duration-200"
                                            >
                                                <div className="py-1">
                                                    {item.submenu.map((sub) => (
                                                        <SmartLink
                                                            key={sub.title}
                                                            to={sub.target}
                                                            className="block px-4 py-2 text-sm hover:bg-white/10"
                                                        >
                                                            {sub.title}
                                                        </SmartLink>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {i < navLinks.length - 1 && (
                                        <div className="w-px h-4 bg-white/40" />
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    )}

                    {/* Соцсети + кнопка обратного звонка */}
                    <div className="flex gap-2">
                        <div className="hidden md:flex items-center gap-4">
                            <div>
                                <div className="text-sm">Владивосток</div>
                                <a
                                    href="https://2gis.ru/vladivostok/search/ул. Русская 99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white/80 hover:text-white transition-colors"
                                >
                                    ул. Русская 99
                                </a>
                            </div>
                            <a
                                href="tel:+79140744300"
                                className="text-sm whitespace-nowrap hover:opacity-80 transition-opacity"
                            >
                                +7 (914) 074-43-00
                            </a>
                            <div className="flex items-center border-2 border-primary-red rounded-full shadow-lg overflow-hidden">
                                <div className="flex gap-2 pl-2 pr-2">
                                    <SocialChip name="whatsapp" />
                                    <SocialChip name="tg" />
                                </div>
                                <Button onClick={onOpenModalCallBack} className="w-[231px] ">
                                    Обратный звонок
                                </Button>
                            </div>
                        </div>


                        {/* Мобилка: кнопки + бургер */}
                        <div className="md:hidden flex items-center gap-2">
                            <div className="flex items-center gap-2 p-2 border-2 border-primary-red rounded-full shadow-lg">
                                <SocialChip name="whatsapp" />
                                <SocialChip name="tg" />
                                <Button onClick={onOpenModalCallBack} size="icon" variant="primary-red">
                                    <Phone className="w-5 h-5" />
                                </Button>
                            </div>

                        </div>
                        <div className="lg:hidden">
                            <Button
                                variant="primary-red"
                                size="md"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Мобильное меню (бургер) */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
                    <div
                        ref={menuRef}
                        className="bg-[#11131B] w-72 p-6 flex flex-col gap-4 h-full pl-8 pr-8"
                    >

                        <div className="flex justify-between items-center mb-6">
                            <div onClick={scrollToTop} className="shrink-0 h-8 cursor-pointer">
                                <Logo />
                            </div>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Навигация */}
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((item) => (
                                <div key={item.title} className="hover:opacity-80 transition-opacity cursor-pointer">
                                    <SmartLink to={item.target || (item.submenu && item.submenu[0].target)}>
                                        {item.title}
                                    </SmartLink>
                                    {item.submenu && (
                                        <div className="ml-4 mt-2 flex flex-col gap-1">
                                            {item.submenu.map((sub) => (
                                                <SmartLink
                                                    key={sub.title}
                                                    to={sub.target}
                                                    className="text-sm text-white/70 hover:text-white"
                                                >
                                                    {sub.title}
                                                </SmartLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button variant="primary-red" className="gap-4 w-full pl-2" onClick={onOpenModalCallBack}>
                                <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                    <img src={plusIcon} alt="plusIcon" className="w-5 h-5 scale-150" />
                                </span>
                                <span>Подобрать автомобиль</span>
                            </Button>


                            <Button asChild className="w-full">
                                <a href="https://t.me/SGVauto_tg" target="_blank" rel="noopener noreferrer" className="gap-2">
                                    <img src={tgIcon} alt="Telegram" className="w-5 h-5" />
                                    <span>Telegram-канал</span>
                                </a>
                            </Button>

                            {/* Контакты */}
                            <div className="mt-auto text-sm text-white/80">
                                <div>г. Владивосток</div>
                                <a
                                    href="https://2gis.ru/vladivostok/search/ул. Русская 99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:underline"
                                >
                                    ул. Русская 99
                                </a>
                                <a href="tel:+79140744300" className="block mt-2">
                                    +7 (914) 074-43-00
                                </a>
                                <a href="mailto:sgvautoimport@gmail.com" className="block mt-2">
                                    sgvautoimport@gmail.com
                                </a>
                                <div className="mt-4 text-xs">© 2025 SGV AUTO. Все права защищены.</div>
                            </div>

                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};
