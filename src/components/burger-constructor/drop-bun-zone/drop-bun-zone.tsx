import classNames from 'classnames';
import { useDrop } from 'react-dnd';

import styles from '../burger-constructor.module.css';
import { IngredientStub } from '../ingredient-stub/ingredient-stub';

export const DropBunZone = ({ children, stubType, onDropHandler }: any) => {
    const [{ isHover: isHoverBun }, dropBunTarget] = useDrop({
        accept: 'bun',
        drop: (item: { id: string }) => {
            onDropHandler(item.id);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });
    return (
        <div className={classNames(styles.ingredient)} ref={dropBunTarget}>
            {children ? (
                children
            ) : (
                <IngredientStub type={stubType} isHover={isHoverBun} />
            )}
        </div>
    );
};
