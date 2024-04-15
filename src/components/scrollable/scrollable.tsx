import { useRef, useEffect, useState } from 'react';
import styles from './scrollable.module.css';
import classNames from 'classnames';

interface IScrollable {
    children: React.ReactElement;
    availableHeight: number;
}

export const Scrollable = ({ children, availableHeight }: IScrollable) => {
    const scrollableRef = useRef<HTMLDivElement | null>(null);
    const [currentHeight, setCurrentHeight] = useState(availableHeight);

    // TODO: Избавиться от as HTMLDivElement
    useEffect(() => {
        setCurrentHeight(
            availableHeight >
                (scrollableRef?.current?.children[0] as HTMLDivElement)
                    .offsetHeight
                ? (scrollableRef?.current?.children[0] as HTMLDivElement)
                      .offsetHeight
                : availableHeight,
        );
    }, [scrollableRef]);

    return (
        <div
            ref={scrollableRef}
            className={classNames(styles.scrollable, 'custom-scroll')}
            style={{
                height: currentHeight,
            }}
        >
            {children}
        </div>
    );
};
