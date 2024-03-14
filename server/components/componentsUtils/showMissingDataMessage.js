/**
 * Get the missing data column
 */
export const getMissingDataColumn = (dataSet) => {
  let emptyColumns = []
  dataSet.forEach((data) => {
    if (
      data.value === undefined ||
      data.value === null ||
      isNaN(data.value) ||
      data.value === ''
    ) {
      emptyColumns.push(data.colName)
    }
  })
  return emptyColumns.length > 0 ? emptyColumns : null
}
