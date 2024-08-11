import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.css';

interface IModal {
    children: React.ReactElement;
    onClose: () => void;
}

export const Modal = ({ children, onClose }: IModal) => {
    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', closeModal);

        return () => window.removeEventListener('keydown', closeModal);
    }, [onClose]);

    const modalContainer = document.getElementById('modal') as HTMLElement;

    const handleClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    };
    return createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div onClick={handleClick} className={styles.modal}>
                <div
                    className={styles.close}
                    onClick={onClose}
                    data-testid="modal-close"
                >
                    <CloseIcon type="primary" />
                </div>
                {children}
            </div>
        </>,
        modalContainer,
    );
};
