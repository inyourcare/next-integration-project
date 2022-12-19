import styles from './Footer.module.css'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerMainContainer}>
                <div className={styles.mainBannerImageDiv}></div>
                <div className={styles.mainLogoImageDiv}></div>
            </div>
        </footer>
    )
}