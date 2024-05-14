import React, { useMemo } from 'react'
import {
  useTable,
  useRowSelect,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table'
import { ColumnFilter } from '../../componentsUtils/filters'
import { FaArrowCircleRight } from 'react-icons/fa'
import { ViewType } from '../../../models/dataset'
import { Button, Input, Select } from 'antd'
import Styles from './patientcontent.module.css'

/**
 * The data talbe for patients
 * @param {Object} patients - The patients
 * @param {function} onClickSelectPatient - select the patient event
 * @param {boolean} isExpert - the user permission
 * @returns
 */
export const PatientTable = ({ patients, onClickSelectPatient, isExpert }) => {
  const headerStyle = {
    border: 'solid 1px black',
    textAlign: 'center',
    fontSize: '14px',
    padding: '2px',
    background: '#DAE3EF',
    color: 'black',
    height: '40px',
  }

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

  const tdStyle = {
    padding: '1px',
    border: 'solid 1px grey',
    fontSize: '14px',
    textAlign: 'center',
    cursor: 'default',
    color: 'black',
  }

  const columns = useMemo(
    () => [
      {
        Header: "Pseudonyme de l'étude",
        accessor: 'name',
      },
      {
        Header: 'Sexe',
        accessor: 'sex',
      },
      {
        Header: 'Année de naissance',
        accessor: 'naissance',
      },
    ],
    [],
  )
  const data = patients
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  )

  const callSelectPatient = (row, viewType) => {
    onClickSelectPatient(row, viewType)
  }

  const extraColumns = () => {
    const columns = []; // Initialise un tableau vide pour stocker les colonnes
    if (isExpert) {
      // Si l'utilisateur est un expert, ajoutez deux colonnes au tableau
      columns.push({
        id: 'medicinView',
        Header: 'Réflexion Clinique',
        Cell: ({ row }) => <div />, // Assurez-vous que cela renvoie un élément valide
      });
      columns.push({
        id: 'patientView',
        Header: 'Entretien Clinique',
        Cell: ({ row }) => <div />, // Assurez-vous que cela renvoie un élément valide
      });
    } else {
      // Si l'utilisateur n'est pas un expert, ajoutez une seule colonne au tableau
      columns.push({
        id: 'patientView',
        Header: 'Entretien Clinique',
        Cell: ({ row }) => <div />, // Assurez-vous que cela renvoie un élément valide
      });
    }
    return columns;
  }

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
            id: 'name',
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
        columns[0],
        columns[1],
        columns[2],
        ...extraColumns(),
      ])
    },
  )
  return (
    <>
      <table className={Styles.patientTable} {...getTableProps()}>
        <thead key={'headerKey'}>
          {headerGroups.map((headerGroup) => (
            <tr
              key={'rowKey'}
              className="patientTableHeaderTR"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={'th_1_Key'}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={headerStyle}
                >
                  {
                    <div className="patientTableThDiv">
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                  }
                </th>
              ))}
            </tr>
          ))}
          {headerGroups.map((headerGroup) => (
            <tr
              key={'trkey'}
              className="patientTableHeaderTRRight"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={'th_2_Key' + column.id}
                  style={headerStyle}
                  className={'patientTableHeader' + column.id}
                >
                  {column.id === 'medicinView' ||
                  column.id === 'patientView' ? null : (
                    <td className="patientTabFilter">
                      {column.render('Filter')}
                    </td>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          key={'tbodyKey'}
          className="patientTableTBody"
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr
                key={'tbodyRowKey'}
                {...row.getRowProps(getTrProps(row))}
                className="patientTableTR"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={'tbodyData'}
                      {...cell.getCellProps()}
                      style={tdStyle}
                    >
                      {cell.column.id === 'medicinView' ? (
                        <FaArrowCircleRight
                          className="selectDataMedicin"
                          value={row}
                          style={{
                            fontSize: '30px',
                            color: '#CC5500',
                            width: '60px',
                            cursor: 'pointer',
                          }}
                          title="Open data visualization for medicin"
                          onClick={() =>
                            callSelectPatient(row, ViewType.medicin)
                          }
                        />
                      ) : cell.column.id === 'patientView' ? (
                        <FaArrowCircleRight
                          className="selectDataPatient"
                          value={row}
                          style={{
                            fontSize: '30px',
                            color: 'green',
                            width: '60px',
                            cursor: 'pointer',
                          }}
                          title="Open data visualization for autre personnel Soignant"
                          onClick={() => callSelectPatient(row, ViewType.autre)}
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
          </strong>
        </span>
        <span style={{ color: 'black', height: '30px' }}>
          | Go to page{' '}
          <Input
            type={'number'}
            defaultValue={pageIndex}
            value={pageIndex + 1}
            onChange={(e) => {
              const pageIndex = e.target.value ? Number(e.target.value - 1) : 0
              gotoPage(pageIndex)
            }}
            style={{ width: '60px', color: 'black' }}
          />
        </span>
        <Select
          value={pageSize}
          onChange={(newValue) => setPageSize(newValue)}
          style={{ color: 'black', marginLeft: '20px' }}
          options={[
            {
              value: 5,
              label: '5',
            },
            {
              value: 10,
              label: '10',
            },
            {
              value: 15,
              label: '15',
            },
            {
              value: 20,
              label: '20',
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
    </>
  )
}
