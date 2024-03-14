import { readConfigData } from './utils/readConfig'
const handle = app.getRequestHandler()

const { createServer } = require('https')
const { parse } = require('url')
const { readFileSync } = require('fs')
const next = require('next')

const httpsOptions = {
  key: readFileSync('./.ssl/server.key'),
  cert: readFileSync('./.ssl/server.crt'),
}

// const port = 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const config = readConfigData()
const port = config.port

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on https://localhost:${port}`)
  })
})
