var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var Delegator = require('dom-delegator');
var createElement = require('virtual-dom/create-element');
var Render = require('./Render');

new Delegator();

var isBacon = function (observable) {
  return !!('onValue' in observable);
};

var isRx = function (observable) {
  return !!('forEach' in observable);
};

var ViewPrototype = {
  init: function () {

    var el, value, tree, rendering = false;

    // Is synchronous
    if (isBacon(this.observable)) {

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

      // Is asynchronous
    } else if (isRx(this.observable)) {
      tree = h('div');
      this.observable.forEach(function (value) {
          this.onChange(el, value);
          requestAnimationFrame(function () {
            rendering = false;
          }.bind(this));
          rendering = true;
      }.bind(this)); 
    }
    var valueObserverMethod = 'onValue' in this.observable ? 'onValue' : 'forEach';


    this.tree = tree;
    el = createElement(this.tree);

    return el;
  },
  update: function (prev, el) {

    var valueObserverMethod = 'onValue' in this.observable ? 'onValue' : 'getValue';
    if (isBacon(this.observable)) {
      var unsubscribe = this.observable[valueObserverMethod](function (value) {
        this.tree = value;
      }.bind(this));
      unsubscribe();
    } else if (isRx(this.observable)) {
      this.tree = this.observable.getValue();
    }

    var patches = diff(prev.tree, this.tree);
    patch(el, patches);

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
    instance.observable = constr(props, Render.streams, function (cb) {
      destroy = cb;
    });
    instance.destroy = destroy;
    instance.type = 'Widget';
    return instance;
  };

};
module.exports = createView;
