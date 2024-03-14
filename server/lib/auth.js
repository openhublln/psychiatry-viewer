import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth_cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

// // Use an environment variable here instead of a hardcoded value for production
// const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters";

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  return setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) return

  return session
}
