import { useRef } from 'react';
import classNames from 'classnames';
import type { XYCoord } from 'dnd-core';
import { useDrop, useDrag } from 'react-dnd';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-ingredient.module.css';
import type { TChosenIngredient } from '../../../services/models';

export interface IConstructorIngredient {
    ingredient: TChosenIngredient;
    index: number;
    onDeleteIngredient: (id: string) => void;
    onMoveIngredient: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
}

export const ConstructorIngredient = ({
    ingredient,
    index,
    onDeleteIngredient,
    onMoveIngredient,
}: IConstructorIngredient) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<DragItem, void>({
        accept: 'order',
        // TODO: Заменить any
        hover(item: DragItem, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            onMoveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'order',
        item: () => {
            return { id: ingredient.inConstructorId, index: index } as DragItem;
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;
    drag(drop(ref));
    return (
        <div
            ref={ref}
            key={ingredient.inConstructorId}
            className={classNames(
                // TODO: Перенести стили на уровень выше
                styles.ingredient,
                'pt-4',
            )}
            style={{ opacity: opacity }}
        >
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() =>
                    onDeleteIngredient(ingredient.inConstructorId)
                }
            />
            <DragIcon type="primary" />
        </div>
    );
};
