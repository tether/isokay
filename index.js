
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  const result = Object.assign({}, data)
  Object.keys(schema).map(key => {
    const validator = schema[key]
    const type = typeof validator
    if (type === 'object') {

    } else if (type === 'function') {
      result[key] = validator(result[key])
    } else  result[key] = validator
  })
  return result
}
