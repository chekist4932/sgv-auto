import React from "react";
import { SmartLink } from '../SmartLink';

export const Breadcrumbs = () => (
    <div id='breadcrumbs' className="text-sm text-white/60 mb-8">
        <SmartLink
            key='Главная'
            to='top'
            className="hover:opacity-80 transition-opacity cursor-pointer"
        >
            Главная
        </SmartLink> / <span className="text-white">Новости</span>
    </div>
);