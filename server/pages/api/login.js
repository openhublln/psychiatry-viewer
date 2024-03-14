import { createRouter } from 'next-connect'
import passport from '../../lib/passport'
import { setLoginSession } from '../../lib/auth'
import { getDisplayErrorMessage } from '../../components/componentsUtils/errorMessages'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

const router = createRouter()

router.use(passport.initialize()).post(async (req, res) => {
  try {
    const user = await authenticate('local', req, res)

    // session is the payload to save in the token, it may contain basic info about the user
    const session = { ...user }
    await setLoginSession(res, session)
    res.status(200).send({ done: true })
  } catch (error) {
    console.error(error)
    res.status(401).send(getDisplayErrorMessage(error))
  }
})

export const config = {
  api: {
    externalResolver: true,
  },
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(getDisplayErrorMessage(err))
  },
})
