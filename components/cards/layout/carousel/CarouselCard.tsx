import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CarouselCard.module.css'

type Props = {
    items: string[]
};
export default function CarouselCard({ items }: Props) {
    const [state, setState] = useState({
        // maxXOffset: 0,
        // minXOffset: 0,
        carouselIdx: 0,
        //짝수개 이미지인 경우
        initialTransX: 0,
        autoSlide: true,
        slideInterval: 3000
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const sliderClassName = 'slider'
    useEffect(() => {
        if (Array.isArray(items)) {
            const len = items.length
            const slider = containerRef.current?.querySelector(`.${sliderClassName}`)
            const transRatio = 100 / len
            if (items.length % 2 === 0) {
                setState({ ...state, initialTransX: transRatio / 2 })
                slider?.setAttribute('style', `transform: translate3d(${transRatio / 2}%, 0px, 0px); transition-duration: 350ms;`)
                // transferSlider(len,0)
            }
            else {
                slider?.setAttribute('style', `transform: translate3d(${transRatio * Math.floor(0)}%, 0px, 0px); transition-duration: 350ms;`)
            }
        }
    }, [items])

    function getMaxIdx(len: number) {
        return len % 2 === 0 ? Math.floor(len / 2) - 1 : Math.floor(len / 2);
    }
    function getMinIdx(len: number) {
        return -Math.floor(len / 2)
    }
    //auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            if (state.autoSlide && Array.isArray(items)) {
                const len = items.length
                const maxIdx = getMaxIdx(len)
                const minIdx = getMinIdx(len)
                var nextIdx = state.carouselIdx - 1
                if (nextIdx > maxIdx) {
                    nextIdx = minIdx
                } else if (nextIdx < minIdx) {
                    nextIdx = maxIdx
                }
                transferSlider(len, nextIdx)
            }
        }, state.slideInterval);
        return () => clearInterval(interval);
    }, [state])

    const transferSlider = useCallback((len: number, nextIdx: number) => {
        console.log('slide change', len, nextIdx)
        const transRatio = 100 / len
        const finalTransferX = state.initialTransX + (transRatio * (nextIdx))
        const slider = containerRef.current?.querySelector(`.${sliderClassName}`)
        slider?.setAttribute('style', `transform: translate3d(${finalTransferX}%, 0px, 0px); transition-duration: 350ms;`)
        setState({ ...state, carouselIdx: nextIdx })
    }, [state])
    const detectSelected = useCallback((len: number, idx: number) => {
        return len % 2 === 0 ?
            (len - 1 - idx) === state.carouselIdx + Math.floor(len / 2) - 1 ? 'selected' : ''
            : (len - 1 - idx) === state.carouselIdx + Math.floor(len / 2) ? 'selected' : ''
    }, [state])


    return <div className={`${styles.container}`} ref={containerRef}>
        <div className={`${sliderClassName} ${styles.slider}`}>
            {items && items.length > 0 && items.map((item, idx) => {
                return (
                    <div key={idx}
                        className={styles.itemContainer}
                    >
                        <div
                            className={styles.item}
                            style={{ backgroundImage: `url('/images/carousel/${item}')` }}
                        ></div>
                    </div>
                )
            })}

        </div>
    </div>
}