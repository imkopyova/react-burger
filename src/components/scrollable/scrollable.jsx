import { useRef, useEffect, useState } from 'react';
import styles from './scrollable.module.css';

export const Scrollable = ({ children, availableHeight }) => {
    const scrollableRef = useRef(null);
    const [currentHeight, setCurrentHeight] = useState(availableHeight);

    useEffect(() => {
        console.log(
            availableHeight,
            scrollableRef.current?.children[0].offsetHeight,
        );
        setCurrentHeight(
            availableHeight > scrollableRef?.current?.children[0].offsetHeight
                ? scrollableRef?.current?.children[0].offsetHeight
                : availableHeight,
        );
    }, [scrollableRef]);

    return (
        <div
            ref={scrollableRef}
            className={styles.scrollable}
            style={{
                height: currentHeight,
            }}
        >
            {children}
        </div>
    );
};
