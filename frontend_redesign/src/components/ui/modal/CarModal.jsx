// src/components/ui/CarModal.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Fuel, Zap, Settings, GitCommit, GitBranch, ImageIcon  } from 'lucide-react';

import { Button } from '../Button';
import { Badge } from '../Badge';
import { SocialChip } from '../SocialChip';
import { useFetchLot } from '~/hooks/useFetchLot'; // ваш хук
import { formatLotForModal } from '~/lib/catalog_page/utils';

import { ModalSkeleton } from '~/components/ui/modal/ModalSkeleton'

import { InfoSpecs } from '~/components/ui/modal/InfoSpecs'

import { API_URL, requestOptions } from '~/config/index'

const SpecIcon = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center">
        {icon}
        <p className="text-[11px] text-white mt-2">{value}</p>
        <p className="text-[10px] text-white/20 leading-tight">{label}</p>
    </div>
);

const ImageWithSkeleton = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    // Сбрасываем состояние при смене src (когда листаем галерею)
    useEffect(() => {
        setIsLoaded(false);
        setIsError(false);
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-white/5 ${className}`}>
            {/* Скелетон/Заглушка (показывается пока не загружено) */}
            {!isLoaded && !isError && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-white/10">
                    <ImageIcon className="w-8 h-8 text-white/10" />
                </div>
            )}

            {/* Иконка ошибки, если фото не загрузилось */}
            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white/20 text-xs">
                    Ошибка загрузки
                </div>
            )}

            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsError(true)}
                className={`
                    w-full h-full object-cover transition-opacity duration-500
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
            />
        </div>
    );
};

const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center text-white/50">
                Нет изображений
            </div>
        );
    }

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="space-y-2">
            {/* Основное изображение */}
            <div className="relative my-4 group aspect-video">
                <ImageWithSkeleton
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt}
                    className="rounded-lg w-full h-full"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-black/30 hover:bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </>
                )}
            </div>

            {/* Сетка миниатюр */}
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all
                            ${currentIndex === index ? 'border-primary-red scale-[0.98]' : 'border-transparent opacity-60 hover:opacity-100'}
                        `}
                    >
                        <ImageWithSkeleton
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CarModal = ({ car: initialCar, onClose, onOpenModal, isLot }) => {

    const api_path = isLot
        ? `${API_URL}/catalog/${initialCar?.COUNTRY_AUCTION}?id=${initialCar?.ID}`
        : null;

    const { data, loading, error } = useFetchLot(api_path, requestOptions);

    // 2. Вычисляем итоговые данные об авто
    const car = useMemo(() => {
        if (!isLot) return initialCar; // Если не лот, используем то что пришло в пропсах
        if (data && data.items) {
            const rawCarData = Array.isArray(data.items) ? data.items[0] : data.items;

            // Если данных внутри массива нет (пустой список), возвращаем null
            if (!rawCarData) return null;
            return formatLotForModal(rawCarData);
        }
        return null;
    }, [isLot, initialCar, data]);

    // 3. Обработка состояний (Loading / Error / No Data)
    if (!initialCar) return null;

    if (isLot && loading) {
        return <ModalSkeleton onClose={onClose} />;
    }

    // 3. Если произошла ошибка
    if (isLot && error) {
        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#11131B] p-8 rounded-2xl text-center">
                    <p className="text-white mb-4">Не удалось загрузить данные об автомобиле</p>
                    <Button onClick={onClose}>Закрыть</Button>
                </div>
            </div>
        );
    }


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

                <div className="sticky top-0  backdrop-blur-lg p-6 flex justify-between items-start z-20">
                    <div>
                        <h3 className="text-2xl font-bold">
                            {brand.name} {model.name}, {generation.years}
                        </h3>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-3 gap-y-1 mt-2">
                            <p className="text-xl font-bold text-primary-red">
                                {price}
                            </p>
                            <Badge>
                                включая доставку и таможенное оформление
                            </Badge>
                        </div>
                    </div>

                    <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full shrink-0">
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 px-6 pb-6 pt-4">

                    <div className="lg:col-span-1 ">
                        <ImageGallery images={images} />
                    </div>


                    <div className="lg:col-span-1 space-y-6 ">

                        <div className="bg-[#141720] p-6 rounded-lg">

                            <div className="hidden md:grid md:grid-cols-5 md:gap-2 md:divide-x md:divide-white/10">
                                <SpecIcon icon={specIcons.engine} label="двигатель" value={spec.engine} />
                                <SpecIcon icon={specIcons.power} label="мощность" value={spec.power} />
                                <SpecIcon icon={specIcons.transmission} label="коробка передач" value={spec.transmission} />
                                <SpecIcon icon={specIcons.drivetrain} label="привод" value={spec.drivetrain} />
                                <SpecIcon icon={specIcons.steering || specIcons.drivetrain} label="руль" value={spec.steering || "не указан"} />
                            </div>


                            <div className="flex flex-col gap-4 md:hidden">
                                <div className="flex justify-center gap-6">
                                    <SpecIcon icon={specIcons.engine} label="двигатель" value={spec.engine} />
                                    <SpecIcon icon={specIcons.power} label="мощность" value={spec.power} />
                                    <SpecIcon icon={specIcons.transmission} label="коробка передач" value={spec.transmission} />
                                </div>
                                <div className="flex justify-center gap-6">
                                    <SpecIcon icon={specIcons.drivetrain} label="привод" value={spec.drivetrain} />
                                    <SpecIcon icon={specIcons.steering || specIcons.drivetrain} label="руль" value={spec.steering || "не указан"} />
                                </div>
                            </div>
                        </div>


                        <div className="bg-[#141720] p-4 rounded-lg">
                            <h4 className="font-semibold text-base mb-2 text-zinc-700">Описание</h4>
                            {description && description.includes(':') && isLot ? (
                                <InfoSpecs rawInfo={description} />
                            ) : (
                                <p className="text-sm text-white whitespace-pre-line">{description}</p>
                            )}
                        </div>

                        <div className="bg-[#141720] p-4 rounded-lg space-y-3">
                            <p className="text-xs text-center text-white">Проконсультируем или поможем в выборе аналога</p>

                        </div>
                        <div className="relative flex flex-col" >
                            <div className="flex items-center gap-2 border border-primary-red rounded-full shadow-lg ">
                                <div className="pl-2">
                                    <SocialChip name="max" />
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