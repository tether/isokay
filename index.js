
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  const result = Object.assign({}, data)
  Object.keys(schema).map(key => {
    const value = schema[key]
    const type = typeof value
    if (type === 'object') {

    } else if (type === 'function') {
      result[key] = value()
    } else  result[key] = value
  })
  return result
}
