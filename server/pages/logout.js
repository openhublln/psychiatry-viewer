import { useEffect, useState } from 'react'
import MainComponent from '../components/mainComponent'
import { AiOutlineLogout } from 'react-icons/ai'

export default function Logout() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then(() => setMessage('Logged out.'))
      .catch((error) => {
        console.error('An unexpected error happened:', error)
        setMessage(error.message ?? error.toString())
      })
  })

  return (
    <MainComponent>
      <div className="logout">
        <div>
          <AiOutlineLogout style={{ fontSize: '50px' }} />
          <h1 className="logoutmessage">{message}</h1>
        </div>
      </div>
    </MainComponent>
  )
}
