import React from 'react'
import { useTable } from 'react-table'
import { SiPix } from 'react-icons/si'
import { DataColumns } from '../../../models/dataset'
import { getDataByName } from '../../../lib/datalib/parseData'
import Styles from '../chartcomponents.module.css'

/**
 *
 * @param {Object} dataSet - the data set for the consommation table
 * @returns The data table for consommation substance
 */
export const ConsommationSubstanceTable = ({ dataSet }) => {
  const headerStyle = {
    border: 'solid 1px black',
    textAlign: 'center',
    fontSize: '16px',
    padding: '2px',
    background: '#DAE3EF',
    color: 'black',
  }

  const tdStyle = {
    padding: '1px',
    border: 'solid 1px grey',
    fontSize: '16px',
    textAlign: 'center',
    cursor: 'default',
    color: 'black',
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

  const columns = [
    {
      Header: '',
      accessor: 'rowname',
    },
    {
      Header: 'Jamais',
      accessor: 'never',
    },
    {
      Header: '1 ou 2 fois',
      accessor: 'time12',
    },
    {
      Header: 'Chaque mois',
      accessor: 'eachmonth',
    },
    {
      Header: 'Chaque semaine',
      accessor: 'eachweek',
    },
    {
      Header: 'Presque tous les jours',
      accessor: 'almost',
    },
  ]

  const data = dataSet
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data,
    })
  return (
    <>
      <table className={Styles.consomSubstanceTable} {...getTableProps()}>
        <thead key={'headKey'}>
          {headerGroups.map((headerGroup) => (
            <tr
              key={'tableRowKey'}
              className="consomSubstanceTableHeaderTR"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={'rowHeaderKey'}
                  {...column.getHeaderProps()}
                  style={headerStyle}
                >
                  {
                    <div className="consomSubstanceTableThDiv">
                      {column.render('Header')}
                    </div>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          key={'tbodyKey'}
          className="consomSubstanceTableTBody"
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                key={'trkey'}
                {...row.getRowProps(getTrProps(row))}
                className="consomSubstanceTableTR"
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={'tdKey'} {...cell.getCellProps()} style={tdStyle}>
                      {cell.column.id === 'rowname' ? (
                        cell.render('Cell')
                      ) : cell.column.id === 'never' && row.original.never ? (
                        <SiPix className={Styles.consomSubstanceIcon} />
                      ) : null ||
                        (cell.column.id === 'time12' && row.original.time12) ? (
                        <SiPix className={Styles.consomSubstanceIcon} />
                      ) : null ||
                        (cell.column.id === 'eachmonth' &&
                          row.original.eachmonth) ? (
                        <SiPix className={Styles.consomSubstanceIcon} />
                      ) : null ||
                        (cell.column.id === 'eachweek' &&
                          row.original.eachweek) ? (
                        <SiPix className={Styles.consomSubstanceIcon} />
                      ) : null ||
                        (cell.column.id === 'almost' && row.original.almost) ? (
                        <SiPix className={Styles.consomSubstanceIcon} />
                      ) : null}
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
 *
 * @param {Object} medicalData - The retrieved medical data
 * @param {String} dataColumnName - The data column name
 * @param {String} time - The time step
 * @returns The data set for the table
 */
export const checkValueInMedicalData = (medicalData, dataColumnName, time) => {
  const value = getDataByName(
    medicalData,
    dataColumnName,
    time,
    medicalData.name,
  )
  if (value === undefined || value === null || isNaN(value) || value === '') {
    return [true, false, false, false, false]
  } else {
    if (value === 0 || value === '0') {
      return [true, false, false, false, false]
    } else if (value === 2 || value === '2') {
      return [false, true, false, false, false]
    } else if (value === 3 || value === '3') {
      return [false, false, true, false, false]
    } else if (value === 4 || value === '4') {
      return [false, false, false, true, false]
    } else if (value === 6 || value === '6') {
      return [false, false, false, false, true]
    } else {
      return [false, false, false, false, false]
    }
  }
}

const createTableDataSet = (medicalData, time) => {
  const tabac = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[0],
    time,
  )
  const alcool = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[1],
    time,
  )
  const cannabis = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[2],
    time,
  )
  const cocaïne = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[3],
    time,
  )
  const amphétamines = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[4],
    time,
  )
  const solvants = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[5],
    time,
  )
  const calmants = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[6],
    time,
  )
  const hallucinogènes = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[7],
    time,
  )
  const opiacés = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[8],
    time,
  )
  const autres = checkValueInMedicalData(
    medicalData,
    DataColumns.assistv3.consomSubTableColumns[9],
    time,
  )

  let dataSet = [
    {
      rowname: 'Tabac',
      never: tabac[0],
      time12: tabac[1],
      eachmonth: tabac[2],
      eachweek: tabac[3],
      almost: tabac[4],
    },
    {
      rowname: 'Alcool',
      never: alcool[0],
      time12: alcool[1],
      eachmonth: alcool[2],
      eachweek: alcool[3],
      almost: alcool[4],
    },
    {
      rowname: 'Cannabis',
      never: cannabis[0],
      time12: cannabis[1],
      eachmonth: cannabis[2],
      eachweek: cannabis[3],
      almost: cannabis[4],
    },
    {
      rowname: 'Cocaïne',
      never: cocaïne[0],
      time12: cocaïne[1],
      eachmonth: cocaïne[2],
      eachweek: cocaïne[3],
      almost: cocaïne[4],
    },
    {
      rowname: 'Amphétamines',
      never: amphétamines[0],
      time12: amphétamines[1],
      eachmonth: amphétamines[2],
      eachweek: amphétamines[3],
      almost: amphétamines[4],
    },
    {
      rowname: 'Solvants',
      never: solvants[0],
      time12: solvants[1],
      eachmonth: solvants[2],
      eachweek: solvants[3],
      almost: solvants[4],
    },
    {
      rowname: 'Calmants',
      never: calmants[0],
      time12: calmants[1],
      eachmonth: calmants[2],
      eachweek: calmants[3],
      almost: calmants[4],
    },
    {
      rowname: 'Hallucinogènes',
      never: hallucinogènes[0],
      time12: hallucinogènes[1],
      eachmonth: hallucinogènes[2],
      eachweek: hallucinogènes[3],
      almost: hallucinogènes[4],
    },
    {
      rowname: 'Opiacés',
      never: opiacés[0],
      time12: opiacés[1],
      eachmonth: opiacés[2],
      eachweek: opiacés[3],
      almost: opiacés[4],
    },
    {
      rowname: 'Autres',
      never: autres[0],
      time12: autres[1],
      eachmonth: autres[2],
      eachweek: autres[3],
      almost: autres[4],
    },
  ]
  return dataSet
}

/**
 * @returns The consommation substance table
 */
export const depressionConsommationSubstanceTable = ({ medicalData, time }) => {
  const dataSet = createTableDataSet(medicalData, time)

  return (
    <div className="consomSubstanceTableDiv" style={{ width: 'max-content' }}>
      <h2 style={{ textAlign: 'center', color: '#666666', fontSize: '30px' }}>
        Fréquence de consommation des substances durant ces 3 derniers mois
      </h2>
      <ConsommationSubstanceTable dataSet={dataSet} />
    </div>
  )
}
