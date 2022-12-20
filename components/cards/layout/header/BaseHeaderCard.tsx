import PrintDialog from "@components/dialogs/print"
import Link from "@components/wrapper/link"
import { logger } from "@core/logger"
import { useRouter } from "next/router"
import { MouseEvent, useEffect, useState } from "react"
import styles from './Base.module.css'
import lang from 'public/lang/lang.json';

export default function BaseHeaderCard() {

    const { locale, locales, asPath, push } = useRouter();
    const initialMenus = lang.menus.filter(menu => menu.locale === locale)
    const initialSubMenus = lang.submenus.filter(submenu => submenu.locale === locale)
    const initialState = {
        menuListOpen: false,

        menus: initialMenus,
        subMenus: initialSubMenus,
        menuOpenMap: initialMenus.reduce(function (map, menu) {
            map[menu.key] = false
            return map
        }, {} as Record<string, boolean>)
    }
    const [state, setState] = useState(initialState)
    const [printDialogOpen, setPrintDialogOpen] = useState(false)


    // useEffect(() => {
    //     let newState: any = {}
    //     routes.map((route, index) => {
    //         const subs = route.subRoutes
    //         if (subs)
    //             subs.map((sub, subIdx) => {
    //                 newState[sub.name] = false
    //             })
    //     })

    //     setState({ ...state, ...newState })
    // }, [])

    function mainExpandOnClick(e: MouseEvent<HTMLDivElement>) {
        logger.debug('mainExpandOnClick', e)
        setState({ ...state, menuListOpen: true })
    }
    function menuListCloseBtnOnClick(e: MouseEvent<HTMLDivElement>) {
        logger.debug('menuListCloseBtnOnClick', e)
        setState({ ...state, menuListOpen: false })
    }
    function menuListItemExpandBtnOnClick(e: MouseEvent<HTMLDivElement>, menuKey: string) {
        // function menuListItemExpandBtnOnClick(e: HTMLDivElement | MouseEvent, subRoutes?: Route[]) {
        logger.debug('menuListItemExpandBtnOnClick', e, menuKey)
        // console.log(subRoutes[RouteKeys.IdeaStep],subRoutes[RouteKeys.Home])
        // console.log(subRoutes[routeName])
        // console.log('menuListItemExpandBtnOnClick', subRoutes)
        // console.log('menuListItemExpandBtnOnClick', state)
        // setState({ ...state, menuListSubItemOpen: !state.menuListSubItemOpen })
        state.menuOpenMap[menuKey] = !state.menuOpenMap[menuKey]
        setState({ ...state, menuOpenMap: state.menuOpenMap })
    }
    //////// sub routes rendering
    function renderSwitch(menuKey: string) {
        return subRouteList(state.menuOpenMap[menuKey], menuKey);
    }
    function subRouteList(identifier: boolean, menuKey: string) {
        return (
            <div>
                <ul data-columns={2} className={`${styles.menuListSubItemUl} ${(identifier === true) && styles.additionalPadding}`}>
                    {state.subMenus?.map((subMenu, index) => {
                        return (<li className={`${styles.menuListSubItemLi} ${(identifier === false) && styles.folding}`} key={index}>
                            <Link href={`${menuKey}/${subMenu.key}`} className={`${styles.menuListSubItemLink}`}>{subMenu.name}</Link>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
    ////////

    useEffect(() => {
        logger.debug('router.asPath changed')
        setState({ ...state, menuListOpen: false })
    }, [asPath])

    function handleHomeBtnClick() {
        push('/')
    }
    //////// main component rendering
    return (
        <header className={styles.header}>
            <PrintDialog open={printDialogOpen} setOpen={setPrintDialogOpen} />
            <div className={styles.homeBtnContainer}>
                <div className={styles.homeBtnDiv} onClick={handleHomeBtnClick}></div>
                <div onClick={mainExpandOnClick} className={styles.expandBtnImageDiv}></div>
            </div>
            <div className={styles.navDiv}>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        {state.menus.map((menu, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <Link
                                        href={`${menu.key}`}
                                        className={
                                            `${styles.link} 
                                            ${asPath.split('/')[1] === menu.key && styles.selectedLink}`}>
                                        {menu.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            {/* <Image onClick={mainExpandOnClick} className={styles.expandBtnImage} src="/images/main-expand-btn.svg" alt="expand" width={25} height={20} /> */}
            <div className={`${styles.menuListContainerDiv} ${(state.menuListOpen === false) && styles.disapear}`}>
                <div className={styles.menuListHeader}>
                    <div className={styles.menuListHomeHtnDiv} onClick={handleHomeBtnClick}></div>
                    <div className={styles.menuListClosBtn} onClick={menuListCloseBtnOnClick}></div>
                </div>
                <div>
                    {state.menus.map((menu, index) => {
                        return (<div key={index}>
                            <div
                                className={styles.menuListItemDiv}
                            >
                                <Link href={menu.key} className={`${styles.menulistLink}`}>{menu.name}</Link>
                                <div className={styles.menuListItemExpandBtn} onClick={(e) => menuListItemExpandBtnOnClick(e, menu.key)}></div>
                            </div>
                            {renderSwitch(menu.key)}
                        </div>
                        );
                    })}
                </div>
            </div>
        </header>
    )
}