import React from 'react'
import { Button, Radio, Space, Modal } from 'antd'
import { ViewType } from '../../../models/dataset'

/**
 * Select visualization dialogue
 */
export default class SelectVisualizationDialog extends React.Component {
  constructor(props) {
    super(props)
    props.selectVisualizationDialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    this.state = {
      visible: false,
      viewType: this.props.viewType,
    }
  }

  componentDidUpdate(prevProps) {
    this.props.selectVisualizationDialogFunctions.setVisible = (isVisible) =>
      this.setState({ visible: isVisible })
    if (prevProps.viewType !== this.props.viewType) {
      this.setState({ value: this.props.viewType })
    }
  }

  handleOK() {
    this.setState({ visible: false })
  }

  handleCancel() {
    this.props.setViewType(this.props.viewType)
    this.setState({ visible: false })
  }

  onChangeValue = (e) => {
    this.setState({ viewType: e.target.value })
    this.props.setViewType(e.target.value)
  }

  render() {
    return (
      <div>
        <Modal
          className="selectDiseaseDialog"
          title="Choice Visualisation"
          open={this.state.visible}
          destroyOnClose={true}
          closable={false}
          onOk={() => this.handleOk()}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                this.handleCancel()
              }}
            >
              Cancel
            </Button>,
            <Button key="ok" onClick={() => this.handleOK()}>
              Ok
            </Button>,
          ]}
          width={600}
          height={300}
        >
          <Radio.Group
            onChange={(e) => this.onChangeValue(e)}
            value={this.props.viewType}
          >
            <Space direction="horizonal" style={{ marginTop: '25px' }}>
              <Radio value={ViewType.medicin} style={{ marginRight: '40px' }}>
                {ViewType.medicin}
              </Radio>
              <Radio value={ViewType.autre}>{ViewType.autre}</Radio>
            </Space>
          </Radio.Group>
        </Modal>
      </div>
    )
  }
}
