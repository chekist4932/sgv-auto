// src/components/ui/NewsModal.jsx

import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Badge } from '../Badge';
import { Button } from '../Button';

import noResultImage from '/no-results.jpg'


const ImageGallery = ({ image_url }) => {

    if (!image_url) {
        return <div className="aspect-[4/3] bg-black/20 flex items-center justify-center text-white/50">Нет изображений</div>;
    }

    return (
        <div className="">
            <div className="relative group aspect-[4/3]">
                <img src={image_url || noResultImage} className="w-full h-full object-cover" />
            </div>
        </div>
    );
};



export const NewsModal = ({ news_item, onClose }) => {
    if (!news_item) return null;

    const { title, content, image_url, source_url, created_at, category } = news_item;

    const normalizedContent = content?.toString().replace(/\r\n/g, '\n');

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#11131B] rounded-2xl max-w-6xl w-full max-h-[555px] overflow-y-auto relative">
                <div className="sticky top-0 px-2 pt-4 pb-4 flex justify-end items-center z-20">
                    <Button
                        onClick={onClose}
                        variant="ghost" size="icon"
                        className="rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 px-6 pb-2 mb-8">

                    <div className="lg:col-span-1 ">
                        <ImageGallery image_url={image_url} />
                    </div>

                    <div className="lg:col-span-1 space-y-2">
                        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
                            <Badge >{format(new Date(created_at), 'd MMMM yyyy', { locale: ru })}</Badge>
                            <Badge >{category}</Badge>
                        </div>
                        <h3 className="text-white text-lg text-left leading-relaxed mb-4">{title}</h3>
                        <p className="text-sm text-white/80 whitespace-pre-line">{normalizedContent}</p>
                        <a
                            href={source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-red font-semibold text-sm inline-flex items-center gap-1 group hover:no-underline"
                        >
                            Перейти к источнику
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};