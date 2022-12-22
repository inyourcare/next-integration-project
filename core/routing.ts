export function isNextAuthDisabled() {
    return process.env.NEXT_PUBLIC_NEXTAUTH === 'disable'
}