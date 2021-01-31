const range = (length, start = 0) => Array.from(new Array(length), (_, index) => index + start)

const mapShallowValues = (sourceObject, callback) => Object
  .fromEntries(Object.entries(sourceObject).map(([key, value]) => ([key, callback(value)])))

module.exports = ({
  range,
  mapShallowValues
})