// src/components/ui/SmartLink.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { scrollConfig } from '~/config/scroll';

export const SmartLink = ({ to = 'top', children, onClick, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = '/';

  const scrollToTop = () => {
    if (location.pathname === currentLocation) {
      scroll.scrollToTop(scrollConfig);
    } else {
      navigate(currentLocation);
    }
  };

  const handleNavigateWithHash = (e) => {
    e.preventDefault();

    // Если мы уже на главной, просто скроллим
    if (location.pathname === currentLocation) {
      scroll.scrollTo(to, scrollConfig);
      onClick?.();
      return;
    }

    // Переходим на главную страницу с state, чтобы знать, что нужно прокрутить
    navigate(currentLocation, {
      state: { scrollTo: to },
      replace: false
    });

    onClick?.();
  };

  // Обработка ссылки "Наверх"
  if (!to || to === 'top') {
    return (
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
          onClick?.();
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Если мы уже на главной - используем react-scroll
  if (location.pathname === currentLocation) {
    return (
      <ScrollLink
        to={to}
        {...scrollConfig}
        onClick={onClick}
        {...props}
      >
        {children}
      </ScrollLink>
    );
  }

  // Если мы на другой странице - используем навигацию через React Router
  return (
    <a
      href={`${currentLocation}#${to}`}
      onClick={handleNavigateWithHash}
      {...props}
    >
      {children}
    </a>
  );
};