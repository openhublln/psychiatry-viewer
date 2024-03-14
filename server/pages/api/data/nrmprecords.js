import { createRouter } from 'next-connect'
import { getLoginSession } from '../../../lib/auth'
import { nrmpGetRecords } from '../../../lib/api/nrmpdata'
import { findUser } from '../../../lib/user'
import { getDisplayErrorMessage } from '../../../components/componentsUtils/errorMessages'

// The api getting alcohol data
// Project: NRMP (New Relapse Model in Psychiatry)

const router = createRouter()

router
  .use(async (req, res, next) => {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.username))) ?? null
    if (!user) {
      res.status(401).send(getDisplayErrorMessage('UNAUTHORIZED_USER'))
    } else {
      next()
    }
  })
  .get(async (req, res) => {
    const medicalData = await nrmpGetRecords()
    return res.status(200).send(
      JSON.stringify({
        data: medicalData,
      }),
    )
  })

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(getDisplayErrorMessage(err))
  },
})

export const config = {
  api: {
    externalResolver: true,
  },
}
