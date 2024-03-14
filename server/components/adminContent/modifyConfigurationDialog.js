import React from 'react'
import { Button, Modal, Input } from 'antd'
import Styles from './admincontent.module.css'

/**
 * The dialogue for the modification of the configuration
 */
export default class ModifyConfigurationDialog extends React.Component {
  constructor(props) {
    super(props)
    props.dialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })

    this.state = {
      visible: false,
      value: this.props.configData?.value,
      errorMessage: null,
    }
  }

  componentDidUpdate(prevProps) {
    this.props.dialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    this.props.dialogFunctions.setErrorMessage = (errorMessage) =>
      this.setState({ errorMessage })

    if (prevProps.configData !== this.props.configData) {
      this.setState({ value: this.props.configData?.value })
    }
  }

  handleOk() {
    if (!this.state.value || this.state.value.trim() === '') {
      this.setState({ visible: true, errorMessage: 'Please provide a value' })
    } else {
      this.setState({ errorMessage: null })
      this.props.onModifyConfigData(
        this.props.configData.name,
        this.state.value,
      )
    }
  }

  handleCancel() {
    this.setState({ value: this.props.configData?.value })
    this.setState({ visible: false, errorMessage: null })
  }

  onChangeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <Modal
          className="modifyConfigDataDialog"
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
          width={700}
          height={300}
        >
          <h2 className="modifyConfigDataLabel" style={{ margin: '4px' }}>
            {this.props.configData?.name}
          </h2>
          {this.state.errorMessage ? (
            <h3 style={{ color: 'red' }}>{this.state.errorMessage}</h3>
          ) : null}
          <div className="modifyConfigDiv">
            <div className="modifyConfigValueDiv">
              <Input
                className={Styles.modifyConfigInput}
                type="text"
                value={this.state.value}
                onChange={(e) => this.onChangeValue(e)}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
