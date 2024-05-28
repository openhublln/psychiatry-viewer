import MissingDataColumnMessageDialog from './missingDataColumnMessageDialog'
import colorLib from '@kurkle/color'
// import React from 'react';

export const emptyValue = (data) => {
  return data === undefined || data === null || isNaN(data) || data === ''
}

/**
 * Calculate color transparentize
 * @param {*} value
 * @param {*} opacity
 * @returns The transparent value
 */
export function transparentize(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity
  return colorLib(value).alpha(alpha).rgbString()
}

export const getMissingDataColumn = (dataSet, time) => {
  let missingCols = []
  if (dataSet) {
    dataSet.forEach((data) => {
      if (
        data.value === undefined ||
        data.value === null ||
        isNaN(data.value) ||
        data.value === ''
      ) {
        missingCols.push(data.colName)
      }
    })
    return missingCols.length > 0
      ? [{ time: time, missingCols: missingCols }]
      : null
  }
}

let missingDialogKey = 0

const message = (
  missingGeneralColumn,
  missingTotalColumn,
  missingSpecialColumn,
) => {
  const conditions = ['_tot', '_total', '_to']
  const withTotalValue = missingGeneralColumn
    ? conditions.some((c) =>
        missingGeneralColumn.map((entry) =>
          entry.missingCols
            ? entry.missingCols.toString().toLowerCase().includes(c)
            : null,
        ),
      )
    : false
  if (
    !missingGeneralColumn ||
    !missingGeneralColumn[0]?.missingCols ||
    missingGeneralColumn[0].missingCols.length === 0
  ) {
    if (
      !missingTotalColumn ||
      !missingTotalColumn[0]?.missingCols ||
      missingTotalColumn[0].missingCols.length === 0
    ) {
      if (
        !missingSpecialColumn ||
        !missingSpecialColumn[0]?.missingCols ||
        missingSpecialColumn[0].missingCols.length === 0
      ) {
        return null
      } else {
        return (
          <label
            style={{
              color: 'red',
              textAlign: 'buttom',
              wordWrap: 'normal',
              fontSize: '18px',
            }}
          >
            {
              'Les données spéciales pour cette visualisation sont vides. Le Recherche de sensations n’est pas valide.'
            }
          </label>
        )
      }
    } else {
      return (
        <label
          style={{
            color: 'red',
            textAlign: 'buttom',
            wordWrap: 'normal',
            fontSize: '18px',
          }}
        >
          {`Le sous-score Manque de premeditation n’est pas disponible.`}
        </label>
      )
    }
  } else {
    let missingNames = missingGeneralColumn.map((entry) => entry.missingCols.toString().toLowerCase()).join("")
    return (
      <label
        style={{
          color: 'red',
          textAlign: 'buttom',
          wordWrap: 'normal',
          width: 'inherit',
          minWidth: '450px',
          minHeight: '300px',
          fontSize: '18px',
        }}
      >
        {withTotalValue
          ? `Attention, ` + missingNames + ' est manquant'
          : `Le sous-score Recherche de sensations n’est pas valide.`}
      </label>
    )
  }
}

// ! function that ultimately returns the visualization content to be displayed in the frontend
//showPopup=true, // add a new param to hide popup dialog in case noVisible has a different purpose?
export const showGraph = ({
  missingGeneralColumn = null,
  missingTotalColumn = null,
  missingSpecialColumn = null,
  graph,
  noVisible = false,
}) => {
  return (
    // <div style={{ alignContent: 'left' }}>
    // <React.Fragment>
    <>
      {!noVisible
        ? <MissingDataColumnMessageDialog
            key={missingDialogKey++}
            visible={
              (!missingGeneralColumn ||
                !missingGeneralColumn[0]?.missingCols ||
                missingGeneralColumn[0].missingCols.length === 0) &&
              (!missingTotalColumn ||
                !missingTotalColumn[0]?.missingCols ||
                missingTotalColumn[0].missingCols.length === 0) &&
              (!missingSpecialColumn ||
                !missingSpecialColumn[0]?.missingCols ||
                missingSpecialColumn[0].missingCols.length === 0)
                ? false
                : noVisible
                  ? false
                  : true
            }
            missingGeneralColumn={missingGeneralColumn}
            missingTotalColumn={missingTotalColumn}
            missingSpecialColumn={missingSpecialColumn}
          />
        : null}
      {graph}
      {noVisible
        ? null
        : message(
            missingGeneralColumn,
            missingTotalColumn,
            missingSpecialColumn,
          )}
    </>
    // </React.Fragment>
  )
}
