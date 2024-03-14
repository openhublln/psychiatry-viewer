import { createRouter } from 'next-connect'
import {
  createNewConfiguration,
  deleteConfiguration,
  updateConfiguration,
} from '../../../lib/configuration'
import { getConfiguration } from '../../../lib/db'
import { findUser, isAdminUser } from '../../../lib/user'
import { getLoginSession } from '../../../lib/auth'
import { getDisplayErrorMessage } from '../../../components/componentsUtils/errorMessages'

const router = createRouter()
router
  .use(async (req, res, next) => {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.username))) ?? null
    if (!user || !isAdminUser(user)) {
      res.status(401).send(getDisplayErrorMessage('UNAUTHORIZED_USER'))
    } else {
      next()
    }
  })
  .get(async (req, res) => {
    res.status(200).json(await getConfiguration())
  })
  .post(async (req, res) => {
    const data = req.body
    await createNewConfiguration(data.name, data.value, data.nodelete)
    res.status(200).end()
  })
  .put(async (req, res) => {
    const data = req.body
    await updateConfiguration(data.name, data.value)
    res.status(200).end()
  })
  .delete(async (req, res) => {
    const data = req.body
    await deleteConfiguration(data.name)
    res.status(200).end()
  })

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(getDisplayErrorMessage(err))
  },
})
