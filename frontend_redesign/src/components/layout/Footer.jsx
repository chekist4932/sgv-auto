import React, { useCallback } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import { Button } from '../ui/Button';
import { SocialChip } from '../ui/SocialChip';
import { Logo } from '../ui/branding/Logo';
import { SmartLink } from '../ui/SmartLink';

import { scrollConfig } from '~/config/scroll';

import tgIcon from '~/assets/icons/tg.svg';


const navigationItems = [
    { label: "Главная", target: "top" },
    { label: "Каталог", target: "cars" },
    { label: "О нас", target: "about" },
    { label: "Новости", target: "news" },
    // { label: "Контакты", target: "footer" },
];


const legalLinks = [
    { label: "Политика конфиденциальности", href: "/docs/privacy-policy.pdf" },
];




export const Footer = ({ onOpenModalCallBack }) => {

    const scrollToTop = useCallback(() => {
        scroll.scrollToTop(scrollConfig);
    }, []);

    return (
        <footer id='footer' className="w-full bg-[#0C0E15] text-white-text border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto max-w-[1240px] px-4">


                <div className="flex justify-between items-baseline gap-8 flex-wrap">
                    <div className="flex flex-col gap-4 max-w-[260px]">
                        <div className="h-8 cursor-pointer">
                            <SmartLink>
                                <Logo />
                            </SmartLink>
                        </div>
                        <p className="text-sm text-white font-semibold">
                            Профессиональный импорт автомобилей из Азии с полным циклом услуг
                        </p>
                    </div>
                    <nav className="flex flex-col gap-3">
                        {navigationItems.map((item, index) => {
                            return (
                                <SmartLink
                                    key={item.label}
                                    to={item.target}
                                    className={`text-sm hover:opacity-80 transition-opacity cursor-pointer ${index === 0 ? "font-semibold" : "font-normal"}`}
                                >
                                    {item.label}
                                </SmartLink>
                            );
                        })}
                    </nav>


                    <div className="flex flex-col gap-3 text-sm">
                        <h3 className="font-semibold whitespace-nowrap">Контакты</h3>
                        <div className="flex flex-col">
                            <address className="not-italic">г. Владивосток</address>
                            <address className="not-italic text-xs text-white/80">ул. Русская 99</address>
                        </div>
                        <a href="tel:+79140744300" className="hover:opacity-80 transition-opacity">+7 (914) 074-43-00</a>
                        <a href="mailto:sgvautoimport@gmail.com" className="hover:opacity-80 transition-opacity">sgvautoimport@gmail.com</a>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[340px] w-full">
                        <div className="flex items-center gap-2 border-2 border-primary-red rounded-full shadow-lg">
                            <div className="pl-2">
                                <SocialChip name="whatsapp" />
                            </div>
                            <SocialChip name="tg" />
                            <Button onClick={onOpenModalCallBack} className="flex-1">Обратный звонок</Button>
                        </div>
                        <Button asChild>
                            <a href="https://t.me/SGVauto_tg" target="_blank" rel="noopener noreferrer" className="gap-2">
                                <img src={tgIcon} alt="Telegram" className="w-5 h-5" />
                                <span>Telegram-канал</span>
                            </a>
                        </Button>
                    </div>
                </div>


                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-white/60 flex-wrap gap-4">
                    <p>© 2025 SGV AUTO. Все права защищены.</p>
                    <div className="flex gap-4">
                        {legalLinks.map((link) => (

                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                className="underline hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;