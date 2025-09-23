import React from 'react';
import fullLogo from '~/assets/logo/logo-full.png';

export const Logo = ({ className = '' }) => {
  return (
    <img
      src={fullLogo}
      alt="SGV Auto Logo"

      className={`h-full w-auto ${className}`}
    />
  );
};