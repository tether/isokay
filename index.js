
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  const result = Object.assign({}, data)
  return new Promise((resolve, reject) => {
    Object.keys(schema).map(key => {
      let value = schema[key]
      const type = typeof value
      if (type !== 'object') {
        value = {
          transform : value
        }
      }
      validate(value, result, key)
    })
    resolve(result)
  })
}


/**
 * Validate data key/value against passed schema.
 *
 * Required field is always check first in order to
 * avoid unnecessary validations.
 *
 * @param {Object} schema
 * @param {Object} data
 * @param {String} key
 * @api private
 */

function validate (schema, data, key) {
  let value = data[key]
  const bool = value == null || value === ''
  if (schema['required']) {
    if (bool) throw new Error(`field ${key} is missing`)
  }
  if (schema['trim']) data[key] = data[key].trim()
  Object.keys(schema).map(validator => {
    const property = schema[validator]
    if (validator === 'type') {
      if (!bool) data[key] = coerce(property, key, value)
      return
    }
    if (validator === 'validate') {
      if (!property(value)) throw new Error(`field ${key} can not be validated`)
      return
    }
    if (validator === 'default') {
      if (bool) data[key] = property
      return
    }
    if (validator === 'transform') {
      if (schema['default'] == null) {
        const cb = property
        data[key] = typeof cb === 'function'
          ? cb(value)
          : cb
      }
      return
    }
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
