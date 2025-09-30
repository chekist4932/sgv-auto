
import { X } from "lucide-react";
import React from "react";
import { Button } from "../Button";


export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#11131B] rounded-2xl p-8 max-w-lg w-full relative text-white"
            >
                <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                >
                    <X className="w-6 h-6" />
                </Button>
                {children}
            </div>
        </div>
    );
};