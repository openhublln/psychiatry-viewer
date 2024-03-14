import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import {
  useTable,
  useRowSelect,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table'
import { ColumnFilter } from '../componentsUtils/filters'
import { FiDelete } from 'react-icons/fi'
import UserDataDialog from './userDataDialog'
import { HiUserAdd } from 'react-icons/hi'
import { Layout, Modal, Button, Input, Select } from 'antd'
import ConfirmNewUserDialog from './confirmAddUserDialog'

import Styles from './admincontent.module.css'

const { Content } = Layout
const { confirm } = Modal

// ******** api ***************************
async function apiLoadUsers() {
  const response = await fetch('/api/admin/user', {
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

export async function apiNewUser(userData) {
  const response = await fetch('/api/admin/user', {
    method: 'POST',
    body: JSON.stringify(userData),
    header: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status < 400) {
    return await response.json()
  } else {
    throw await response.text()
  }
}

async function apiUpdateUser(userData) {
  const response = await fetch('/api/admin/user', {
    method: 'PUT',
    body: JSON.stringify(userData),
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

async function apiDeleteUser(username) {
  const response = await fetch(
    '/api/admin/user?' + new URLSearchParams({ username: username }),
    {
      method: 'DELETE',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response.status < 400) {
    return
  } else {
    throw await response.text()
  }
}

// =====================================================================
export const UserTable = ({
  users,
  onClickDeleteUser,
  onClickModifyUser,
  onClickAddNewUser,
}) => {
  // User table
  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'NISS', accessor: 'niss' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Status', accessor: 'status' },
    ],
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

  function showConfirm(entry) {
    confirm({
      title: 'Delete User',
      content: 'Do you want to delete this user?',
      onOk() {
        onClickDeleteUser(entry)
      },
      onCancel() {},
    })
  }

  const data = users
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
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
      autoResetSelectedRows: false,
      initialState: {
        sortBy: [
          {
            id: 'username',
            desc: false,
          },
        ],
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'modify',
          Cell: ({ row }) => (
            <MdOutlineEdit
              className={Styles.userModifyTD}
              value={row}
              title="Modify User Information"
              onClick={() => onClickModifyUser(row.original)}
            />
          ),
        },
        {
          id: 'delete',
          cell: () => <div />,
        },
      ])
    },
  )
  return (
    <div
      className="tableDiv"
      style={{
        position: 'absolute',
        top: '65px',
        left: '200px',
        width: '86%',
        height: '75%',
        minHeight: '70%',
        maxHeight: '80%',
      }}
    >
      <table className={Styles.userTable} {...getTableProps()}>
        <thead key={'tableHeaderKey'}>
          {headerGroups.map((headerGroup) => (
            <tr
              key={'tableRowKey'}
              className="userTableHeaderTRleft"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={'headerRowKey'}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={Styles.headerStyle}
                >
                  {column.id === 'delete' ? (
                    <HiUserAdd
                      className={Styles.addNewConfigBtn}
                      title="Add a new configuration entry"
                      onClick={() => onClickAddNewUser()}
                    />
                  ) : (
                    <div className="userTableThDiv">
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
          {headerGroups.map((headerGroup) => (
            <tr
              key={'tableRowkey'}
              className="userTableHeaderTRRight"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th key={'rowHeaderKey'} className={Styles.headerStyle}>
                  {column.id === 'modify' || column.id === 'delete'
                    ? null
                    : column.render('Filter')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          key={'tableBodyKey'}
          className="userTableTBody"
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr
                key={'tbodyRowKey'}
                {...row.getRowProps(getTrProps(row))}
                className="userTableTR"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={'tbodyRowdataKey'}
                      {...cell.getCellProps()}
                      className={Styles.tdStyle}
                    >
                      {cell.column.id === 'delete' && !cell.value ? (
                        <FiDelete
                          className={Styles.deleteBtnIcon}
                          onClick={() => showConfirm(row.original)}
                        />
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
      <div className={Styles.paginationDiv}>
        <span style={{ color: 'black' }}>
          {'Page '}
          <strong style={{ color: 'black', marginRight: '8px' }}>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span style={{ color: 'black', height: '30px' }}>
          | Go to page{' '}
          <Input
            type={'number'}
            defaultValue={pageIndex}
            value={pageIndex}
            onChange={(e) => {
              const pageIndex = e.target.value ? Number(e.target.value) : 0
              gotoPage(pageIndex)
            }}
            style={{ width: '60px', color: 'black' }}
          />
        </span>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{ color: 'black', marginLeft: '20px' }}
          options={[
            {
              value: 5,
              label: 'Show 5',
            },
            {
              value: 10,
              label: 'Show 10',
            },
            {
              value: 15,
              label: 'Show 15',
            },
            {
              value: 20,
              label: 'Show 20',
            },
          ]}
        />
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          style={{
            color: 'white',
            marginLeft: '10px',
            marginRight: '5px',
            backgroundColor: 'darkblue',
          }}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            color: 'white',
            marginRight: '5px',
            backgroundColor: 'darkblue',
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            color: 'white',
            marginRight: '5px',
            backgroundColor: 'darkblue',
          }}
        >
          Next
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          style={{
            color: 'white',
            marginRight: '5px',
            backgroundColor: 'darkblue',
          }}
        >
          {'>>'}
        </Button>
      </div>
    </div>
  )
}

/**
 * The user management
 * @returns The user management component
 */
export default function ManageUsers() {
  const userDataDialogFunctions = {}
  const confirmDialogFunctions = {}

  const [mUsers, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [newUserInfo, setNewUserInfo] = useState({})

  const loadUsers = () => {
    apiLoadUsers()
      .then((users) => {
        setUsers(users)
        setErrorMessage(null)
      })
      .catch((error) => setErrorMessage(error))
  }

  useEffect(() => loadUsers(), [])

  const handleAddNewUser = () => {
    userDataDialogFunctions.setUser(null)
    userDataDialogFunctions.setVisible(true)
  }

  const handleModifyUser = (user) => {
    userDataDialogFunctions.setUser(user)
    userDataDialogFunctions.setVisible(true)
  }

  const handleDeleteUser = (user) => {
    apiDeleteUser(user.username)
      .then(() => loadUsers())
      .catch((error) => setErrorMessage(error))
  }

  const userEdited = (userData, isNewUser) => {
    if (isNewUser) {
      apiNewUser(userData)
        .then((result) => {
          setNewUserInfo({
            username: userData.username,
            email: userData.email,
            registrationUrl: result.registrationurl,
          })
          userDataDialogFunctions.setVisible(false)
          loadUsers()
          confirmDialogFunctions.setVisible(true)
        })
        .catch((error) => userDataDialogFunctions.setErrorMessage(error))
    } else {
      apiUpdateUser(userData)
        .then(() => {
          userDataDialogFunctions.setVisible(false)
          loadUsers()
        })
        .catch((error) => userDataDialogFunctions.setErrorMessage(error))
    }
  }

  return (
    <Content className={Styles.manageUserContent}>
      <div className="userTableDiv">
        <UserTable
          users={mUsers}
          onClickModifyUser={(entry) => handleModifyUser(entry)}
          onClickDeleteUser={(entry) => handleDeleteUser(entry)}
          onClickAddNewUser={() => handleAddNewUser()}
        />
      </div>
      <div>
        {errorMessage ? <h3 style={{ color: 'red' }}>{errorMessage}</h3> : null}
        <UserDataDialog
          dialogFunctions={userDataDialogFunctions}
          onUserEdited={(data, isNewUser) => userEdited(data, isNewUser)}
        />
      </div>
      <ConfirmNewUserDialog
        newUserInfo={newUserInfo}
        confirmDialogFunctions={confirmDialogFunctions}
      />
    </Content>
  )
}
