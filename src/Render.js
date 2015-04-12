var createElement = require('virtual-dom/create-element');

var Render = function (streams, callback) {
  Render.streams = streams;
  var rootNode = callback();
  var rootElement = createElement(rootNode);
  document.body.appendChild(rootElement)
};

module.exports = Render;
