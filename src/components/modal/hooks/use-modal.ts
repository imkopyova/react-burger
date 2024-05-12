import { useState, useCallback } from 'react';

export const useModal = (onClose?: () => void) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        onClose && onClose();
    }, [onClose]);

    return { isModalOpen, openModal, closeModal };
};
