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
    !missingGeneralColumn[1]?.missingCols ||
    missingGeneralColumn[0].missingCols.length === 0 ||
    missingGeneralColumn[1].missingCols.length === 0
  ) {
    if (
      !missingTotalColumn ||
      !missingTotalColumn[0]?.missingCols ||
      !missingTotalColumn[1]?.missingCols ||
      missingTotalColumn[0].missingCols.length === 0 ||
      missingTotalColumn[1].missingCols.length === 0
    ) {
      if (
        !missingSpecialColumn ||
        !missingSpecialColumn[0]?.missingCols ||
        !missingSpecialColumn[1]?.missingCols ||
        missingSpecialColumn[0].missingCols.length === 0 ||
        missingSpecialColumn[1].missingCols.length === 0
      ) {
        return null
      } else {
        return (
          <label
            style={{
              color: 'red',
              textAlign: 'bottom',
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
            textAlign: 'bottom',
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
          textAlign: 'bottom',
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
  subText = null,
}) => {
  return (
    <div style={{ alignContent: 'left' }}>
      {!noVisible
        ? <MissingDataColumnMessageDialog
            key={missingDialogKey++}
            // visible={
            //   (!missingGeneralColumn ||
            //     !missingGeneralColumn[0]?.missingCols ||
            //     missingGeneralColumn[0].missingCols.length === 0) &&
            //   (!missingTotalColumn ||
            //     !missingTotalColumn[0]?.missingCols ||
            //     missingTotalColumn[0].missingCols.length === 0) &&
            //   (!missingSpecialColumn ||
            //     !missingSpecialColumn[0]?.missingCols ||
            //     missingSpecialColumn[0].missingCols.length === 0)
            //     ? false
            //     : noVisible
            //       ? false
            //       : true
            // }

            visible={
              (!missingGeneralColumn ||
                !missingGeneralColumn[0]?.missingCols ||
                missingGeneralColumn[0].missingCols.length === 0 &&
                (!missingGeneralColumn[1] ||
                 !missingGeneralColumn[1]?.missingCols ||
                 missingGeneralColumn[1].missingCols.length === 0)) &&
              (!missingTotalColumn ||
                !missingTotalColumn[0]?.missingCols ||
                missingTotalColumn[0].missingCols.length === 0 &&
                (!missingTotalColumn[1] ||
                 !missingTotalColumn[1]?.missingCols ||
                 missingTotalColumn[1].missingCols.length === 0)) &&
              (!missingSpecialColumn ||
                !missingSpecialColumn[0]?.missingCols ||
                missingSpecialColumn[0].missingCols.length === 0 &&
                (!missingSpecialColumn[1] ||
                 !missingSpecialColumn[1]?.missingCols ||
                 missingSpecialColumn[1].missingCols.length === 0))
                ? false
                : noVisible
                  ? false
                  : true
            }


            // visible={
            //   (!missingGeneralColumn ||
            //     !missingGeneralColumn[0]?.missingCols ||
            //     (
            //       missingGeneralColumn[1] !== undefined &&
            //       !missingGeneralColumn[1]?.missingCols
            //     ) ||
            //     missingGeneralColumn[0].missingCols.length === 0 ||
            //     (
            //       missingGeneralColumn[1] !== undefined &&
            //       missingGeneralColumn[1].missingCols.length === 0
            //     )
            //   ) &&
            //   (!missingTotalColumn ||
            //     (!missingTotalColumn[0]?.missingCols &&
            //     (missingTotalColumn[1] !== undefined && !missingTotalColumn[1]?.missingCols)) ||
            //     (missingTotalColumn[0].missingCols.length === 0 &&
            //     missingTotalColumn[1].missingCols.length === 0)) &&
            //   (!missingSpecialColumn ||
            //     (!missingSpecialColumn[0]?.missingCols &&
            //     !missingSpecialColumn[1]?.missingCols) ||
            //     (missingSpecialColumn[0].missingCols.length === 0 &&
            //     missingSpecialColumn[1].missingCols.length === 0))
            //     ? false
            //     : noVisible
            //       ? false
            //       : true
            // }



            // visible={true}
            // visible={
            //   (!missingGeneralColumn ||
            //     (!missingGeneralColumn[0]?.missingCols ||
            //     !missingGeneralColumn[1]?.missingCols) &&
            //     (missingGeneralColumn[0].missingCols.length === 0 ||
            //     missingGeneralColumn[1].missingCols.length === 0)) &&
            //   (!missingTotalColumn ||
            //     (!missingTotalColumn[0]?.missingCols ||
            //     !missingTotalColumn[1]?.missingCols) &&
            //     (missingTotalColumn[0].missingCols.length === 0 ||
            //     missingTotalColumn[1].missingCols.length === 0)) &&
            //   (!missingSpecialColumn ||
            //     (!missingSpecialColumn[0]?.missingCols ||
            //     !missingSpecialColumn[1]?.missingCols) &&
            //     (missingSpecialColumn[0].missingCols.length === 0 ||
            //     missingSpecialColumn[1].missingCols.length === 0))
            //     ? false
            //     : noVisible
            //       ? false
            //       : true
            // }


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
      {subText
        ? <label
        style={{
          color: 'black',
          textAlign: 'bottom',
          wordWrap: 'normal',
          fontSize: '18px',
          fontStyle: 'italic',
        }}
      >
        {subText}
      </label>
        : null}
    </div>
  )
}


export const getTemps = (data) => {
  let temps = []

  // does data come from Excel/CSV file?
  if (Array.isArray(data.medicalData[0])) {
    const index = data.medicalData[0].findIndex((col) => {
      const c = col.trim().toLowerCase()
      return c === 'temps' || c === 'redcap_event_name'
    })

    if (index >= 0) {
      for (let i = 1; i < data.medicalData.length; i++) {
        temps.push(data.medicalData[i][index])
      }
    }
  } else {
    // data comes from redcap API
    temps = data.medicalData.map((md) => md.redcap_event_name)
  }

  return temps
}

  
//   {
//   // Example logic to generate or filter graphs
//   return selectedValues.map(value => {
//     // Generate or filter your graph based on the value
//     return <div key={value}>Graph for {value}</div>;
//   });
// };


// !
export const componentsSwitchByDisease = (selectedItem, doShowWarning) => {
  const medicalData = props.patientData
  const temps = getTemps(medicalData)

  switch (props.disease) {
    case GraphType.alcohol:
      console.log("alcool:", AlcoholSelect(selectedItem, medicalData, temps, doShowWarning))
      return AlcoholSelect(selectedItem, medicalData, temps, doShowWarning)
    case GraphType.depression:
      console.log("dépression:", DepressionSelect(selectedItem, medicalData, temps, doShowWarning))
      return DepressionSelect(selectedItem, medicalData, temps, doShowWarning)
    default:
      break
  }
}