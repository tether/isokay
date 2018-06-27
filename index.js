
/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (data, schema = {}) {
  return new Promise(resolve => {
    resolve(validator(data, schema))
  })
}

function validator (data, schema) {
  const result = Object.assign({}, data)
  Object.keys(schema).map(key => {
    let value = schema[key]
    const type = typeof value
    if (type !== 'object') {
      value = {
        transform: value
      }
    }
    validate(value, result, key)
  })
  return result
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
  const { required, type, validate, transform, elements } = schema
  const def = schema['default']
  // trigger error if undefined but required
  if (required && bool) throw new Error(`field ${key} is missing`)
  // coerce to type
  if (type && !bool) {
    let before = coerce(type, key, value)
    data[key] = elements ? before.map(item => validator(item, elements)) : before
  }
  // validate value
  if (validate) {
    const cb = check(validate, key)
    if (type === 'array') value.map(cb)
    else cb(value)
  }
  // apply default value
  if (def && bool) data[key] = def
  // apply transform
  if (transform && def == null) {
    data[key] = typeof transform === 'function'
      ? (type === 'array' ? value.map(transform) : transform(value))
      : transform
  }
}

/**
 * Validate a value given a specific function.
 *
 * @param {Function} cb
 * @param {String} key
 * @return {Function}
 * @api private
 */

function check (cb, key) {
  return value => {
    if (!cb(value)) throw new Error(`field ${key} can not be validated`)
  }
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
  if (type === 'string') result = String(value).trim()
  else if (type === 'number') {
    result = Number(value)
    if (isNaN(result)) throw new Error(`field ${field} can not be converted to a number`)
  } else if (type === 'array') {
    result = [].concat(value)
  } else if (type === 'date') {
    result = Date.parse(value)
    if (isNaN(result)) throw new Error(`field ${field} can not be converted into a date`)
  } else if (type === 'boolean') result = Boolean(value)
  return result
}
