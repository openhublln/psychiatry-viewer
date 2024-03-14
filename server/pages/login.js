import { useState } from 'react'
import Router from 'next/router'
import LoginForm from '../components/loginForm/loginForm'
import MainComponent from '../components/mainComponent'

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function onSubmit(e) {
    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.username,
      password: e.password,
      validationcode: e.validationcode,
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 200) {
        setIsLoggedIn(true)
        Router.push('/')
      } else {
        setIsLoggedIn(false)
        throw await res.text()
      }
    } catch (error) {
      setIsLoggedIn(false)
      setErrorMsg(error)
    }
  }

  return (
    <MainComponent isLoggedIn={isLoggedIn}>
      <div className="login">
        <LoginForm errorMessage={errorMsg} onSubmit={onSubmit} />
      </div>
    </MainComponent>
  )
}
