import BaseLayout from "@components/layouts/base/layout"
import Link from "@components/wrapper/link"
import { useRouter } from "next/router"

export default function () {
    const router = useRouter()
    const { menu, submenu, detail } = router.query
    return (<BaseLayout><div>
        <h1>[menu][submenu]</h1>
        <div><Link href="/">HOME</Link></div>
        {`${menu} ${submenu} ${detail}`}
    </div></BaseLayout>)
}