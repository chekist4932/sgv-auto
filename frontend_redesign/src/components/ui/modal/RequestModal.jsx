// src/components/ui/RequestModal.jsx

import React from "react";

import { Modal } from "./Modal";
import { RequestForm } from '../Form/requestForm'


export const RequestModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <RequestForm isOpen={isOpen} onClose={onClose} />
        </Modal>
    );
};
