// src/components/ui/CarModal.jsx

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Fuel, Zap, Settings, GitCommit, GitBranch } from 'lucide-react';

import { Button } from '../Button';
import { Badge } from '../Badge';
import { SocialChip } from '../SocialChip';


const SpecIcon = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center">
        {icon}
        <p className="text-[11px] text-white mt-2">{value}</p>
        <p className="text-[10px] text-white/20 leading-tight">{label}</p>
    </div>
);

const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center text-white/50">Нет изображений</div>;
    }

    const prevImage = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };
    const nextImage = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };

    return (
        <div className="space-y-2">
            <div className="relative my-4 group  aspect-video">
                <img src={images[currentIndex].url} alt={images[currentIndex].alt} className="w-full h-full object-cover rounded-lg" />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            variant="ghost" size="icon"
                            className="absolute bottom-0 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-0"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={nextImage}
                            variant="ghost" size="icon"
                            className="absolute bottom-0 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-0"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </>
                )}
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`aspect-video rounded-md overflow-hidden cursor-pointer border-2 ${currentIndex === index ? 'border-primary-red' : 'border-transparent'}`}
                    >
                        <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};


export const CarModal = ({ car, onClose, onOpenModal }) => {
    if (!car) return null;

    const { brand, model, generation, description, images, price } = car;
    const spec = generation.specs[0];



    const specIcons = {
        engine: <Fuel className="w-5 h-5 text-white/80 stroke-[#348BDC]" />,
        power: <Zap className="w-5 h-5 text-white/80 stroke-[#348BDC]" />,
        transmission: <Settings className="w-5 h-5 text-white/80 stroke-[#348BDC]" />,
        drivetrain: <GitCommit className="w-5 h-5 text-white/80 stroke-[#348BDC]" />,
        steering: <GitBranch className="w-5 h-5 text-white/80 stroke-[#348BDC]" />,
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#11131B] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative ">


                <div className="sticky top-0 px-6 pt-6 pb-4 flex justify-between items-center z-20">
                    <div>
                        <h3 className="text-3xl font-medium">{brand.name} {model.name}, {generation.years}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-base font-medium text-primary-red">{price}</p>
                            <Badge >включая доставку и таможенное оформление</Badge>
                        </div>
                    </div>
                    <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
                        <X className="w-6 h-6" />
                    </Button>
                </div>


                <div className="grid lg:grid-cols-2 gap-8 px-6 pb-6 pt-4 ">

                    <div className="lg:col-span-1 ">
                        <ImageGallery images={images} />
                    </div>


                    <div className="lg:col-span-1 space-y-6 ">


                        <div className="bg-[#141720] p-4 rounded-lg ">
                            <div className="grid grid-cols-5 gap-2 divide-x divide-white/10">
                                <SpecIcon icon={specIcons.engine} label="двигатель" value={spec.engine} />
                                <SpecIcon icon={specIcons.power} label="мощность" value={spec.power} />
                                <SpecIcon icon={specIcons.transmission} label="коробка передач" value={spec.transmission} />
                                <SpecIcon icon={specIcons.drivetrain} label="привод" value={spec.drivetrain} />
                                <SpecIcon icon={specIcons.steering || specIcons.drivetrain} label="руль" value={spec.steering || "не указан"} />
                            </div>
                        </div>


                        <div className="bg-[#141720] p-4 rounded-lg">
                            <h4 className="font-semibold text-base mb-2 text-zinc-700">Описание</h4>
                            <p className="text-sm text-white whitespace-pre-line">{description}</p>
                        </div>

                        <div className="bg-[#141720] p-4 rounded-lg space-y-3">
                            <p className="text-xs text-center text-white">Проконсультируем или поможем в выборе аналога</p>

                        </div>
                        <div className="relative flex flex-col" >
                            <div className="flex items-center gap-2 border border-primary-red rounded-full shadow-lg ">
                                <div className="pl-2">
                                    <SocialChip name="whatsapp" />
                                </div>
                                <SocialChip name="tg" />
                                <Button onClick={onOpenModal} className="flex-1">Обратный звонок</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};