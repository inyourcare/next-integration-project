import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useNextAuthDisabled } from '@core/hooks/useNextAuthDisabled'

type SignInPopupParam = {
  prividerId: string
}
const SignInPopup = () => {
  const session = useSession()
  const router = useRouter()
  const { prividerId } = router.query

  useEffect(() => {
    // alert(prividerId)
    if (prividerId && (session.status === 'loading' || session.status === 'unauthenticated')) void signIn(prividerId as string)
    if (session.status === 'authenticated') window.close()
  }, [session.status,prividerId])
  useNextAuthDisabled()

  return null
}

export default SignInPopup