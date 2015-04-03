var createElement = require('virtual-dom/create-element');

var Render = function (model, intents, callback) {

  Render.model = model;
  Render.intents = intents;
  var rootNode = callback();
  var rootElement = createElement(rootNode);
  document.body.appendChild(rootElement)
};

module.exports = Render;
