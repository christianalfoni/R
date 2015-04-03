var Observable = require('observable-state');
var View = require('./View.js');
var Render = require('./Render.js');
var h = require('virtual-dom/h');
var Bacon = require('baconjs');

var R = {
  Controller: function () {
    var bus = new Bacon.Bus();
    var push = bus.push;
    bus.push = function (value) {
      setTimeout(function () {
        push.call(bus, value);
      }, 0);
    };
    bus.bindPush = function (value) {
      return function () {
        bus.push(value);
      };
    };
    return bus;
  },
  View: View,
  Render: Render,
  DOM: h
};

module.exports = R;
