
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  const result = Object.assign({}, data)
  return new Promise((resolve, reject) => {
    Object.keys(schema).map(key => {
      const value = schema[key]
      const type = typeof value
      if (type === 'object') {
        if (value['required']) {
          if (result[key] == null) throw new Error(`field ${key} is missing`)
        }
        Object.keys(value).map(validator => {
          if (validator === 'type') result[key] = coerce(value[validator], key, result[key])
        })
      } else if (type === 'function') {
        result[key] = value(result[key])
      } else  result[key] = value
    })
    resolve(result)
  })
}


/**
 * Coerce value.
 *
 * Trigger
 *
 * @param {String} type
 * @param {String} field name
 * @param {Any} value
 * @api private
 */

function coerce (type, field, value) {
  let result
  if (type === 'string') result = String(value)
  else if (type === 'number') {
    result = Number(value)
    if (isNaN(result)) throw new Error(`field ${field} can not be converted to a number`)
  } else if (type === 'boolean') result = Boolean(value)
  return result
}
