import styles from './ingredient-stub.module.css';

export const STUBS = {
    bunTop: 'bunTop',
    bunBottom: 'bunBottom',
    ingredient: 'ingredient',
};

export const IngredientStub = ({
    type,
}: {
    // TODO: исправить типы
    type: 'bunTop' | 'bunBottom' | 'ingredient';
}) => {
    return type === STUBS.bunTop ? (
        <div className={styles.stubTop}>Перетащите булку</div>
    ) : type === STUBS.bunBottom ? (
        <div className={styles.stubBottom}>Перетащите булку</div>
    ) : (
        <div className={styles.stubMiddle}>Перетащите ингредиенты</div>
    );
};
