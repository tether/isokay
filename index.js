
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
        validate(value, result, key)
      } else if (type === 'function') {
        result[key] = value(result[key])
      } else  result[key] = value
    })
    resolve(result)
  })
}



/**
 * Validate data key/value against passed schema.
 *
 * @param {Object} schema
 * @param {Object} data
 * @param {String} key
 * @api private
 */

function validate (schema, data, key) {
  if (schema['required']) {
    if (data[key] == null) throw new Error(`field ${key} is missing`)
  }
  Object.keys(schema).map(validator => {
    if (validator === 'type') data[key] = coerce(schema[validator], key, data[key])
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
