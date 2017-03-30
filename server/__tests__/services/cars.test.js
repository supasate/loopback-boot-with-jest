'use strict'

var boot = require('loopback-boot')
var loopback = require('loopback')
var path = require('path')

var app = loopback()

describe('Cars', function() {
  var server

  beforeAll(function(done) {
    console.log(path.join(__dirname, '..', '..'))
    var options = {
      scriptExtensions: ['.js'],
      appRootDir: path.join(__dirname, '..', '..'),
    }
    boot(app, options, function(err) {
      if (err) return done(err)

      server = app.listen(function() {
        done()
      })
    })
  })

  afterAll(function(done) {
    server.close()
    done()
  })

  it('loads model', function(done) {
    var Car = app.models.Car
    Car.create({wheels: 6})
    Car.findOne({wheels: 6}, function(err, car) {
      if (err) return done(err)

      expect(car.wheels).toBe(6)
      done()
    })
  })
})
