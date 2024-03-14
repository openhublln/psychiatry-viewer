import React from 'react'
import { Button, Modal } from 'antd'

/**
 * The data table for missing data names
 * @param {Object} data - The missing data name
 * @returns The data table
 */
function MissingDataColumnMessageTable({ data }) {
  const result = (
    <table
      className="missingDataMessageTable"
      style={{
        border: 'solid 1px grey',
        fontSize: '16px',
        padding: '2px',
        textAlign: 'center',
        width: '100%',
        overflow: 'auto',
        maxHeight: '600px',
      }}
    >
      <thead>
        <tr>
          <th
            className="missingDataTyoe"
            rowSpan="1"
            style={{
              border: 'solid 1px black',
              textAlign: 'center',
              fontSize: '14px',
              padding: '2px',
              backgroundColor: 'grey',
              color: 'white',
            }}
          >
            Data Group
          </th>
          <th
            className="dataTime"
            style={{
              border: 'solid 1px black',
              textAlign: 'center',
              fontSize: '14px',
              padding: '2px',
              backgroundColor: 'grey',
              color: 'white',
            }}
          >
            Time
          </th>
          <th
            className="columnName"
            style={{
              border: 'solid 1px black',
              textAlign: 'center',
              fontSize: '14px',
              padding: '2px',
              backgroundColor: 'grey',
              color: 'white',
            }}
          >
            Missing Columns
          </th>
        </tr>
      </thead>
      <tbody className="missingDataColumnTBody">
        {data.map((item) => (
          <tr key={'tdodyRowKey'} className="missingDataColumnTR">
            <td
              style={{
                border: 'solid 1px #DEDEDE',
                color: 'black',
                fontSize: '14px',
                textAlign: 'center',
                padding: '2px',
              }}
            >
              <div className="dataGroupDiv">
                <spam
                  className="datagroup"
                  style={{
                    textAlign: 'center',
                    width: 'fit-content',
                  }}
                >
                  {item.datagroup}
                </spam>
              </div>
            </td>
            <td
              style={{
                border: 'solid 1px #DEDEDE',
                color: '#934e00',
                fontSize: '14px',
                textAlign: 'center',
                padding: '2px',
              }}
            >
              <div className="dataTime">
                <spam
                  className="datatime"
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {item.time}
                </spam>
              </div>
            </td>
            <td
              style={{
                border: 'solid 1px #DEDEDE',
                color: 'blue',
                fontSize: '14px',
                textAlign: 'center',
                padding: '2px',
              }}
            >
              <div className="columnNameDiv">
                <span
                  className="columnName"
                  style={{
                    textAlign: 'center',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {item.colmnname}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  return result
}

/**
 * The data table display dialogue for missing data names
 */
export default class MissingDataColumnMessageDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible,
      })
    }
  }

  // create the speical table data
  createTableData({
    missingGeneralColumn = null,
    missingTotalColumn = null,
    missingSpecialColumn = null,
  }) {
    let result = []
    if (missingGeneralColumn !== null && missingGeneralColumn.length !== 0) {
      for (let i = 0; i < missingGeneralColumn.length; i++) {
        result.push({
          datagroup: 'General column',
          time: missingGeneralColumn[i].time,
          colmnname: missingGeneralColumn[i].missingCols?.toString(),
        })
      }
    } else if (missingTotalColumn !== null && missingTotalColumn.length !== 0) {
      for (let t = 0; t < missingTotalColumn.length; t++) {
        result.push({
          datagroup: 'Score column',
          time: missingTotalColumn[t].time,
          colmnname: missingTotalColumn[t].missingCols?.toString(),
        })
      }
    } else if (
      missingSpecialColumn !== null &&
      missingSpecialColumn.length !== 0
    ) {
      for (let s = 0; s < missingSpecialColumn.length; s++) {
        result.push({
          datagroup: 'Special data',
          time: missingSpecialColumn[s].time,
          colmnname: missingSpecialColumn[s].missingCols?.toString(),
        })
      }
    }
    return result
  }

  render() {
    const missingTableData = this.createTableData({
      missingGeneralColumn: this.props.missingGeneralColumn,
      missingTotalColumn: this.props.missingTotalColumn,
      missingSpecialColumn: this.props.missingSpecialColumn,
    })
    return (
      <div>
        <Modal
          title="This graph is incomplete because the following information is missing:"
          className="displayDataColumnMissingModal"
          open={this.state.visible}
          closable={false}
          destroyOnClose={true}
          onOk={() =>
            this.setState({
              visible: false,
            })
          }
          footer={[
            <Button
              key="ok"
              onClick={() =>
                this.setState({
                  visible: false,
                })
              }
            >
              Ok
            </Button>,
          ]}
        >
          <div className="missingDataColumnMessageTableDiv">
            <MissingDataColumnMessageTable data={missingTableData} />
          </div>
        </Modal>
      </div>
    )
  }
}
