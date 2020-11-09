'use strict'

var isSecret = require('./')
var test = require('tape')
var util = require('util')

test('isSecret.key true', function (t) {
  t.equal(isSecret.key('pass'), true)
  t.equal(isSecret.key('password'), true)
  t.equal(isSecret.key('api-key'), true)
  t.equal(isSecret.key('api.key'), true)
  t.equal(isSecret.key('api_key'), true)
  t.equal(isSecret.key('apikey'), true)
  t.end()
})

test('isSecret.key false', function (t) {
  t.equal(isSecret.key('passport'), false)
  t.equal(isSecret.key('copenhagen'), false)
  t.equal(isSecret.key('api*key'), false)
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

// Test all possible JS types minus string
test('isSecret.value handling of types', function (t1) {
  var typeTests = [
    ['array of length 0', [], false],
    ['boolean as false', false, false],
    ['boolean as true', true, false],
    ['function returning undefined', function () {}, false],
    ['null', null, false],
    ['number not 16 digits', 42, false],
    ['number with 16 digits', 4242424242424242, true],
    ['object with prototype', {}, false],
    ['object without prototype', Object.create(null), false],
    ['symbol foo', Symbol('foo'), false],
    ['undefined', undefined, false]
  ]
  typeTests.forEach(function (testData) {
    var data = testData[1]
    var expt = testData[2]
    var desc = util.format('value of %s returns %s', testData[0], expt)

    t1.test(desc, function (t2) {
      t2.equal(isSecret.value(data), expt)
      t2.end()
    })
  })
  t1.end()
})
