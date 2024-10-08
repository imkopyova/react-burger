import classNames from 'classnames';
import styles from './ingredient-stub.module.css';

export const STUBS = {
    bunTop: 'bunTop',
    bunBottom: 'bunBottom',
    ingredient: 'ingredient',
};

export const IngredientStub = ({
    type,
    isHover,
    children,
}: {
    type: keyof typeof STUBS;
    isHover?: boolean;
    children?: React.ReactNode;
}) => {
    return type === STUBS.bunTop ? (
        <div
            className={classNames(styles.stubTop, {
                [styles.hovered]: isHover,
            })}
            data-testid="ingredient-stub-bun-top"
        >
            Перетащите булку
        </div>
    ) : type === STUBS.bunBottom ? (
        <div
            className={classNames(styles.stubBottom, {
                [styles.hovered]: isHover,
            })}
            data-testid="ingredient-stub-bun-bottom"
        >
            Перетащите булку
        </div>
    ) : (
        <div
            className={classNames(styles.stubMiddle, {
                [styles.hovered]: isHover,
            })}
            data-testid="ingredient-stub"
        >
            {children || 'Перетащите ингредиенты'}
        </div>
    );
};
