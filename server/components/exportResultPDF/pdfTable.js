import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

/**
 * The table has been used to display the data in the PDF file
 * @param {Object} items - Data items
 * @returns The data table
 */
const TableRow = ({ items, index }) => {
  const rowStyles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      width: '27%',
      fontSize: index === 1 ? '9px' : '8px',
      marginTop: index === 1 ? '15px' : '5px',
      color: index === 1 ? 'blue' : 'black',
      marginLeft: '5%',
      textAlign: 'center',
      fontWeight: index === 1 ? 'bold' : null,
      textDecorationLine: 'underline',
    },
  })

  const rows = items.map((item) => (
    <View style={rowStyles.row} key={item.label.toString()}>
      <Text style={rowStyles.label}>{item.label}</Text>
    </View>
  ))
  return <Fragment>{rows}</Fragment>
}

const PDFTable = ({ data }) => {
  const tableStyles = StyleSheet.create({
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })
  return (
    <View style={tableStyles.tableContainer}>
      <TableRow items={data.items1} index={1} />
      <TableRow items={data.items2} index={2} />
    </View>
  )
}

export default PDFTable
