import yaml from 'js-yaml'
import fs from 'fs'
import logger from '$logger'

// eslint-disable-next-line import/no-mutable-exports
let config = {}
try {
  const NODE_ENV = process.env.NODE_ENV || 'development'
  let yamlFile = fs.readFileSync(`${__dirname}/${NODE_ENV}.yaml`, 'utf8')
  yamlFile = yamlFile.replace(/\$\{(.*)\}/g, (x, x1) => {
    return process.env[x1]
  })
  config = yaml.safeLoad(yamlFile) || {}
  logger.info('config init:', config)
} catch (e) {
  logger.error(e)
}

function get(key, _default = null) {
  const keys = key.split('.')
  let ptr = config
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i]
    ptr = ptr[k]
    if (!ptr) {
      return _default
    }
  }
  return ptr
}

export default {
  get,
}
