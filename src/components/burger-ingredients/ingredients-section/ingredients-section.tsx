import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './ingredients-section.module.css';

interface IIngredientsSection {
    name: string;
    children: React.ReactElement[];
}

export const IngredientsSection = forwardRef<HTMLElement, IIngredientsSection>(
    ({ name, children }, ref) => {
        return (
            <section className="pt-10" ref={ref}>
                <h2 className="text text_type_main-medium">{name}</h2>
                <div className={classNames('pt-6 pl-4', styles.grid)}>
                    {children}
                </div>
            </section>
        );
    },
);
