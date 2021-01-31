const logger = require('./util/logger')
const GameMap = require('./map/GameMap')
const { getImageChunk } = require('./map/image');
const Jimp = require('jimp')
const { range } = require('./util/functional')
const tinyColor = require('tinyColor2')

const beef = { taco: 'hello' }

logger.log(beef)

const BASE_MAP_SIZE = 10

const getLandform = (jimpImage) => {
  // logger.log({ lf: jimpImage.bitmap.data.slice(0,40).map(String) })
  // const colorString = `rgba (${jimpImage.bitmap.data[0]},${jimpImage.bitmap.data[1]},${jimpImage.bitmap.data[2]},${jimpImage.bitmap.data[3]})`
  // console.log('colorString', colorString)
  // const color = tinyColor(colorString)
  // logger.log({ hexValue: color.toHex(), name: color.toName() })

  // chunk data into 4s
  //   colors = jimpImage.bitmap.data[0-3]
  // build DTO with how much of each 
  //   key = colors.join(','); resultDto[key]++
  // return key with highest count

} 

const main = async() => {
  console.log('main')

  const image = await Jimp.read('./data/paint_test_1.png')
  logger.debug({ image: Object.keys(image), 
    bitmap: Object.keys(image.bitmap) 
  })

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
    rangeY.forEach(y => {
      const currentHex = map.getHex(x,y)
      currentHex.imageChunk = getImageChunk(image, x, y, tileSize)
      // currentHex.landform = getLandform(currentHex.imageChunk)
    })
  })

  const hex0 = map.getHex(0,0)
  hex0.printAttributes()
  getLandform(hex0.imageChunk)

  logger.debug({ 
    bitmapKeys: Object.keys(hex0.imageChunk.bitmap)
  })

  
  return 'success'
}

main().then(result => {
  console.log('finished', result)
}).catch(error => {
  console.log('error', error)
})
