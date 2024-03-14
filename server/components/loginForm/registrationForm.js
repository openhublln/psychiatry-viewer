import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Form } from 'antd'
import QRCode from 'qrcode'
import Styles from './loginForm.module.css'

const RegistrationForm = ({ error, onSubmit, otpAuthURL }) => {
  const [errorMessage, setErrorMessage] = useState(error)
  const canvasRef = useRef()

  useEffect(() => {
    if (otpAuthURL) {
      QRCode.toCanvas(
        canvasRef.current,
        otpAuthURL,
        (err) => err && setErrorMessage(err),
      )
    }
  })

  if (!otpAuthURL) {
    return (
      <div style={{ color: 'red', fontSize: '14px' }}>
        {errorMessage && <h3 className="error">{errorMessage}</h3>}
      </div>
    )
  } else
    return (
      <Form
        className={Styles.validationform}
        name="validation_login"
        initialValues={{
          remember: 'true', // Not: late remove
        }}
        onFinish={onSubmit}
      >
        {errorMessage && errorMessage !== null && errorMessage !== '' ? (
          <div style={{ color: 'red', fontSize: '14px' }}>
            <h3 className="error">{errorMessage}</h3>
          </div>
        ) : (
          <div />
        )}
        <div className="twoFactorAuthDiv" style={{ display: 'inline-block' }}>
          <h2 style={{ textAlign: 'center' }}>
            Set up Two-factor Authentication
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#CC5500',
            }}
          >
            Open the authenticator app on your mobile device and setup a new
            account using the QR code below. Then, enter the 6-digit
            authentication code shown by the app.
          </p>
        </div>
        <Form.Item>
          <div className={Styles.barcodeDiv}>
            <canvas ref={canvasRef} />
          </div>
        </Form.Item>
        <Form.Item
          name="validationCode"
          rules={[
            {
              required: true,
              message: 'Enter your authentication code',
            },
          ]}
        >
          <Input
            id="validationCode"
            label="Authentication Code"
            placeholder="Enter authentication code"
            type="text"
          />
        </Form.Item>
        <Form.Item name="confirmValidation">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ float: 'right' }}
          >
            Validate your account
          </Button>
        </Form.Item>
      </Form>
    )
}

export default RegistrationForm
