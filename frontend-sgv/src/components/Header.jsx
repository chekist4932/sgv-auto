import React, { useState, useEffect, useRef } from 'react';
import { Phone, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
    { to: 'services', label: 'Услуги' },
    { to: 'reviews', label: 'Отзывы' },
    { to: 'news', label: 'Новости' },
    { to: 'contact', label: 'Контакты' },
];

export default function Header({ navIsActive }) {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            scroll.scrollToTop();
        } else {
            navigate('/');
        }
    };

    // Закрытие меню по клику вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div
                        className="text-gray-900 dark:text-white transition-colors text-2xl font-bold uppercase tracking-wide cursor-pointer"
                        style={{ fontFamily: 'SutroW01-BoldExtended' }}
                        onClick={handleLogoClick}
                    >
                        SGV auto
                    </div>

                    {navIsActive && (
                        <>
                            <div className="hidden md:flex space-x-8">
                                {navLinks.map(({ to, label }) => (
                                    <ScrollLink
                                        key={to}
                                        to={to}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
                                    >
                                        {label}
                                    </ScrollLink>
                                ))}
                            </div>

                            <div className="md:hidden">
                                <button
                                    className="text-gray-700 dark:text-gray-200"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.nav
                                        ref={menuRef}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 flex flex-col items-center space-y-4 py-4 shadow-lg md:hidden"
                                    >
                                        {navLinks.map(({ to, label }) => (
                                            <ScrollLink
                                                key={to}
                                                to={to}
                                                smooth={true}
                                                duration={500}
                                                offset={-80}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
                                            >
                                                {label}
                                            </ScrollLink>
                                        ))}
                                    </motion.nav>
                                )}
                            </AnimatePresence>
                        </>
                    )}

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="hidden md:flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                        >
                            <Phone className="w-5 h-5" />
                            <span>Связаться с нами</span>
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
