import React from 'react'
import { Button, Modal, Input, Space } from 'antd'

/**
 * The dialogue for adding of new configuration
 */
export default class NewConfigurationDialog extends React.Component {
  constructor(props) {
    super(props)
    props.dialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })

    this.state = {
      visible: false,
      name: '',
      value: '',
      errorMessage: null,
    }
  }

  componentDidUpdate(prevProps) {
    this.props.dialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    this.props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })
  }

  handleOk() {
    if (this.state.name.trim() === '' || this.state.value.trim() === '') {
      this.setState({
        visible: true,
        errorMessage:
          'Enter the name and value of the new configuration parameter',
      })
    } else {
      this.setState({ errorMessage: null })
      this.props.onNewConfiguration(this.state.name, this.state.value)
    }
  }

  handleCancel() {
    this.setState({ visible: false, errorMessage: null })
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <Modal
        className="newConfigDataDialog"
        open={this.state.visible}
        destroyOnClose={true}
        closable={false}
        onOk={() => this.handleOk()}
        footer={[
          <Button key="cancel" onClick={() => this.handleCancel()}>
            {' '}
            Cancel
          </Button>,
          <Button key="ok" onClick={() => this.handleOk()}>
            {' '}
            OK
          </Button>,
        ]}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          New Configuration Parameter
        </h2>
        {this.state.errorMessage ? (
          <h3 style={{ color: 'red' }}>{this.state.errorMessage}</h3>
        ) : null}
        <Space direction="vertical">
          <Space.Compact block>
            <label style={{ width: '70px' }}>Name: </label>
            <Input
              style={{ width: '400px' }}
              defaultValue={this.state.name}
              placeholder="Enter the configuration name"
              onChange={(e) => this.onChangeName(e)}
            />
          </Space.Compact>
          <Space.Compact block>
            <label style={{ width: '70px' }}>Value: </label>
            <Input
              style={{ width: '400px' }}
              defaultValue={this.state.value}
              placeholder="Enter the configuration value"
              onChange={(e) => this.onChangeValue(e)}
            />
          </Space.Compact>
        </Space>
      </Modal>
    )
  }
}
