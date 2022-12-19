import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
    children: React.ReactNode,
    className?: any
}
export default function Link(props: LinkProps) {
    const { href } = props
    // return (<NextLink {...props} style={disableFilter.includes(href.toString()) ? { pointerEvents: 'none' } : {}}></NextLink>)
    return (<NextLink {...props}></NextLink>)
}