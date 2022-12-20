import Link from "@components/wrapper/link"
import { useRouter } from "next/router"

export default function Slug() {
    const router = useRouter()
    const { slug } = router.query
    return (<div>
        <div><Link href="/">HOME</Link></div>
        {`${slug}`}
    </div>)
}