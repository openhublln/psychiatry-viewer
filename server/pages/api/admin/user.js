import { createRouter } from 'next-connect'
import {
  isAdminUser,
  findUser,
  deleteUser,
  updateUser,
  createNewUser,
} from '../../../lib/user'
import { getUsers } from '../../../lib/db'
import { getLoginSession } from '../../../lib/auth'
import { readSystemConfigData } from '../../../utils/readConfig'
import { getDisplayErrorMessage } from '../../../components/componentsUtils/errorMessages'

const router = createRouter()

router
  .use(async (req, res, next) => {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.username))) ?? null
    if (!user || !isAdminUser(user)) {
      res.status(401).send(getDisplayErrorMessage('UNAUTHORIZED_USER'))
    } else if (req.method === 'DELETE' && user.username === req.body.username) {
      res.status(401).send(getDisplayErrorMessage('NO_DELETE_OWN_ACCOUNT'))
    } else {
      await next()
    }
  })
  .get(async (req, res) => {
    if (req.body.username) {
      const user = await findUser(req.body.username)
      res.status(200).json({
        username: user.username,
        prename: user.prename,
        name: user.name,
        niss: user.niss,
        email: user.email,
        role: user.role,
        userfunction: user.userFunction,
        hospital: user.hospital,
        birthdate: user.birthdate,
        phonenumber: user.phonenumber,
      })
    } else {
      res.status(200).json(
        (await getUsers()).map((user) => {
          return {
            username: user.username,
            prename: user.prename,
            name: user.name,
            niss: user.niss,
            email: user.email,
            role: user.role,
            userfunction: user.userFunction,
            hospital: user.hospital,
            birthdate: user.birthdate,
            phonenumber: user.phonenumber,
            status:
              user.status === 'registering'
                ? 'registration URL: ' +
                  readSystemConfigData().registrationURL +
                  user.registrationuuid
                : user.status,
          }
        }),
      )
    }
  })
  .post(async (req, res) => {
    const username = await createNewUser(JSON.parse(req.body))
    const user = await findUser(username)
    res.status(200).json({
      registrationurl:
        readSystemConfigData().registrationURL + user.registrationuuid,
    })
  })
  .put(async (req, res) => {
    await updateUser(req.body)
    res.status(200).end()
  })
  .delete(async (req, res) => {
    // Delete request can not have body in nextjs version 13.4.4
    await deleteUser(req.query.username)
    res.status(200).end()
  })

export default router.handler({
  onError: (err, req,res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(getDisplayErrorMessage(err))
  },
})
