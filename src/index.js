const logger = require('./util/logger')
const GameMap = require('./map/GameMap')

const beef = { taco: 'hello' }

logger.log(beef)

const map = new GameMap({ sizeX: 6, sizeY: 7 })

map.generateSquareGrid()

map.drawText()