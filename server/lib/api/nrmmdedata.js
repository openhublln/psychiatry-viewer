import fetch from 'node-fetch'
import { readSystemConfigData } from '../../utils/readConfig'
// import { Hospitals } from '../../models/userModel'

// The api getting depression data
// Project NRMMDE(New Relapse Model for Major Depressive Episode)

export const nrmmdeGetRecords = async (user) => {
  const token = readSystemConfigData().depressionToken
  const redcapEndpoint = readSystemConfigData().redcapEndpoint
  // let filterPrefix = 'BV'
  // if (user.hospital === Hospitals.BV) {
  //   filterPrefix = 'BV_'
  // } else {
  //   filterPrefix = 'SL_'
  // }

  const params = new URLSearchParams()
  params.append('token', token)
  params.append('content', 'record')
  params.append('format', 'json')
  params.append('returnFormat', 'json')
  params.append('type', 'flat')
  // params.append('fields', 'record_id, sexe, statut_marital')

  const response = await fetch(redcapEndpoint, {
    method: 'POST',
    body: params,
  })

  const data = await response.json()

  return Object.entries(
    data.reduce((st, record) => {
      const name = record.record_id
      // const foundPrefix = name.startsWith(filterPrefix)
      // if (foundPrefix) {
      //   st[name] = st[name] || []
      //   st[name].push(record)
      // }
      st[name] = st[name] || []
      st[name].push(record)
      return st
    }, {}),
  ).map(([name, records]) => {
    const r0 = records[0]
    return {
      name: name,
      sex: r0.sexe ? r0.sexe : r0.sex ? r0.sex : '-',
      naissance: r0.naissance_annee ? r0.naissance_annee : '-',
      medicalData: records,
    }
  })
}
