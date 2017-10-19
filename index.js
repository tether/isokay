
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  const result = Object.assign({}, data)
  Object.keys(schema).map(key => {
    if (typeof key !== 'object') result[key] = schema[key]
  })
  return result
}
