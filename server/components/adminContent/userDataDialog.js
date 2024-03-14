import React from 'react'
import { Button, Modal, Form, Select, Input } from 'antd'
import { Hospitals, Role, UserFunctions } from '../../models/userModel'
import Styles from './admincontent.module.css'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}

export default class UserDataDialog extends React.Component {
  constructor(props) {
    super(props)
    props.dialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })
    props.dialogFunctions.setUser = (user) => this.setUser(user)

    this.formRef = React.createRef()

    this.state = {
      visible: false,
      errorMessage: null,
      isNewUser: true,
      user: {
        username: '',
        prename: '',
        name: '',
        niss: '',
        email: '',
        role: '',
        userFunction: '',
        birthdate: '',
        phonenumber: '',
        hospital: '',
      },
    }
  }

  setUser(user) {
    this.setState({
      isNewUser: !user,
      user: user
        ? { ...user }
        : {
            username: '',
            prename: '',
            name: '',
            niss: '',
            email: '',
            role: '',
            userFunction: '',
            birthdate: '',
            phonenumber: '',
            hospital: '',
          },
    })
  }

  fetchFormData(data) {
    return {
      username: data.username ?? data.username,
      prename: data.prename ?? data.prename,
      name: data.name ?? data.name,
      niss: data.niss ? data.niss : null,
      birthdate: data.birthdate ? data.birthdate.toString() : null,
      role: data.role ?? data.role,
      userFunction: data.userFunction ?? data.userFunction,
      hospital: data.hospital ?? data.hospital,
      phonenumber: data.phonenumber ?? data.phonenumber,
      email: data.email ?? data.email,
      password:
        data.password && data.password.trim().length !== 0
          ? data.password.trim()
          : null,
    }
  }

  componentDidUpdate(prevProps) {
    this.props.dialogFunctions.setVisible = (isVisible) => {
      this.setState({ visible: isVisible })
    }
    this.props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })
    this.props.dialogFunctions.setUser = (user) => this.setUser(user)
  }

  handleOk() {
    this.formRef.current
      .validateFields()
      .then((values) => {
        this.setState({ errorMessage: null })
        this.props.onUserEdited(
          this.fetchFormData(values),
          this.state.isNewUser,
        )
      })
      .catch(() => {})
  }

  handleCancel() {
    this.setState({ visible: false, errorMessage: null })
  }

  render() {
    const user = this.state.user
    const isNewUser = this.state.isNewUser
    return (
      <div>
        <Modal
          className={Styles.userDataModalDialog}
          open={this.state.visible}
          destroyOnClose={true}
          closable={false}
          onOk={() => this.handleOk()}
          footer={[
            <Button key="cancel" onClick={() => this.handleCancel()}>
              Cancel
            </Button>,
            <Button key="ok" onClick={() => this.handleOk()}>
              OK
            </Button>,
          ]}
        >
          <h2 className="userDataHeaderLabel" style={{ margin: '4px' }}>
            User Data
          </h2>
          {this.state.errorMessage ? (
            <h3 style={{ color: 'red' }}>{this.state.errorMessage}</h3>
          ) : null}
          <Form
            {...formItemLayout}
            className={Styles.userDataForm}
            initialValues={user}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input disabled={!isNewUser} />
            </Form.Item>
            <Form.Item
              name="prename"
              label="Prénom"
              rules={[{ required: true }]}
            >
              <Input disabled={!isNewUser} />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nom"
              rules={[{ required: true }]}
            >
              <Input disabled={!isNewUser} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Select your role' }]}
            >
              <Select placeholder="Select a role" allowClear>
                <Option value="Admin">{Role.admin}</Option>
                <Option value="Expert">{Role.expert}</Option>
                <Option value="No Expert">{Role.noexpert}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="userFunction"
              label="Function"
              rules={[{ required: true, message: 'Select your function' }]}
            >
              <Select placeholder="Select the user function" allowClear>
                <Option value="psychiatrist">
                  {UserFunctions.psychiatrist}
                </Option>
                <Option value="psychologist">
                  {UserFunctions.psychologist}
                </Option>
                <Option value="occupationalTherapist">
                  {UserFunctions.occupationalTherapist}
                </Option>
                <Option value="educator">{UserFunctions.educator}</Option>
                <Option value="nurse">{UserFunctions.nurse}</Option>
                <Option value="physicalTherapist">
                  {UserFunctions.physicalTherapist}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="hospital"
              label="Hôpital"
              rules={[
                { required: true, message: 'Select your working hospital' },
              ]}
            >
              <Select placeholder="Select a role" allowClear>
                <Option value="BV">{Hospitals.BV}</Option>
                <Option value="SL">{Hospitals.SL}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: isNewUser,
                  message: 'Enter the password',
                },
              ]}
              hasFeedback
            >
              <Input.Password maxLength="10" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: isNewUser,
                  message: 'Confirm the password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input.Password maxLength="10" />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: '100%' }} maxLength="14" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
