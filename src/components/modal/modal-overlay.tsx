import styles from './modal-overlay.module.css';

interface IModalOverlay {
    onClick: () => void;
}

export const ModalOverlay = ({ onClick }: IModalOverlay) => {
    return <div onClick={onClick} className={styles.overlay} />;
};
