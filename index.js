'use strict'

var KEYS = [
  // generic
  /passw(or)?d/i,
  /^pw$/,
  /secret/i,
  /token/i,
  /api_?key/i,
  /sessionid/i,

  // specific
  /^connect\.sid$/ // https://github.com/expressjs/session
]

var VALUES = [
  /^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/ // credit card number
]

exports.key = key
exports.value = value

function key (str) {
  return KEYS.some(function (regex) {
    return regex.test(str)
  })
}

function value (str) {
  return VALUES.some(function (regex) {
    return regex.test(str)
  })
}
