module.exports = function (observer, method) {
  var boundArgs = [].slice.call(arguments, 0);
  boundArgs.splice(0, 2);
  return function () {
    var args = [].slice.call(arguments, 0);
    observer[method].apply(observer, boundArgs.concat(args));
  };
};
