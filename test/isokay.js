
/**
 * Test dependencies.
 */

const test = require('tape')
const isokay = require('..')


test('should return promise', assert => {
  assert.plan(1)
  const promise = isokay()
  assert.equal(typeof promise.then, 'function')
})

test('should return object is schema not specified', assert => {
  assert.plan(1)
  const data = {
    foo: 'bar'
  }
  isokay(data).then(result => {
    assert.deepEqual(result, data)
  })
})


test('should return empty object if data is not passed', assert => {
  assert.plan(1)
  isokay().then(result => {
    assert.deepEqual(result, {})
  })
})


test('should create object parameter from value different than object', assert => {
  assert.plan(2)
  const data = {
    foo: 'bar'
  }
  isokay(data, {
    hello: 'world'
  }).then(result => {
    assert.deepEqual(result, {
      foo: 'bar',
      hello: 'world'
    })
  })

  isokay(data, {
    foo: 'boop'
  }).then(result => {
    assert.deepEqual(result, {
      foo: 'boop'
    })
  })
})

test('should create object parameter from schema function', assert => {
  assert.plan(1)
  isokay(null, {
    hello() {
      return 'world'
    }
  }).then(result => {
    assert.deepEqual(result, {
      hello: 'world'
    })
  })
})

test('should pass existing value to schema function', assert => {
  assert.plan(1)
  const data = {
    hello: 'canada'
  }
  isokay(data, {
    hello(value) {
      return 'hello ' + value
    }
  }).then(result => {
    assert.deepEqual(result, {
      hello: 'hello canada'
    })
  })
})

test('should coerce string to number', assert => {
  assert.plan(1)
  const data = {
    foo: '2'
  }
  isokay(data, {
    foo: {
      type: 'number'
    }
  }).then(result => {
    assert.deepEqual(result, {
      foo: 2
    })
  })
})

test('should trigger error if string can not be converted into a number', assert => {
  assert.plan(1)
  const data = {
    foo: 'what'
  }
  isokay(data, {
    foo: {
      type: 'number'
    }
  }).then(null, err => {
    assert.equal(err.message, 'field foo can not be converted to a number')
  })
})

test('should trigger an error if a required field does not exist', assert => {
  assert.plan(1)
  const data = {
    foo: 'what'
  }
  isokay(data, {
    bar: {
      required: true
    }
  }).then(null, err => {
    assert.equal(err.message, 'field bar is missing')
  })
})


test('should validate value against a function', assert => {
  assert.plan(2)
  const data = {
    length: 10
  }
  isokay(data, {
    length: {
      validate(value) {
        return value < 12
      }
    }
  }).then(result => {
    assert.deepEqual(result, data)
  })

  isokay(data, {
    length: {
      validate(value) {
        return value > 12
      }
    }
  }).then(null, err => {
    assert.equal(err.message, 'field length can not be validated')
  })
})

// test('should validate value against a promise returned by a function', assert => {
//   assert.plan(1)
//   isokay({
//     legth: 10
//   }, {
//     length: {
//       validate(val) {
//         return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve(val > 5)
//           }, 500)
//         })
//       }
//     }
//   })
// })


test('should transform value with function', assert => {
  assert.plan(2)
  isokay({
    foo: 'bar'
  }, {
    hello: {
      transform() {
        return 'world'
      }
    },
    foo: {
      required: true,
      transform(val) {
        return 'hello '+ val
      }
    }
  }).then(result => {
    assert.equal(result.hello, 'world')
    assert.equal(result.foo, 'hello bar')
  })
})

test('should transform value with primitive', assert => {
  assert.plan(1)
  isokay({
    foo: 'bar'
  }, {
    foo: {
      transform: 'boop'
    }
  }).then(result => {
    assert.equal(result.foo, 'boop')
  })
})
