# Isokay

[![Build Status](https://travis-ci.org/tether/isokay.svg?branch=master)](https://travis-ci.org/tether/isokay)
[![NPM](https://img.shields.io/npm/v/isokay.svg)](https://www.npmjs.com/package/isokay)
[![Downloads](https://img.shields.io/npm/dm/isokay.svg)](http://npm-stat.com/charts.html?package=isokay)
[![guidelines](https://tether.github.io/contribution-guide/badge-guidelines.svg)](https://github.com/tether/contribution-guide)

Javascript schema validator. 
  - **Validation** : Validate an object property against a function. If the function returns false, a verbose error is thrown.
  - **Transformation** : Map an object property with a function to change its value (similar to Array.prototype.map).
  - **Coercion** : Coerce an object property into a string, number, boolean, array or date.

## Usage

```js
const isokay = require('isokay')

const data = {
  foo: 'bar'
}

isokay(data, {
  foo: {
    required: true,
    transform(value) {
      return 'hello ' + value
    },
   beep: {
     type: 'number',
     default: 10,
     validate(val) {
       return val > 5
     }
   }
  }
}).then(result => {
  console.log(result)
  // => {foo: 'hello bar'}
})
```

## Installation

```shell
npm install isokay --save
```

[![NPM](https://nodei.co/npm/isokay.png)](https://nodei.co/npm/isokay/)


## Question

For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/tether/contribution-guide/blob/master/community.md" target="_blank">community guidelines</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

The open source community is very important to us. If you want to participate to this repository, please make sure to read our <a href="https://github.com/tether/contribution-guide" target="_blank">guidelines</a> before making any pull request. If you have any related project, please let everyone know in our wiki.

## License

The MIT License (MIT)

Copyright (c) 2017 Tether Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
