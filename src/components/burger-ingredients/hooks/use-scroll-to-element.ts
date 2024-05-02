import { useRef, useEffect } from 'react';

export const useScrollToElement = (
    /** Элемент который скроллится */
    scrollableElementRef: React.RefObject<HTMLElement>,
    /** Элемент который должен оказаться наверху */
    movableToTopElementRef: React.RefObject<HTMLElement>,
    /** Элемент до которого нужно проскролить */
    scrollToElementRef: React.RefObject<HTMLElement>,
) => {
    const initialPosition = useRef<number>();

    const absolutePlaceToScroll =
        scrollToElementRef.current?.getBoundingClientRect().bottom;

    useEffect(() => {
        initialPosition.current =
            movableToTopElementRef.current?.getBoundingClientRect().top;
    }, [movableToTopElementRef]);

    const setPosition = () => {
        if (absolutePlaceToScroll && initialPosition.current) {
            scrollableElementRef.current?.scroll({
                top: initialPosition.current - absolutePlaceToScroll,
            });
        }
    };

    return {
        setPosition: setPosition,
    };
};
