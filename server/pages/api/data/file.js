import { createRouter } from 'next-connect'
import { findUser } from '../../../lib/user'
import { getLoginSession } from '../../../lib/auth'
import path from 'path'
import fs from 'fs'
import {
  ConfigurationPathNames,
  getConfigurationValue,
} from '../../../lib/configuration'
import { getDisplayErrorMessage } from '../../../components/componentsUtils/errorMessages'

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
    const reqPath = req.query.path
    if (!reqPath) {
      return res.status(400).send('No path')
    }

    // Find out the real directory

    const thisPathComponents = reqPath.split(path.sep)
    const repositoryName = thisPathComponents[0]
    var repositoryDirectory = null
    if (repositoryName === '$datadir') {
      repositoryDirectory = path.normalize(
        await getConfigurationValue(ConfigurationPathNames.sourceDataPath),
      )
    } else if (repositoryName === '$resultdir') {
      repositoryDirectory = path.normalize(
        await getConfigurationValue(ConfigurationPathNames.resultPath),
      )
    } else {
      return res.status(400).send('Not a valid file path')
    }
    if (repositoryDirectory.endsWith(path.sep)) {
      // remove path separator at the end of repositoryDirectory
      repositoryDirectory = repositoryDirectory.substring(
        0,
        repositoryDirectory.length - path.sep.length,
      )
    }

    thisPathComponents[0] = repositoryDirectory
    const thisPath = path.normalize(path.join(...thisPathComponents))

    // Check if user tries to escape from configured directory

    if (
      thisPath !== repositoryDirectory &&
      !thisPath.startsWith(repositoryDirectory + path.sep)
    ) {
      return res.status(400).send('Not a valid path')
    }

    // Check if path exists
    const stat = fs.statSync(thisPath, { throwIfNoEntry: false })
    if (!stat || !stat.isFile()) {
      return res.status(400).send('The specified path is not a file')
    }

    // Get file contents

    const normalizedPath =
      repositoryName + thisPath.substring(repositoryDirectory.length)

    const content = fs.readFileSync(thisPath, 'binary')
    const contentBase64 = Buffer.from(content, 'binary').toString('base64')

    return res.status(200).send(
      JSON.stringify({
        absolutepath: normalizedPath,
        pathparts: normalizedPath.split(path.sep),
        contentBase64: contentBase64,
        pathsep: path.sep,
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
