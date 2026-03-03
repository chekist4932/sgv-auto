import React from 'react';
import MaxIcon from '~/assets/icons/Max_logo.svg';
import tgIcon from '~/assets/icons/tg.svg';


const socialMedia = {
    max: {
        icon: MaxIcon,
        source_link: "https://max.ru/u/f9LHodD0cOJgP1wUAa9vcvSrtKz6S6v1rypI8DHymNxSwQ1QN_Nht5GUbI8"
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