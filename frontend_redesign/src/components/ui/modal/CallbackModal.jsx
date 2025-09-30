// src/components/ui/CallbackModal.jsx

import React from "react";

import { Modal } from "./Modal";
import { CallbackForm } from '../Form/callBackForm'

export const CallbackModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CallbackForm isOpen={isOpen} onClose={onClose} />
        </Modal>
    );
};
