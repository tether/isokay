
/**
 * Test dependencies.
 */

const test = require('tape')
const isokay = require('..')


test('should retur object is schema not specified', assert => {
  assert.plan(1)
  const data = {
    foo: 'bar'
  }
  assert.deepEqual(isokay(data), data)
})
