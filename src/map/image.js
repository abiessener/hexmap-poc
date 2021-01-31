const logger = require('../util/logger')

const getImageChunk = (jimpImage, positionX, positionY, tileSize = {x: 0, y: 0}) => {
  const offsetX = positionY % 2 === 0
    ? Number.parseInt(tileSize.x / 2)
    : 0

  let cropStartX = offsetX + (positionX * tileSize.x)
  let cropStartY = positionY * tileSize.y
  
  return jimpImage.clone().crop(cropStartX, cropStartY, tileSize.x, tileSize.y)
}

module.exports = {
  getImageChunk
}
