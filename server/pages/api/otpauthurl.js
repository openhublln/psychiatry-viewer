import { createRouter } from 'next-connect'
import { getLoginSession } from '../../lib/auth'
import { findUser, getOTPAuthURL } from '../../lib/user'
import { getDisplayErrorMessage } from '../../components/componentsUtils/errorMessages'

const router = createRouter()

router
  .use(async (req, res, next) => {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.username))) ?? null
    if (user) {
      res
        .status(401)
        .send(
          'You are currently logged in and cannot complete the registration for a user account. Log out and reload the page to continue.',
        )
    } else {
      await next()
    }
  })
  .post(async (req, res) => {
    const registrationuuid = req.body.registrationuuid
    const otpAuthURL = await getOTPAuthURL(registrationuuid)
    res.status(200).json({
      otpauthurl: otpAuthURL,
    })
  })

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(getDisplayErrorMessage(err))
  },
})
