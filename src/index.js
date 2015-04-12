var Observable = require('observable-state');
var Component = require('./Component.js');
var Render = require('./Render.js');
var h = require('virtual-dom/h');
var Hook = require('./Hook.js');

var R = {
  Component: Component,
  Render: Render,
  DOM: h,
  Hook: Hook
};

module.exports = R;
