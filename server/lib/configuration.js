import { getConfiguration } from './db.js'

export const ConfigurationPathNames = {
  sourceDataPath: 'Source Data Path',
  resultPath: 'Result Path',
}

export async function getConfigurationValue(name) {
  return (await getConfiguration().where('name', name).first()).value
}

export async function createNewConfiguration(name, value, nodelete) {
  if (await getConfiguration().where('name', name).first()) {
    throw new Error('NO_CONFIG_PARAMETER')
  } else {
    await getConfiguration().insert({
      name: name,
      value: value,
      nodelete: nodelete,
    })
  }
}

export async function deleteConfiguration(name) {
  const config = await getConfiguration().where('name', name).first()
  if (!config) {
    throw new Error('NO_CONFIG_PARAMETER')
  } else if (config.nodelete) {
    throw new Error('NO_ALLOW_DELETE_CONFIG')
  } else {
    await getConfiguration().where('name', name).del()
  }
}

export async function updateConfiguration(name, newValue) {
  const config = await getConfiguration().where('name', name).first()
  if (!config) {
    throw new Error('NO_CONFIG_PARAMETER')
  } else {
    await getConfiguration().where('name', name).update({
      value: newValue,
    })
  }
}
