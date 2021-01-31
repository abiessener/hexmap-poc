const GameMap = require('../../src/map/GameMap')
const MapHex = require('../../src/map/MapHex')
const { range } = require('../../src/util/functional')
const logger = require('../../src/util/logger')

describe('GameMap', () => {
  describe('constructor', () => {
    test('should set size', () => {
      const x = 3
      const y = 5
      const map = new GameMap({ sizeX: x, sizeY: y })

      expect(map.sizeX).toBe(x)
      expect(map.sizeY).toBe(y)
    })
  })

  describe('generateSquareGrid', () => {
    test('should generate hexes', () => {
      const x = 3
      const y = 5
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const firstHex = map.hexGrid['0,0']
      const lastHex = map.hexGrid['2,4']

      expect(firstHex).toBeInstanceOf(MapHex)
      expect(firstHex.positionX).toBe(0)
      expect(firstHex.positionY).toBe(0)

      expect(lastHex).toBeInstanceOf(MapHex)
      expect(lastHex.positionX).toBe(2)
      expect(lastHex.positionY).toBe(4)

      const rangeX = range(x)
      const rangeY = range(y)

      rangeX.forEach(positionX => {
        rangeY.forEach(positionY => {
          const hex = map.hexGrid[[positionX, positionY].join(',')]
          expect(hex).toBeInstanceOf(MapHex)
          expect(hex.positionX).toBe(positionX)
          expect(hex.positionY).toBe(positionY)
        })
      })
    })

    test('should set neighbors of even-row hex', () => {
      const x = 4
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const middleHex = map.getHex(2,2)

      expect(middleHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = middleHex.neighbors

      const middleX = middleHex.positionX
      const middleY = middleHex.positionY

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

      expect(northWest).toBeInstanceOf(MapHex)
      expect(northWest.positionX).toBe(middleX-1)
      expect(northWest.positionY).toBe(middleY-1)

      expect(northEast).toBeInstanceOf(MapHex)
      expect(northEast.positionX).toBe(middleX)
      expect(northEast.positionY).toBe(middleY-1)

      expect(east).toBeInstanceOf(MapHex)
      expect(east.positionX).toBe(middleX+1)
      expect(east.positionY).toBe(middleY)

      expect(southEast).toBeInstanceOf(MapHex)
      expect(southEast.positionX).toBe(middleX)
      expect(southEast.positionY).toBe(middleY+1)

      expect(southWest).toBeInstanceOf(MapHex)
      expect(southWest.positionX).toBe(middleX-1)
      expect(southWest.positionY).toBe(middleY+1)

      expect(west).toBeInstanceOf(MapHex)
      expect(west.positionX).toBe(middleX-1)
      expect(west.positionY).toBe(middleY)
    })

    test('should set neighbors of odd-row hex', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const middleHex = map.getHex(1,1)

      expect(middleHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = middleHex.neighbors

      const middleX = middleHex.positionX
      const middleY = middleHex.positionY

      logger.debug({
        pos: middleHex.getCoordinateString(),
        b: middleHex.cardinalBorders,
        northWest: northWest && northWest.getCoordinateString(),
        northEast: northEast && northEast.getCoordinateString(),
        east: east && east.getCoordinateString(),
        southEast: southEast && southEast.getCoordinateString(),
        southWest: southWest && southWest.getCoordinateString(),
      })


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
       */

      expect(northWest).toBeInstanceOf(MapHex)
      expect(northWest.positionX).toBe(middleX)
      expect(northWest.positionY).toBe(middleY-1)

      expect(northEast).toBeInstanceOf(MapHex)
      expect(northEast.positionX).toBe(middleX+1)
      expect(northEast.positionY).toBe(middleY-1)

      expect(east).toBeInstanceOf(MapHex)
      expect(east.positionX).toBe(middleX+1)
      expect(east.positionY).toBe(middleY)

      expect(southEast).toBeInstanceOf(MapHex)
      expect(southEast.positionX).toBe(middleX+1)
      expect(southEast.positionY).toBe(middleY+1)

      expect(southWest).toBeInstanceOf(MapHex)
      expect(southWest.positionX).toBe(middleX)
      expect(southWest.positionY).toBe(middleY+1)

      expect(west).toBeInstanceOf(MapHex)
      expect(west.positionX).toBe(middleX-1)
      expect(west.positionY).toBe(middleY)
    })

    test('should not set west neighbors of west-border hexes', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const westHex = map.getHex(0, 1)
      
      expect(westHex).toBeInstanceOf(MapHex)
      
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = westHex.neighbors

      logger.debug({
        westHex: westHex.getCoordinateString(),
        cardinalBorders: westHex.cardinalBorders,
        northWest: northWest && northWest.getCoordinateString(),
        northEast: northEast && northEast.getCoordinateString(),
        east: east && east.getCoordinateString(),
        southEast: southEast && southEast.getCoordinateString(),
        southWest: southWest && southWest.getCoordinateString(),
      })

      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBeInstanceOf(MapHex)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBeInstanceOf(MapHex)
      expect(southWest).toBeInstanceOf(MapHex)
      expect(west).toBe(undefined)
    })

    test('should not set north neighbors of north-border hexes', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const northHex = map.getHex(x-2, 0)

      expect(northHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = northHex.neighbors

      expect(northWest).toBe(undefined)
      expect(northEast).toBe(undefined)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBeInstanceOf(MapHex)
      expect(southWest).toBeInstanceOf(MapHex)
      expect(west).toBeInstanceOf(MapHex)
    })

    test('should not set east neighbors of east-border hexes', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()

      const eastHex = map.getHex(x-1, 1)

      expect(eastHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = eastHex.neighbors

      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBe(undefined)
      expect(east).toBe(undefined)
      expect(southEast).toBe(undefined)
      expect(southWest).toBeInstanceOf(MapHex)
      expect(west).toBeInstanceOf(MapHex)
    })

    test('should not set south neighbors of south-border hexes', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const southHex = map.getHex(1, y-1)
  
      expect(southHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = southHex.neighbors
  
      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBeInstanceOf(MapHex)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBe(undefined)
      expect(southWest).toBe(undefined)
      expect(west).toBeInstanceOf(MapHex)
    })
  
    test('should not set outside neighbors of northwest corner hex', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const nwCornerHex = map.getHex(0, 0)
  
      expect(nwCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = nwCornerHex.neighbors
  
      expect(northWest).toBe(undefined)
      expect(northEast).toBe(undefined)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBeInstanceOf(MapHex)
      expect(southWest).toBe(undefined)
      expect(west).toBe(undefined)
    })
  
    test('should not set outside neighbors of northeast corner hex', () => {
      const x = 3
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const neCornerHex = map.getHex(x-1, 0)
  
      expect(neCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = neCornerHex.neighbors
  
      logger.debug({
        pos: neCornerHex.getCoordinateString(),
        b: neCornerHex.cardinalBorders,
        northWest: northWest && northWest.getCoordinateString(),
        northEast: northEast && northEast.getCoordinateString(),
        east: east && east.getCoordinateString(),
        southEast: southEast && southEast.getCoordinateString(),
        southWest: southWest && southWest.getCoordinateString(),
      })
  
      expect(northWest).toBe(undefined)
      expect(northEast).toBe(undefined)
      expect(east).toBe(undefined)
      expect(southEast).toBeInstanceOf(MapHex)
      expect(southWest).toBeInstanceOf(MapHex)
      expect(west).toBeInstanceOf(MapHex)
    })
  
    test('should not set outside neighbors of southeast odd-row corner hex', () => {
      const x = 3
      const y = 3
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const seOddCornerHex = map.getHex(x-1, y-1)
  
      expect(seOddCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = seOddCornerHex.neighbors
  
      logger.debug({
        seOddCornerHex: seOddCornerHex.getCoordinateString(),
        cardinalBorders: seOddCornerHex.cardinalBorders,
        northWest: northWest && northWest.getCoordinateString(),
        northEast: northEast && northEast.getCoordinateString(),
        east: east && east.getCoordinateString(),
        southEast: southEast && southEast.getCoordinateString(),
        southWest: southWest && southWest.getCoordinateString(),
      })

      /**
      *   [0,0] [1,0] [2,0]
      * 
      *      [0,1] [1,1] [2,1]
      * 
      *   [0,2] [1,2] [2,2]
      * 
      **/
      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBeInstanceOf(MapHex)
      expect(east).toBe(undefined)
      expect(southEast).toBe(undefined)
      expect(southWest).toBe(undefined)
      expect(west).toBeInstanceOf(MapHex)
    })
  
    test('should not set outside neighbors of southeast even-row corner hex', () => {
      const x = 4
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const seEvenCornerHex = map.getHex(x-1, y-1)
  
      expect(seEvenCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = seEvenCornerHex.neighbors
  
      logger.debug({
        seEvenCornerHex: seEvenCornerHex.getCoordinateString(),
        cardinalBorders: seEvenCornerHex.cardinalBorders,
        northWest: northWest && northWest.getCoordinateString(),
        northEast: northEast && northEast.getCoordinateString(),
        east: east && east.getCoordinateString(),
        southEast: southEast && southEast.getCoordinateString(),
        southWest: southWest && southWest.getCoordinateString(),
      })

      /**
      *   [0,0] [1,0] [2,0] [3,0]
      * 
      *      [0,1] [1,1] [2,1] [3,1]
      * 
      *   [0,2] [1,2] [2,2] [3,2]
      * 
      *      [0,3] [1,3] [2,3] [3,3]
      */
      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBe(undefined)
      expect(east).toBe(undefined)
      expect(southEast).toBe(undefined)
      expect(southWest).toBe(undefined)
      expect(west).toBeInstanceOf(MapHex)
    })

    test('should not set outside neighbors of odd-row southwest corner hex', () => {
      const x = 3
      const y = 3
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const swCornerHex = map.getHex(0, y-1)
  
      expect(swCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = swCornerHex.neighbors
  
      /**
      *   [0,0] [1,0] [2,0]
      * 
      *      [0,1] [1,1] [2,1]
      * 
      *   [0,2] [1,2] [2,2]
      * 
      **/

      expect(northWest).toBe(undefined)
      expect(northEast).toBeInstanceOf(MapHex)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBe(undefined)
      expect(southWest).toBe(undefined)
      expect(west).toBe(undefined)
    })

    test('should not set outside neighbors of even-row southwest corner hex', () => {
      const x = 4
      const y = 4
      const map = new GameMap({ sizeX: x, sizeY: y })
      map.generateSquareGrid()
  
      const swEvenCornerHex = map.getHex(0, y-1)
  
      expect(swEvenCornerHex).toBeInstanceOf(MapHex)
      const {
        northWest, 
        northEast, 
        east, 
        southEast, 
        southWest, 
        west
      } = swEvenCornerHex.neighbors
  
      /**
      *   [0,0] [1,0] [2,0] [3,0]
      * 
      *      [0,1] [1,1] [2,1] [3,1]
      * 
      *   [0,2] [1,2] [2,2] [3,2]
      * 
      *      [0,3] [1,3] [2,3] [3,3]
      */

      expect(northWest).toBeInstanceOf(MapHex)
      expect(northEast).toBeInstanceOf(MapHex)
      expect(east).toBeInstanceOf(MapHex)
      expect(southEast).toBe(undefined)
      expect(southWest).toBe(undefined)
      expect(west).toBe(undefined)
    })
  })

  describe('getHex', () => {
    test('should get a hex', () => {
      const sizeX = 3
      const sizeY = 5
      const map = new GameMap({ sizeX, sizeY })
      map.generateSquareGrid()

      const positionX = 1
      const positionY = 2

      const hex = map.getHex(positionX, positionY)

      expect(hex).toBeInstanceOf(MapHex)
      expect(hex.positionX).toBe(positionX)
      expect(hex.positionY).toBe(positionY)
    })
  })
})