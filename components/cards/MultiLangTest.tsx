import Link from "@components/wrapper/link";
import { useRouter } from "next/router";
import blogPosts from 'public/lang/posts.json';

export default function HomeCard() {

    const { locale, locales, asPath } = useRouter();
    return (<div>
        <h1>다국어 설정</h1>
        <div>
            {locales?.map((l, i) => {
                return (
                    <span key={i} className={l === locale ? 'styles.selected' : ''}>
                        <Link href={asPath} locale={l}>
                            {l}
                        </Link>
                    </span>
                );
            })}
        </div>
        <div>
            <h1>My Multi-Language Blog</h1>
            <div>
                {blogPosts.posts
                    .filter(p => p.locale === locale)
                    .map((blogPost, i) => {
                        // return <BlogCard key={i} blogPost={blogPost} />;
                        return (<div><span>{i}</span><span>{`${blogPost.title} ${blogPost.description}`}</span></div>)
                    })}
            </div>
        </div>
    </div>)
}