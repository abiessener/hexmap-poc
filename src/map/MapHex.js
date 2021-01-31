const logger = require('../util/logger')

class MapHex {
  ERROR_MESSAGES = {
    INVALID_ARGUMENT_TYPE: 'Invalid argument type.'
  }

  neighbors = {}
  cardinalBorders = {}

  constructor(positionX, positionY, cardinalBorders = {}) {
    if (!Number.isInteger(positionX) || !Number.isInteger(positionY)) throw new Error(this.ERROR_MESSAGES.INVALID_ARGUMENT_TYPE)

    this.positionX = positionX
    this.positionY = positionY
    this.cardinalBorders = cardinalBorders
  }

  getCoordinateString() {
    return `${this.positionX},${this.positionY}`
  }

  printAttributes(coordinates = true, neighbors = true, cardinalBorders = true) {
    const result = {}
    if (coordinates) result.coordinates = { x: this.positionX, y: this.positionY }
    if (neighbors) result.neighbors = Object.entries(this.neighbors)
      .filter(([direction, hex]) => !!hex)
      .map(([direction, hex]) => ({ direction, x: hex.positionX, y: hex.positionY }))
    if (cardinalBorders) result.cardinalBorders = Object.values(this.cardinalBorders)
    if (this.landform) result.landform = Object.values(this.landform)

    logger.log({ hex: result })
  }

}

module.exports = MapHex