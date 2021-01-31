const MapHex = require('./MapHex')
const { range } = require('../util/functional')
const logger = require('../util/logger')
const directions = require('../const/directions')

/**
 *   [0,0] [1,0] [2,0] [3,0]
 * 
 *      [0,1] [1,1] [2,1] [3,1]
 * 
 *   [0,2] [1,2] [2,2] [3,2]
 * 
 *      [0,3] [1,3] [2,3] [3,3]
 * 
 *   [0,4] [1,4] [2,4] [3,4]
 * 
 */

class GameMap {
  ERROR_MESSAGES = Object.freeze({
    INVALID_ARGUMENT_TYPE: 'Invalid argument type.',
    OUT_OF_RANGE_X: 'X coordinate is out of range.',
    OUT_OF_RANGE_Y: 'Y coordinate is out of range.',
  })

  
  hexGrid = {}

  constructor({sizeX, sizeY}) {
    if (!Number.isInteger(sizeX) || !Number.isInteger(sizeY)) throw new Error(this.ERROR_MESSAGES.INVALID_ARGUMENT_TYPE)

    this.sizeX = sizeX
    this.sizeY = sizeY
  }

  getHex(x, y) {
    this.verifyCoordinates(x,y)

    return this.hexGrid[[x, y].join(',')]
  }

  #assignNeighbors(positionX, positionY) {
    const northWest = positionX > 0 && positionY > 0
      ? this.getHex(positionX - 1, positionY - 1)
      : undefined

    const northEast = positionX < (this.sizeX - 1) && positionY > 0
      ? this.getHex(positionX + 1, positionY - 1)
      : undefined

    const east = positionX < (this.sizeX - 1)
      ? this.getHex(positionX + 1, positionY)
      : undefined

    const hasSouthEastNeighbor = (
      positionY % 2 === 0
        ? positionX < (this.sizeX - 1) && positionY < this.sizeY
        : positionX < this.sizeX
    )
    
    const southEast = hasSouthEastNeighbor
      ? this.getHex(positionX + 1, positionY + 1)
      : undefined

    const hasSouthWestNeighbor = (
      positionY % 2 === 0
        ? positionX > 0
        : positionX > 0 && positionY < this.sizeY
    )

    const southWest = hasSouthWestNeighbor
      ? this.getHex(positionX - 1, positionY + 1)
      : undefined

    const west = positionX > 0
      ? this.getHex(positionX - 1, positionY)
      : undefined

    this.getHex(positionX, positionY).neighbors = {
      northWest, 
      northEast, 
      east, 
      southEast, 
      southWest, 
      west  
    }
  }

  #findNeighbors(hex) {
    const eastDiagonalXCoordinate = hex.positionY % 2 === 0
      ? hex.positionX
      : hex.positionX + 1

    const westDiagonalXCoordinate = hex.positionY % 2 === 0
      ? hex.positionX - 1
      : hex.positionX

    
    const result = {}
    
    try {
      result.northWest = this.getHex(westDiagonalXCoordinate, hex.positionY - 1)
    } catch {
      logger.debug({ noNeighbor: 'northWest', hex: hex.getCoordinateString() })
    }

    try {
      result.northEast = this.getHex(eastDiagonalXCoordinate, hex.positionY - 1)
    } catch {
      logger.debug({ noNeighbor: 'northEast', hex: hex.getCoordinateString() })
    }

    try {
      result.east = this.getHex(hex.positionX + 1, hex.positionY)
    } catch {
      logger.debug({ noNeighbor: 'east', hex: hex.getCoordinateString() })
    }

    try {
      result.southEast = this.getHex(eastDiagonalXCoordinate, hex.positionY + 1)
    } catch {
      logger.debug({ noNeighbor: 'east', hex: hex.getCoordinateString() })
    }

    try {
      result.southWest = this.getHex(westDiagonalXCoordinate, hex.positionY + 1)
    } catch {
      logger.debug({ noNeighbor: 'east', hex: hex.getCoordinateString() })
    }

    try {
      result.west = this.getHex(hex.positionX - 1, hex.positionY)
    } catch {
      logger.debug({ noNeighbor: 'east', hex: hex.getCoordinateString() })
    }

    return result
  }

  verifyCoordinates(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) throw new Error(this.ERROR_MESSAGES.INVALID_ARGUMENT_TYPE)
    if ((x - 1) > this.sizeX) throw new Error(this.ERROR_MESSAGES.OUT_OF_RANGE_X)
    if ((y - 1) > this.sizeY) throw new Error(this.ERROR_MESSAGES.OUT_OF_RANGE_Y)
  }

  #getCardinalBorders(positionX, positionY) {
    this.verifyCoordinates(positionX, positionY)

    const result = Object.fromEntries([
      [
        directions.CARDINAL.NORTH,
        positionY === 0
          ? directions.CARDINAL.NORTH
          : undefined
      ],
      [
        directions.CARDINAL.EAST,
        positionX === this.sizeX - 1
          ? directions.CARDINAL.EAST
          : undefined
      ],
      [
        directions.CARDINAL.SOUTH,
        positionY === this.sizeY - 1
          ? directions.CARDINAL.SOUTH
          : undefined
      ],
      [
        directions.CARDINAL.WEST,
        positionX === 0
          ? directions.CARDINAL.WEST
          : undefined
      ]
    ].filter(border => !!border[1]))

    return result
  }

  generateSquareGrid() {
    const rangeX = range(this.sizeX)
    const rangeY = range(this.sizeY)
    
    rangeX.forEach(positionX => {
      rangeY.forEach(positionY => {
        const bordersToAssign = this.#getCardinalBorders(positionX, positionY)
        const newHex = new MapHex(positionX, positionY, bordersToAssign)
        this.hexGrid[newHex.getCoordinateString()] = newHex
      })
    })

    rangeX.forEach(positionX => {
      rangeY.forEach(positionY => {
        const hex = this.getHex(positionX, positionY)
        hex.neighbors = this.#findNeighbors(this.getHex(positionX, positionY))
      })
    })
  }

  drawText() {
    const rangeX = range(this.sizeX)
    const rangeY = range(this.sizeY)

    const lines = rangeX.map(x => {
      let result = '| '
      if (x % 2 !== 0) result = result.concat('   ')

      rangeY.map(y => {
        const currentHex = this.getHex(x,y)
        result = result.concat(`[${currentHex.getCoordinateString()}] `)
      })
      
      if (x % 2 === 0) result = result.concat('   ')

      console.log(result.concat(' |'))
    })
  }

  drawLandforms() {
    const rangeX = range(this.sizeX)
    const rangeY = range(this.sizeY)

    const lines = rangeY.map(y => {
      let result = '| '
      if (y % 2 !== 0) result = result.concat(' ')

      rangeX.map(x => {
        const currentHex = this.getHex(x,y)
        result = result.concat(`${currentHex.landform.glyph} `)
      })
      
      if (y % 2 === 0) result = result.concat(' ')

      console.log(result.concat(' |'))
    })

  }

}

module.exports = GameMap