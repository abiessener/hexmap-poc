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

}

module.exports = MapHex