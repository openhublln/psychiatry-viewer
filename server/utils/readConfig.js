import fs from 'fs'
import yaml from 'js-yaml'

const dev = process.env.NODE_ENV !== 'production'
export const readSystemConfigData = function () {
  let data = null
  try {
    if (dev) {
      let fileContents = fs.readFileSync('config/config_dev.yaml', 'utf8')
      data = yaml.load(fileContents)
    } else {
      let fileContents = fs.readFileSync('config/config_prod.yaml', 'utf8')
      data = yaml.load(fileContents)
    }

    // load secrets
    const secretsContents = fs.readFileSync(data.secretsPath, 'utf8')
    const secretsData = yaml.load(secretsContents)

    return { ...data, ...secretsData }
  } catch (e) {
    console.log('Error message: ', e)
  }
}
