import styles from './CarouselCard.module.css'

type Props = {
    items: string[]
};
export default function CarouselCard({ items }: Props) {
    return <div className={`${styles.container}`}>
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
}