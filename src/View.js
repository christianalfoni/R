var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var Delegator = require('dom-delegator');
var createElement = require('virtual-dom/create-element');
var Render = require('./Render');

new Delegator();

var ViewPrototype = {
  init: function (props) {

    var el, value, tree, rendering = false;
    this.observable.onValue(function (value) {
      if (!tree) {
        return tree = value;
      } else if (!rendering) {
        this.onChange(el, value);
        requestAnimationFrame(function () {
          rendering = false;
        }.bind(this));
        rendering = true;
      }
    }.bind(this));
    this.tree = tree;
    el = createElement(this.tree);

    return el;
  },
  update: function (prev, el) {
    var unsubscribe = this.observable.onValue(function (value) {
      this.tree = value;
    }.bind(this));
    var patches = diff(prev.tree, this.tree);
    patch(el, patches);
    unsubscribe();
  },
  onChange: function (el, newTree) {
    var patches = diff(this.tree, newTree);
    patch(el, patches);
    this.tree = newTree;
  },
  destroy: function () {

  }
};

var createView = function (constr) {
  return function (props) {
    var destroy;
    var instance = Object.create(ViewPrototype);
    instance.observable = constr(props, Render.model, Render.intents, function (cb) {
      destroy = cb;
    });
    instance.destroy = destroy;
    instance.type = 'Widget';
    return instance;
  };

};
module.exports = createView;
