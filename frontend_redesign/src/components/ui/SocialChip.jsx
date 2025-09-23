import React from 'react';
import whatsappIcon from '~/assets/icons/whatsapp.svg';
import tgIcon from '~/assets/icons/tg.svg';


const socialMedia = {
    whatsapp: {
        icon: whatsappIcon,
        source_link: "https://wa.me/79140744300"
    },
    tg: {
        icon: tgIcon,
        source_link: "https://t.me/SGV_manager"
    },
};



export const SocialChip = ({ name }) => {
    const iconSrc = socialMedia[name]['icon'];
    const hrefSrc = socialMedia[name]['source_link'];
    if (!iconSrc) return null; 

    return (
        <a
            href={hrefSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 bg-primary-red hover:bg-secondary-red rounded-full transition-colors duration-300"
        >
            <img src={iconSrc} alt={`${name} icon`} className="w-5 h-5" />
        </a>
    );
};