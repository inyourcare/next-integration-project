import styles from './Footer.module.css'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface FooterProps {
    enable: boolean,
}
export default function Footer({ enable }: FooterProps) {
    if (enable)
        return (
            <footer className={styles.footer}>
                <div className={styles.footerMainContainer}>
                    <div className={styles.mainBannerImageDiv}></div>
                    <div className={styles.mainLogoImageDiv}></div>
                </div>
            </footer>
        )
    else
        return (<></>)
}