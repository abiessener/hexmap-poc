const logger = require('../../src/util/logger')

const consoleSpy = {}

beforeAll(() => {
  consoleSpy.log = jest.spyOn(console, 'log').mockImplementation()
  consoleSpy.info = jest.spyOn(console, 'info').mockImplementation()
  consoleSpy.debug = jest.spyOn(console, 'debug').mockImplementation()
  consoleSpy.warn = jest.spyOn(console, 'warn').mockImplementation()
  consoleSpy.error = jest.spyOn(console, 'error').mockImplementation()
})

afterAll(() => {
  Object.values(consoleSpy).map(spy => spy.mockRestore())
})

beforeEach(() => {
  jest.clearAllMocks()
  logger.setLogLevel(logger.LOG_LEVELS.LOG)
})

describe('logger', () => {
  describe('logLevel behavior', () => {
    test('logLevel = LOG', () => {
      logger.setLogLevel(logger.LOG_LEVELS.LOG)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(1)
      expect(consoleSpy.log).toHaveBeenCalledWith(JSON.stringify(logInput, null, 2))
      expect(consoleSpy.debug).toHaveBeenCalledTimes(1)
      expect(consoleSpy.debug).toHaveBeenCalledWith(JSON.stringify(debugInput, null, 2))
      expect(consoleSpy.info).toHaveBeenCalledTimes(1)
      expect(consoleSpy.info).toHaveBeenCalledWith(JSON.stringify(infoInput, null, 2))
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1)
      expect(consoleSpy.warn).toHaveBeenCalledWith(JSON.stringify(warnInput, null, 2))
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('logLevel = DEBUG', () => {
      logger.setLogLevel(logger.LOG_LEVELS.DEBUG)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(1)
      expect(consoleSpy.debug).toHaveBeenCalledWith(JSON.stringify(debugInput, null, 2))
      expect(consoleSpy.info).toHaveBeenCalledTimes(1)
      expect(consoleSpy.info).toHaveBeenCalledWith(JSON.stringify(infoInput, null, 2))
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1)
      expect(consoleSpy.warn).toHaveBeenCalledWith(JSON.stringify(warnInput, null, 2))
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('logLevel = INFO', () => {
      logger.setLogLevel(logger.LOG_LEVELS.INFO)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(1)
      expect(consoleSpy.info).toHaveBeenCalledWith(JSON.stringify(infoInput, null, 2))
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1)
      expect(consoleSpy.warn).toHaveBeenCalledWith(JSON.stringify(warnInput, null, 2))
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('logLevel = WARN', () => {
      logger.setLogLevel(logger.LOG_LEVELS.WARN)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1)
      expect(consoleSpy.warn).toHaveBeenCalledWith(JSON.stringify(warnInput, null, 2))
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('logLevel = ERROR', () => {
      logger.setLogLevel(logger.LOG_LEVELS.ERROR)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })
  })

  describe('setLogLevel', () => {
    test('works on string', () => {
      logger.setLogLevel('ERROR')
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('ignores string case', () => {
      logger.setLogLevel('error')
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('works on int', () => {
      logger.setLogLevel(4)
      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('fails on bad string', () => {
      logger.setLogLevel(logger.LOG_LEVELS.ERROR)

      try {
        logger.setLogLevel('err')
      } catch (error) {
        expect(error.message).toEqual(logger.ERROR_MESSAGES.INVALID_LOG_LEVEL)
      }

      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('fails on bad integer', () => {
      logger.setLogLevel(logger.LOG_LEVELS.ERROR)

      try {
        logger.setLogLevel(6)
      } catch (error) {
        expect(error.message).toEqual(logger.ERROR_MESSAGES.INVALID_LOG_LEVEL)
      }

      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('fails on non-integer number', () => {
      logger.setLogLevel(logger.LOG_LEVELS.ERROR)

      try {
        logger.setLogLevel(2.3)
      } catch (error) {
        expect(error.message).toEqual(logger.ERROR_MESSAGES.INVALID_LOG_LEVEL)
      }

      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

    test('fails on non-integer, non-string', () => {
      logger.setLogLevel(logger.LOG_LEVELS.ERROR)

      try {
        logger.setLogLevel([3])
      } catch (error) {
        expect(error.message).toEqual(logger.ERROR_MESSAGES.INVALID_LOG_LEVEL)
      }

      const logInput = { beef: 'wellington' }
      const debugInput = { beef: 'maggoty' }
      const infoInput = { beef: 'delicious' }
      const warnInput = { beef: 'dubious' }
      const errorInput = { beef: 'impossible' }

      logger.log(logInput)
      logger.debug(debugInput)
      logger.info(infoInput)
      logger.warn(warnInput)
      logger.error(errorInput)

      expect(consoleSpy.log).toHaveBeenCalledTimes(0)
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0)
      expect(consoleSpy.info).toHaveBeenCalledTimes(0)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledWith(JSON.stringify(errorInput, null, 2))
    })

  })
})