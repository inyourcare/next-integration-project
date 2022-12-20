import Link from "@components/wrapper/link"
import { useRouter } from "next/router"

export default function () {
    const router = useRouter()
    const { link, sublink } = router.query
    return (<div>
        <div><Link href="/">HOME</Link></div>
        {`${link} ${sublink}`}
    </div>)
}