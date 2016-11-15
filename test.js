'use strict'

var test = require('tape')
var isSecret = require('./')

test('isSecret.key true', function (t) {
  t.equal(isSecret.key('password'), true)
  t.end()
})

test('isSecret.key false', function (t) {
  t.equal(isSecret.key('copenhagen'), false)
  t.end()
})

test('isSecret.value credt card number', function (t) {
  t.equal(isSecret.value('1234 1234 1234 1234'), true)
  t.equal(isSecret.value('1234-1234-1234-1234'), true)
  t.equal(isSecret.value('1234123412341234'), true)
  t.end()
})

test('isSecret.value false', function (t) {
  t.equal(isSecret.value('foobar'), false)
  t.end()
})
