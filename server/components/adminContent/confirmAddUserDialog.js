import React from 'react'
import { Button, Modal } from 'antd'

/**
 * The confirmation dialog for adding of new user
 */
export default class ConfirmNewUserDialog extends React.Component {
  constructor(props) {
    super(props)
    props.confirmDialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })

    this.state = {
      visible: false,
    }
  }
  componentDidUpdate(prevProps) {
    this.props.confirmDialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
  }

  handleCancel() {
    this.setState({ visible: false })
  }

  handleOk() {
    setTimeout(() => {
      this.setState({ visible: false })
    }, 3000)
  }

  render() {
    if (!this.props.newUserInfo.username) {
      return <div></div>
    }

    const emailBody = `Your account for the PsychiatryViewer web application has been created. Your username is ${this.props.newUserInfo.username}. Open the website ${this.props.newUserInfo.registrationUrl} in your browser to complete the registration.`
    const mailtoHref = `mailto:${this.props.newUserInfo.email}?subject=PsychiatryViewer account created&body=${emailBody}`
    return (
      <div>
        <Modal
          open={this.state.visible}
          style={{ width: '400px' }}
          title="New user account created"
          destroyOnClose={true}
          closable={false}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
          footer={[
            <Button key="back" onClick={() => this.handleCancel()}>
              Cancel
            </Button>,
            <Button
              key="link"
              href={mailtoHref}
              type="primary"
              onClick={() => this.handleOk()}
            >
              Prepare e-mail
            </Button>,
          ]}
        >
          <p>
            {`The account for user ${this.props.newUserInfo.username} has been
            created. Send them the registration link so they can complete the
            registration process.`}
          </p>
          <div style={{ display: 'inline-block' }}>
            <h3
              style={{ color: 'green' }}
            >{`Link: ${this.props.newUserInfo.registrationUrl}`}</h3>
            <h3
              style={{ color: 'orange' }}
            >{`Email: ${this.props.newUserInfo.email}`}</h3>
          </div>
        </Modal>
      </div>
    )
  }
}
