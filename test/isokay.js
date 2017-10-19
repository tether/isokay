
/**
 * Test dependencies.
 */

const test = require('tape')
const isokay = require('..')


test('should return object is schema not specified', assert => {
  assert.plan(1)
  const data = {
    foo: 'bar'
  }
  assert.deepEqual(isokay(data), data)
})


test('should return empty object if data is not passed', assert => {
  assert.plan(1)
  assert.deepEqual(isokay(), {})
})

// test('should generate object parameter', assert => {
//   assert.plan(1)
//   const data = {
//     foo: 'bar'
//   }
//   assert.deepEqual(isokay(data, {
//     hello() {
//       return 'world'
//     }
//   }), data)
// })
