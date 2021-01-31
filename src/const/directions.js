const NORTH = 'north'
const EAST = 'east'
const SOUTH = 'south'
const WEST = 'west'
const NORTHEAST = 'northeast'
const NORTHWEST = 'northwest'
const SOUTHEAST = 'southeast'
const SOUTHWEST = 'southwest'  


module.exports = Object.freeze({
  CARDINAL: {
    NORTH,
    EAST,
    SOUTH,
    WEST,
  },
  DIAGONAL: {
    NORTHEAST,
    NORTHWEST,
    SOUTHEAST,
    SOUTHWEST,  
  },
  HEX: {
    NORTHWEST,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTHWEST,
    WEST,
  },
  NORTH,
  EAST,
  SOUTH,
  WEST,
  NORTHEAST,
  NORTHWEST,
  SOUTHEAST,
  SOUTHWEST
})
