import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MainComponent from '../../components/mainComponent'
import RegistrationForm from '../../components/loginForm/registrationForm'
import { MyAlert } from '../../components/myAlert'

export default function Registration() {
  const router = useRouter()
  const { uuid } = router.query
  const [errorMsg, setErrorMsg] = useState(null)
  const [otpAuthURL, setOTPAuthURL] = useState(null)

  useEffect(() => {
    setErrorMsg(null)
    async function getOTPAuthURL() {
      try {
        const res = await fetch('/api/otpauthurl', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            registrationuuid: uuid,
          }),
        })

        if (res.status < 400) {
          setOTPAuthURL((await res.json()).otpauthurl)
        } else {
          throw await res.text()
        }
      } catch (error) {
        setErrorMsg(error)
      }
    }
    if (uuid) {
      getOTPAuthURL()
    }
  }, [uuid])

  const onSubmit = function (e) {
    setErrorMsg(null)
    async function sendValidationCode() {
      try {
        const res = await fetch('/api/otpauthvalidation', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            registrationuuid: uuid,
            validationcode: e.validationCode,
          }),
        })
        if (res.status < 400) {
          router.push('/login')
          return MyAlert(
            'User account validated',
            'You user account has been successfully validated. You can now log in using your password and your authenticator app.'
          )
        } else {
          throw await res.text()
        }
      } catch (error) {
        setErrorMsg(error)
      }
    }
    if (e.validationCode) {
      sendValidationCode()
    }
  }

  return (
    <MainComponent isLoggedIn={false}>
      <div className="registration">
        <RegistrationForm
          error={errorMsg}
          otpAuthURL={otpAuthURL}
          onSubmit={onSubmit}
        ></RegistrationForm>
      </div>
    </MainComponent>
  )
}
