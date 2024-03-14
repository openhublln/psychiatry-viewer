import fetch from 'node-fetch'
import { readSystemConfigData } from '../../utils/readConfig'

// The api getting alcohol data
// Project: NRMP (New Relapse Model in Psychiatry)

export const nrmpGetRecords = async () => {
  const token = readSystemConfigData().alcoholToken
  const redcapEndpoint = readSystemConfigData().redcapEndpoint

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
