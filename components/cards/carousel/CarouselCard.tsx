import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CarouselCard.module.css'

type Props = {
    items: string[]
};
export default function CarouselCard({ items }: Props) {
    const [state, setState] = useState({
        carouselIdx: 0,
        //짝수개 이미지인 경우
        initialTransX: 0,
        autoSlide: false,
        slideInterval: 3000,
        width: '100vw',
        // width: '800px',
        sideControl: true,
        dotControl: true,
        // itemWidth: '30%',
        itemWidth: '500px',
        itemMargin: '10px'
    })
    const sliderRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (Array.isArray(items)) {
            const len = items.length
            const transRatio = 100 / len
            if (items.length % 2 === 0) {
                setState({ ...state, initialTransX: transRatio / 2 })
                sliderRef.current?.setAttribute('style', `transform: translate3d(${transRatio / 2}%, 0px, 0px); transition-duration: 350ms;`)
                // transferSlider(len,0)
            }
            else {
                sliderRef.current?.setAttribute('style', `transform: translate3d(${transRatio * Math.floor(0)}%, 0px, 0px); transition-duration: 350ms;`)
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
        sliderRef.current?.setAttribute('style', `transform: translate3d(${finalTransferX}%, 0px, 0px); transition-duration: 350ms;`)
        setState({ ...state, carouselIdx: nextIdx })
    }, [state])
    const detectSelected = useCallback((len: number, idx: number) => {
        return len % 2 === 0 ?
            (len - 1 - idx) === state.carouselIdx + Math.floor(len / 2) - 1 ? styles.controlDotSelected : ''
            : (len - 1 - idx) === state.carouselIdx + Math.floor(len / 2) ? styles.controlDotSelected : ''
    }, [state])

    const prevCallback = useCallback(() => {
        if (Array.isArray(items)) {
            const len = items.length
            const nextIdx = Math.min(state.carouselIdx + 1, getMaxIdx(len))
            transferSlider(len, nextIdx)
        }

    }, [state, items])
    const nextCallback = useCallback(() => {
        if (Array.isArray(items)) {
            const len = items.length
            const nextIdx = Math.max(state.carouselIdx - 1, getMinIdx(len))
            transferSlider(len, nextIdx)
        }
    }, [state, items])
    return <div
        className={`${styles.container}`}
        style={{ width: state.width }}
    >
        <ul className={`${styles.controlDots}`}>
            {state.dotControl && items && items.length > 0 && items.map((item, idx) => {
                return (<li
                    key={idx}
                    className={
                        `${styles.controlDot} ${detectSelected(items.length, idx)}`
                    }
                    onClick={() => { transferSlider(items.length, (items.length - 1 - idx) - Math.floor(items.length / 2)) }}
                ></li>)
            })}
        </ul>
        <div className={`${styles.slider}`}
            ref={sliderRef}>
            {items && items.length > 0 && items.map((item, idx) => {
                return (
                    <div key={idx}
                        className={styles.itemContainer}
                        style={{ margin: state.itemMargin, width: state.itemWidth }}
                    >
                        <div
                            className={styles.item}
                            style={{ backgroundImage: `url('/images/carousel/${item}')` }}
                        ></div>
                    </div>
                )
            })}

        </div>
        {state.sideControl && <div className={`${styles.controls}`}>
            <button className={`${styles.prevControl}`} onClick={prevCallback}>{'<'}</button>
            <button className={`${styles.nextControl}`} onClick={nextCallback}>{'>'}</button>
        </div>}
    </div>
}