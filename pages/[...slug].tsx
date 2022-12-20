import Link from "@components/wrapper/link"
import { logger } from "@core/logger"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import lang from 'public/lang/lang.json';
import { useState } from "react";

export default function Slug() {
    const { locale, locales, asPath, push, query } = useRouter();
    const initialMenus = lang.menus.filter(menu => menu.locale === locale)
    const initialSubMenus = lang.submenus.filter(submenu => submenu.locale === locale)
    const { slug } = query
    const initialState = {

        menus: initialMenus,
        subMenus: initialSubMenus,
    }
    const [state, setState] = useState(initialState)
    return (<div>
        <h1>slug</h1>
        <div><Link href="/">HOME</Link></div>
        <div>{`${slug?.[0]} ${slug?.[1]} ${slug?.[2]}`}</div>
        <div>
            {`${state.menus.filter(menu => menu.key === slug?.[0]).length} 
            ${state.subMenus.filter(submenu => (submenu.origin === slug?.[0]) && (submenu.key === slug?.[1])).length}`}
        </div>
    </div>)
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     // const paths = [{ params: { link: 'checklist' } }]
//     const paths = [{ params: { slug: ['first'] } }]

//     logger.debug('slug:getStaticPaths')
//     // We'll pre-render only these paths at build time.
//     // { fallback: blocking } will server-render pages
//     // on-demand if the path doesn't exist.
//     return { paths, fallback: 'blocking' }
//     // true 일경우 렌더링 한다. false 일경우 404 blocking 일 경우 ,path 에 없어도 패이지 기다림
//     // return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//     logger.debug('slug:getStaticProps')
//     return {
//         // Passed to the page component as props
//         props: { temp: {} },
//     }
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { req } = context;
//     logger.debug('slug:getServerSideProps', req?.headers.host)
//     return {
//         props: { temp: {} }
//     };
// }