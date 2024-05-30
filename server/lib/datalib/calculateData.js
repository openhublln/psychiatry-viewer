import { getDataByName } from './parseData'

//
// value = a score value
//
// colorScale = a list of the form
//     [  { value: score, color: [r,g,b] },
//        { value: score, color: [r,g,b] },
//        ...]
// sorted by value
//
// returns the color
// const interpolateColor = (value, colorScale) => {
//   const numPoints = colorScale.length
//   if (value <= colorScale[0].value) {
//     return colorScale[0].color
//   } else if (value >= colorScale[numPoints - 1].value) {
//     return colorScale[numPoints - 1].color
//   } else {
//     var i = 1
//     while (value > colorScale[i].value) {
//       i++
//     }
//     const point1 = colorScale[i - 1]
//     const point2 = colorScale[i]
//     const x = (value - point1.value) / (point2.value - point1.value)
//     return [
//       x * point2.color[0] + (1 - x) * point1.color[0],
//       x * point2.color[1] + (1 - x) * point1.color[1],
//       x * point2.color[2] + (1 - x) * point1.color[2],
//     ]
//   }
// }

//
// value = a score value
//
// scale = a list of the form
//     [  { threshold: upper theshold value, color: [r,g,b] },
//        { threshold: upper theshold value, color: [r,g,b] },
//         ...]
// sorted by value
//
// returns the entry { threshold, color}
export const getScoreSegment = (value, scale) => {
  var i = 0
  console.log("SCALE", scale)
  console.log("SCALE LENGTH", scale.length)
  if (scale.length == 0) {
    return []
  }
  while (value > scale[i].threshold && i < scale.length - 1) {
    i++
  }
  return scale[i]
}

export const getNormalizedValue = (
  medicalData,
  cname,
  time,
  patientName,
  maxValue,
) => {
  const dn = getDataByName(medicalData, cname, time, patientName)
  if (dn || dn === 0) {
    return (100 * dn) / maxValue
  } else {
    return null
  }
}

export const getGraduationValue = (
  medicalData,
  cname,
  time,
  patientName,
  minValue,
  maxValue,
) => {
  const dn = getDataByName(medicalData, cname, time, patientName)
  if (dn || dn === 0) {
    return ((dn - minValue) / (maxValue - minValue)) * 100
  } else {
    return null
  }
}
