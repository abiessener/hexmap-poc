const logger = require('./util/logger')
const GameMap = require('./map/GameMap')
const { getImageChunk } = require('./map/image');
const Jimp = require('jimp')
const { range } = require('./util/functional')

const startTime = Date.now()

const BASE_MAP_SIZE = 50

  /**
   * todo: get this somewhere not stupid
   */
const LANDFORMS = {
  MOUNTAIN: {
    name: 'mountain',
    glyph: '^'
  },
  PLAINS: {
    name: 'plains',
    glyph: '.'
  },
  RIVER: {
    NAME: 'river',
    glyph: '~'
  },
  UNKNOWN: {
    name: 'unknown',
    glyph: ' '
  }
}

  /**
   * todo: get this somewhere not stupid
   */
const LANDFORM_TO_COLOR_DICT = {
  '63,72,204,255': LANDFORMS.RIVER,
  '255,255,255,255': LANDFORMS.PLAINS,
  '185,122,86,255': LANDFORMS.MOUNTAIN
}

const colorResults = {}

  /**
   * todo: get this somewhere not stupid
   */
const getLandform = (hex) => {
  hex.imageChunk.pixelate(Math.min(hex.imageChunk.bitmap.width, hex.imageChunk.bitmap.height))

  const colorString = `${hex.imageChunk.bitmap.data[0]},${hex.imageChunk.bitmap.data[1]},${hex.imageChunk.bitmap.data[2]},${hex.imageChunk.bitmap.data[3]}`
  const landform = LANDFORM_TO_COLOR_DICT[colorString] || LANDFORMS.UNKNOWN

  if (!colorResults[colorString]) colorResults[colorString] = true
  return landform
} 

const main = async() => {
  /**
   * todo: get this whole thing into a method(s) on GameMap
   * basically main() should only invoke methods on GameMap (and maybe MapHex) probably
   */

  const image = await Jimp.read('./data/paint_test_1.png')

  const aspectRatio = image.bitmap.width / image.bitmap.height

  const mapSize = {
    x: Number.parseInt(BASE_MAP_SIZE * aspectRatio),
    y: Number.parseInt(BASE_MAP_SIZE / aspectRatio)
  }

  const tileSize = {
    x: Number.parseInt(image.bitmap.width / mapSize.x),
    y: Number.parseInt(image.bitmap.height / mapSize.y),
  }

  logger.debug({
    imageX: image.bitmap.width,
    imageY: image.bitmap.height,
    aspectRatio,
    mapSize
  })

  const map = new GameMap({ sizeX: Number.parseInt(mapSize.x), sizeY: Number.parseInt(mapSize.y) })
  map.generateSquareGrid()

  const rangeX = range(mapSize.x)
  const rangeY = range(mapSize.y)

  rangeX.forEach(x => {
    rangeY.forEach((y) => {
      const currentHex = map.getHex(x,y)
      currentHex.imageChunk = getImageChunk(image, x, y, tileSize)
      currentHex.landform = getLandform(currentHex)
    })
  })

  map.drawLandforms()

  logger.log({ colorResults })
  return 'success'
}

main().then(result => {
  logger.log({
    result,
    elapsedMillis: Date.now() - startTime
  })
}).catch(error => {
  logger.log({
    error,
    elapsedMillis: Date.now() - startTime
  })
})
