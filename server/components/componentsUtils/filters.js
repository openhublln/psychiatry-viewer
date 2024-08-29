import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

/**
 * @param column - the column name
 * @returns return the filter column of the data table
 */
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <span style={{ color: 'black' }}>
      Search:{' '}
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          color: 'white',
          height: '30px',
        }}
      />
    </span>
  )
}

/**
 * @returns The filter component
 */
export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  )
}
