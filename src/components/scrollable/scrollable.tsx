import { useEffect, useState, forwardRef } from 'react';
import styles from './scrollable.module.css';
import classNames from 'classnames';

interface IScrollable {
    children: React.ReactElement;
    availableHeight: number;
    handleScroll?: (e: React.UIEvent) => void;
}

export const Scrollable = forwardRef(
    (
        { children, availableHeight, handleScroll }: IScrollable,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const scrollableRef =
            ref as React.MutableRefObject<HTMLDivElement | null>;
        const [currentHeight, setCurrentHeight] = useState(availableHeight);

        // TODO: Избавиться от as HTMLDivElement
        useEffect(() => {
            if (scrollableRef) {
                setCurrentHeight(
                    availableHeight >
                        (scrollableRef.current?.children[0] as HTMLDivElement)
                            .offsetHeight
                        ? (scrollableRef.current?.children[0] as HTMLDivElement)
                              .offsetHeight
                        : availableHeight,
                );
            }
        }, [scrollableRef, availableHeight]);

        return (
            <div
                ref={scrollableRef}
                onScroll={handleScroll}
                className={classNames(styles.scrollable, 'custom-scroll')}
                style={{
                    height: currentHeight,
                }}
            >
                {children}
            </div>
        );
    },
);
