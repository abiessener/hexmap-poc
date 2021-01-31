const jsTypes = require('../const/jsTypes')

const LOG_LEVELS = {
  LOG: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
}

const ERROR_MESSAGES = {
  INVALID_LOG_LEVEL: 'invalid log level'
}

let logLevel = 0

const setLogLevel = (newLevel) => {
  if (Number.isInteger(newLevel) && +newLevel >= 0 && +newLevel <= 4) return logLevel = newLevel
  if (typeof newLevel === jsTypes.STRING && !!LOG_LEVELS[newLevel.toUpperCase()]) return logLevel = LOG_LEVELS[newLevel.toUpperCase()]

  throw new Error(ERROR_MESSAGES.INVALID_LOG_LEVEL)
}

const prettyPrint = (json) => JSON.stringify(json, null, 2)

const log = (json) => {
  if (logLevel <= LOG_LEVELS.LOG) console.log(prettyPrint(json))
}

const debug = (json) => {
  if (logLevel <= LOG_LEVELS.DEBUG) console.debug(prettyPrint(json))
}

const info = (json) => {
  if (logLevel <= LOG_LEVELS.INFO) console.info(prettyPrint(json))
}

const warn = (json) => {
  if (logLevel <= LOG_LEVELS.WARN) console.warn(prettyPrint(json))
}

const error = (json) => {
  if (logLevel <= LOG_LEVELS.ERROR) console.error(prettyPrint(json))
}

module.exports = {
  log,
  debug,
  info,
  warn,
  error,
  setLogLevel,
  ERROR_MESSAGES,
  LOG_LEVELS
}