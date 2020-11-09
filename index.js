'use strict'

var KEYS = [
  // generic
  /passw(or)?d/i,
  /^pw$/,
  /^pass$/i,
  /secret/i,
  /token/i,
  /api[-._]?key/i,
  /session[-._]?id/i,

  // specific
  /^connect\.sid$/ // https://github.com/expressjs/session
]

var VALUES = [
  /^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/ // credit card number
]

exports.key = key
exports.value = value

/**
 * Converts any input to string.
 * @data {any} Any JS type of data
 * @returns string representation of that data or undefined if it can
 * not be converted into a string.
 */
function inputToString (data) {
  try {
    return String(data)
  } catch (err) {
    if (err instanceof TypeError) return undefined
    throw err
  }
}

function key (str) {
  return KEYS.some(function (regex) {
    return regex.test(str)
  })
}

function value (data) {
  var str = inputToString(data)
  return VALUES.some(function (regex) {
    return regex.test(str)
  })
}
