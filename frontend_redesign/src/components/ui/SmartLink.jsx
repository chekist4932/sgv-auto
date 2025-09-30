// src/components/ui/SmartLink.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { scrollConfig } from '~/config/scroll';

export const SmartLink = ({ to = 'top', children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = '/'

  const scrollToTop = () => {
    if (location.pathname === currentLocation) {
      scroll.scrollToTop(scrollConfig);
    } else {
      navigate(currentLocation);
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`${currentLocation}#${to}`);
  };

  if (!to || to === 'top') {
    return <a onClick={scrollToTop} {...props}>{children}</a>;
  }

  if (location.pathname === currentLocation) {
    return (
      <ScrollLink to={to} {...scrollConfig} {...props}>
        {children}
      </ScrollLink>
    );
  }

  return (
    <a href={`${currentLocation}#${to}`} onClick={handleNavigate} {...props}>
      {children}
    </a>
  );
};
