import * as XLSX from 'xlsx'

export const parseDataXLSX = (content) => {
  /* Parse data */
  const wb = XLSX.read(content)

  /* Get first worksheet */
  const wsname = wb.SheetNames[0]
  const ws = wb.Sheets[wsname]

  /* Convert array of arrays */
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

  console.log('First worksheet name: ' + wsname)
  console.log('First column: ' + data[0][0].toString())
  console.log('+++ Data error lenght: ', data.length)

  return data
}

export const csvStringToArray = (strData, header = true) => {
  var objPattern = new RegExp(
    '(\\,|\\r?\\n|\\r|^)(?:"((?:\\\\.|""|[^\\\\"])*)"|([^\\,"\\r\\n]*))',
    'gi',
  )
  var separator = ','

  // check for BOM
  if (
    strData.length >= 3 &&
    strData.charCodeAt(0) === 0xef &&
    strData.charCodeAt(1) === 0xbb &&
    strData.charCodeAt(2) === 0xbf
  ) {
    strData = strData.slice(3)
  }

  // check if file is using semicolon instead of comma as field seperator
  // (only works if no column name with semicolon)
  const hasSemicolon =
    strData.substring(0, strData.indexOf('\n')).indexOf(';') !== -1
  if (header && hasSemicolon) {
    objPattern = new RegExp(
      '(\\;|\\r?\\n|\\r|^)(?:"((?:\\\\.|""|[^\\\\"])*)"|([^\\;"\\r\\n]*))',
      'gi',
    )
    separator = ';'
  }

  var arrMatches = null
  var arrData = [[]]
  while ((arrMatches = objPattern.exec(strData))) {
    if (arrMatches[1].length && arrMatches[1] !== separator) arrData.push([])
    arrData[arrData.length - 1].push(
      arrMatches[2]
        ? arrMatches[2].replace(new RegExp('[\\\\"](.)', 'g'), '$1')
        : arrMatches[3],
    )
  }
  if (header) {
    const hData = arrData.shift()
    const hashData = arrData.map((row) => {
      var i = 0
      return hData.reduce((acc, key) => {
        acc[key] = row[i++]
        return acc
      }, {})
    })

    return hashData
  } else {
    return arrData
  }
}

export const parsePatientDataXLSX = (data) => {
  var nameIndex = -1
  var sexIndex = -1
  var naissanceIndex = -1

  // find the column numbers of the fields that interest us

  data[0].forEach((columnName, index) => {
    const col = columnName.toLowerCase()
    if (col === 'record_id') {
      return (nameIndex = index)
    } else if (col === 'sex' || col === 'sexe') {
      return (sexIndex = index)
    } else if (col === 'naissance_annee') {
      return (naissanceIndex = index)
    }
  })

  if (nameIndex === -1) {
    throw new Error(
      'File does not have the right format (record_id column missing',
    )
  }

  return Object.entries(
    data
      .filter((row) => row.length > 0)
      .slice(1)
      .reduce((st, row) => {
        const name = row[nameIndex]
        st[name] = st[name] || []
        st[name].push(row)
        return st
      }, {}),
  ).map(([name, rows]) => {
    const r0 = rows[0]
    return {
      name: name,
      sex: sexIndex === -1 ? '-' : r0[sexIndex],
      naissance: naissanceIndex === -1 ? '-' : r0[naissanceIndex],
      medicalData: [data[0]].concat(rows),
    }
  })
}

export const parsePatientDataCSV = (data) => {
  const keys = Object.keys(data[0])
  return Object.entries(
    data
      .filter(
        (row) =>
          row.record_id !== undefined &&
          row.record_id !== null &&
          row.record_id.length > 0,
      )
      .reduce((st, row) => {
        const name = row.record_id
        st[name] = st[name] || []
        st[name].push(row)
        return st
      }, {}),
  ).map(([name, rows]) => {
    const r0 = rows[0]
    // change the format of the rows to the same format as in the xlsx files
    const transformedRows = [keys].concat(
      rows.map((row) => keys.map((k) => row[k])),
    )
    return {
      name: name,
      sex:
        r0.sex === undefined ? (r0.sexe === undefined ? '-' : r0.sexe) : r0.sex,
      naissance: r0.naissance_annee === undefined ? '-' : r0.naissance_annee,
      medicalData: transformedRows,
    }
  })
}

export const getDataByName = (data, colName, time, patientName) => {
  let result = null

  // does data come from Excel/CSV file?
  // if (data.medicalData && Array.isArray(data.medicalData[0])) {
  //   const name = colName.toLowerCase()
  //   const lowCaseHeaderLine = data.medicalData[0].map((col) =>
  //     col.trim().toLowerCase(),
  //   )

  //   const dataIndex = lowCaseHeaderLine.indexOf(name)
  //   const patientNameIndex = lowCaseHeaderLine.indexOf('record_id')

  //   const timeColIndex = data.medicalData[0].findIndex((col) => {
  //     const c = col.trim().toLowerCase()
  //     return c === 'temps' || c === 'redcap_event_name'
  //   })

  //   if (dataIndex != -1 && patientNameIndex != -1 && timeColIndex != -1) {
  //     for (let i = 1; i < data.medicalData.length; i++) {
  //       const patientValue = data.medicalData[i][patientNameIndex]
  //       const timeValue = data.medicalData[i][timeColIndex]
  //       if (
  //         patientValue == patientName.trim().toLowerCase() &&
  //         timeValue == time
  //       ) {
  //         result = data.medicalData[i][dataIndex]
  //       }
  //     }
  //   }
  // } else {
  // data comes from redcap API
  // const recordsOfInterest = data.medicalData.filter(
  const recordsOfInterest = data.medicalData.filter(
    (md) => md.record_id === patientName && md.redcap_event_name === time,
  )
  if (recordsOfInterest.length !== 0) {
    result = recordsOfInterest[0][colName]
  }
  // }

  return result
}

const checkSingleValue = (value) => {
  return value === undefined || value === null || isNaN(value) || value === ''
}

export const getDataSetByDataNames = (medicalData, time, dataNames) => {
  let missingData = false
  let values = []
  let missingDataCol = []
  let valuesObject = []

  for (let c = 0; c < dataNames.length; c++) {
    let data = getDataByName(medicalData, dataNames[c], time, medicalData.name)
    missingData = checkSingleValue(data)
    if (missingData) {
      missingDataCol.push(dataNames[c])
    } else {
      values.push(data)
      valuesObject[dataNames[c].trim()] = data
    }
  }
  return {
    missingDataCol: missingDataCol,
    dataSet: values,
    dataSetObject: valuesObject,
  }
}

export const sumValue = (items) => {
  return items.reduce(function (a, b) {
    return a + b['value']
  }, 0)
}
