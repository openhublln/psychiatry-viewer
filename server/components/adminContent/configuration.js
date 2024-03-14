import React, { useState, useMemo, useEffect } from 'react'
import { Layout } from 'antd'
import {
  useTable,
  useRowSelect,
  useResizeColumns,
  useSortBy,
  usePagination,
} from 'react-table'
import { ColumnFilter } from '../componentsUtils/filters'
import { FiDelete } from 'react-icons/fi'
import { MdOutlineMode } from 'react-icons/md'
import { CgAddR } from 'react-icons/cg'
import ModifyConfigurationDialog from './modifyConfigurationDialog'
import NewConfigurationDialog from './newConfigurationDialog'
import Styles from './admincontent.module.css'

const { Content } = Layout

// ******** api ***************************************
/**
 * API load configuration
 */
async function apiLoadConfiguration() {
  const response = await fetch('/api/admin/config', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status < 400) {
    return await response.json()
  } else {
    throw await response.text()
  }
}

/**
 * API add the new configuration
 */
async function apiNewConfiguration(name, value) {
  const response = await fetch('/api/admin/config', {
    method: 'POST',
    body: JSON.stringify({ name: name, value: value, nodelete: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status < 400) {
    return
  } else {
    throw await response.text()
  }
}

/**
 * API to update the configuration
 * @param {*} name: data name
 * @param {*} newValue: data value
 * @returns API response
 */
async function apiUpdateConfiguration(name, newValue) {
  const response = await fetch('/api/admin/config', {
    method: 'PUT',
    body: JSON.stringify({ name: name, value: newValue }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status < 400) {
    return
  } else {
    throw await response.text()
  }
}

/**
 * API delete the configuration
 * @param {*} name: configure data name
 * @returns
 */
async function apiDeleteConfiguration(name) {
  const response = await fetch('/api/admin/config', {
    method: 'DELETE',
    body: JSON.stringify({ name: name }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status < 400) {
    return
  } else {
    throw await response.text()
  }
}

//************************************************** */
/**
 *
 * @param {*}
 * @returns configuration data table
 */
export const ConfigurationTable = ({
  configData,
  onClickDeleteConfigData,
  onClickModifyConfigData,
  onClickAddNewConfigData,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Configuration Name',
        accessor: 'name',
        width: '200px',
      },
      {
        Header: 'Value',
        accessor: 'value',
        width: '65%',
      },
      {
        Header: '',
        accessor: 'nodelete',
        width: '100px',
      },
    ],
    [],
  )
  const data = React.useMemo(() => configData, [configData])
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  )

  const getTrProps = (row) => {
    if (row) {
      return {
        style: {
          background: row.index % 2 === 0 ? '#e1f8dc' : 'white',
          color: 'black',
        },
      }
    }
    return {}
  }

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        stateReducer: (newState, action) => {
          if (action.type === 'toggleRowSelected') {
            newState.selectedRowIds = {
              [action.name]: true,
            }
          }
          return newState
        },
        defaultColumn,
        autoResetSortBy: false,
        autoResetSelectedRows: false,
        initialState: {
          sortBy: [
            {
              id: 'configname',
              desc: false,
            },
          ],
        },
      },
      useSortBy,
      useResizeColumns,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          columns[0],
          columns[1],
          {
            id: 'modify',
            Cell: ({ row }) => (
              <div>
                <MdOutlineMode
                  className={Styles.modifyConfigTD}
                  value={row}
                  title="Modify the configuration data"
                  onClick={() => onClickModifyConfigData(row.original)}
                />
              </div>
            ),
          },
          columns[2],
        ])
      },
    )
  return (
    <>
      <table className={Styles.configTable} {...getTableProps()}>
        <thead key={'configTableHeaderKey'}>
          {headerGroups.map((headerGroup) => (
            <tr
              key={'tHeadkey'}
              className="configTableHeaderTRleft"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={'configTableThKey'}
                  className={Styles.headerStyle}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ width: column.width }}
                >
                  {column.id === 'nodelete' ? (
                    <td>
                      {
                        <CgAddR
                          className={Styles.addNewConfigBtn}
                          title="Add a new configuration entry"
                          onClick={(event) => onClickAddNewConfigData()}
                        />
                      }
                    </td>
                  ) : (
                    <div className="configTableThDiv">
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="configTableTBody" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr
                key={'tableRowKey'}
                {...row.getRowProps(getTrProps(row))}
                className="configTableTR"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={'tableTdKey'}
                      {...cell.getCellProps()}
                      className={Styles.tdStyle}
                    >
                      {cell.column.id === 'nodelete' ? (
                        !cell.value ? (
                          <FiDelete
                            className={Styles.deleteBtnIcon}
                            onClick={(event) =>
                              onClickDeleteConfigData(row.original)
                            }
                          />
                        ) : null
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

/**
 * The configuration component for admin
 */
export default function Configuration() {
  const newConfigurationDialogFunctions = {}
  const modifyConfigurationDialogFunctions = {}

  const [data, setData] = useState([])
  const [selectedConfig, setSelectedConfig] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const loadConfiguration = () => {
    apiLoadConfiguration()
      .then((configData) => {
        setData(configData)
        setErrorMessage(null)
      })
      .catch((error) => setErrorMessage(error))
  }

  useEffect(() => loadConfiguration(), [])

  const handleAddNewConfiguration = () => {
    newConfigurationDialogFunctions.setVisible(true)
  }

  const handleModifyConfiguration = (entry) => {
    setSelectedConfig(entry)
    modifyConfigurationDialogFunctions.setVisible(true)
  }

  const handleDeleteConfiguration = (entry) => {
    apiDeleteConfiguration(entry.name)
      .then(() => loadConfiguration())
      .catch((error) => setErrorMessage(error))
  }

  const newConfiguration = (name, value) => {
    apiNewConfiguration(name, value)
      .then(() => {
        newConfigurationDialogFunctions.setVisible(false)
        loadConfiguration()
      })
      .catch((error) => newConfigurationDialogFunctions.setErrorMessage(error))
  }

  const updateConfiguration = (name, newValue) => {
    apiUpdateConfiguration(name, newValue)
      .then(() => {
        modifyConfigurationDialogFunctions.setVisible(false)
        loadConfiguration()
      })
      .catch((error) =>
        modifyConfigurationDialogFunctions.setErrorMessage(error),
      )
  }

  return (
    <>
      <Content className={Styles.configContent}>
        <div className={Styles.configTableDiv}>
          <ConfigurationTable
            configData={data}
            onClickDeleteConfigData={(entry) =>
              handleDeleteConfiguration(entry)
            }
            onClickModifyConfigData={(entry) =>
              handleModifyConfiguration(entry)
            }
            onClickAddNewConfigData={() => handleAddNewConfiguration()}
          />
        </div>
        {errorMessage ? <h3 style={{ color: 'red' }}>{errorMessage}</h3> : null}
        <ModifyConfigurationDialog
          dialogFunctions={modifyConfigurationDialogFunctions}
          onModifyConfigData={(name, newValue) =>
            updateConfiguration(name, newValue)
          }
          configData={selectedConfig}
        />
        <NewConfigurationDialog
          dialogFunctions={newConfigurationDialogFunctions}
          onNewConfiguration={(name, value) => newConfiguration(name, value)}
        />
      </Content>
    </>
  )
}
