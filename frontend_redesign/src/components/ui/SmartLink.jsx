// src/components/ui/SmartLink.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { scrollConfig } from '~/config/scroll';

export const SmartLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    if (location.pathname === '/') {
      scroll.scrollToTop(scrollConfig);
    } else {
      navigate('/');
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/#${to}`);
  };

  if (!to || to === 'top') {
    return <a onClick={scrollToTop} {...props}>{children}</a>;
  }

  if (location.pathname === '/') {
    return (
      <ScrollLink to={to} {...scrollConfig} {...props}>
        {children}
      </ScrollLink>
    );
  }

  return (
    <a href={`/#${to}`} onClick={handleNavigate} {...props}>
      {children}
    </a>
  );
};
