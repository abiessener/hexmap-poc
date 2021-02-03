const chroma = require('chroma-js')
const logger = require('./util/logger')
const GameMap = require('./map/GameMap')
const { getImageChunk } = require('./map/image');
const Jimp = require('jimp')
const { range } = require('./util/functional');
const directions = require('./const/directions');

const startTime = Date.now()

const BASE_MAP_SIZE = 100

/**
 * todo: get this somewhere not stupid
 * todo: inputs for baseColor
 * todo: more landforms
 */
const LANDFORMS = {
  MOUNTAIN: {
    name: 'mountain',
    glyph: '^',
    baseColorRgbArray: [185, 122, 86]
  },
  PLAINS: {
    name: 'plains',
    glyph: '.',
    baseColorRgbArray: [255, 255, 255]
  },
  RIVER: {
    name: 'river',
    glyph: '~',
    baseColorRgbArray: [63, 72, 204]
  },
  UNKNOWN: {
    name: 'unknown',
    glyph: ' ',
    colorDistance: 9999
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

const colorStringToLandformDict = {}

/**
 * todo: get this somewhere not stupid
 */
const getLandform = (hex) => {
  hex.imageChunk.pixelate(Math.min(hex.imageChunk.bitmap.width, hex.imageChunk.bitmap.height))

  const colorString = `${hex.imageChunk.bitmap.data[0]},${hex.imageChunk.bitmap.data[1]},${hex.imageChunk.bitmap.data[2]},${hex.imageChunk.bitmap.data[3]}`
  let landform = colorStringToLandformDict[colorString]

  if (!landform) {
    const rgbColorArray = colorString.split(',').slice(0, 3)

    landform = Object.values(LANDFORMS)
      .filter(lf => !!lf.baseColorRgbArray)
      .map(landformConst => ({ // todo: move this into its own method, or maybe the map/reduce callbacks
        ...landformConst,
        colorDistance: chroma.deltaE(landformConst.baseColorRgbArray, rgbColorArray)
      })).reduce((chosenLandform, landform) => {
        if (landform.colorDistance < chosenLandform.colorDistance) return landform

        return chosenLandform
      }, LANDFORMS.UNKNOWN)

    colorStringToLandformDict[colorString] = landform
  }

  return landform
}

const main = async () => {
  /**
   * todo: get this whole thing into a method(s) on GameMap
   * basically main() should only invoke methods on GameMap (and maybe MapHex) probably
   */

  const image = await Jimp.read('./data/desert_hut.png')

  const aspectRatio = image.bitmap.width / image.bitmap.height

  const mapSize = {
    x: Number.parseInt(BASE_MAP_SIZE * aspectRatio),
    y: Number.parseInt(BASE_MAP_SIZE / aspectRatio)
  }

  const tileSize = {
    x: Number.parseInt(image.bitmap.width / mapSize.x),
    y: Number.parseInt(image.bitmap.height / mapSize.y),
  }

  const map = new GameMap({ sizeX: Number.parseInt(mapSize.x), sizeY: Number.parseInt(mapSize.y) })
  map.generateSquareGrid()


  const rangeX = range(mapSize.x)
  const rangeY = range(mapSize.y)

  rangeX.forEach(x => {
    rangeY.forEach((y) => {
      const currentHex = map.getHex(x, y)
      currentHex.imageChunk = getImageChunk(image, x, y, tileSize)
      currentHex.landform = getLandform(currentHex)
    })
  })

  map.drawLandforms()

  logger.debug({
    imageX: image.bitmap.width,
    imageY: image.bitmap.height,
    aspectRatio,
    mapSize
  })


  return 'success'
}

main().then(result => {
  logger.log({
    result,
    elapsedMillis: Date.now() - startTime
  })
}).catch(error => {
  console.error(error)
  logger.log({
    error,
    elapsedMillis: Date.now() - startTime
  })
})
