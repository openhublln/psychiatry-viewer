import React from 'react'
import { Button, Input, Form } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

// import UserDataDialog from '../adminContent/userDataDialog'
// import apiNewUser from '../adminContent/manageUsers'
import Styles from './loginForm.module.css'

/**
 * @param {String} errorMessage
 * @param {function} onSubmit - Event to submit login
 * @returns Login form
 */
const LoginForm = ({ errorMessage, onSubmit }) => {
  return (
    <Form
      name="normal_login"
      className={Styles.loginform}
      initialValues={{
        remember: 'true', // Not: late remove
      }}
      onFinish={onSubmit}
    >
      <Form.Item>
        <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Login</h2>
      </Form.Item>
      {errorMessage ? (
        <Form.Item style={{ display: 'inline-blox' }}>
          <p className="error">{errorMessage}</p>
        </Form.Item>
      ) : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div style={{ color: '#cc5500', fontSize: '15px', textAlign: 'center' }}>
        Use your authentication app to get the 6-digit authentication code
      </div>
      <Form.Item
        name="validationcode"
        rules={[
          {
            required: true,
            message: 'Please enter your authentication code',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Authentication code"
        />
      </Form.Item>
      <Form.Item style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
