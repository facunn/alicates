'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

/* jshint -W067 */

var curry = function curry(fn, aux) {
  return (aux = function (args) {
    return args.length < fn.length ? function () {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      return aux(args.concat(newArgs));
    } : fn.apply(undefined, _toConsumableArray(args));
  })([]);
};
exports.curry = curry;
/* jshint +W067 */

var reduce = curry(function (op, a, _ref) {
  var _ref2 = _toArray(_ref);

  var x = _ref2[0];

  var y = _ref2.slice(1);

  return x !== undefined ? reduce(op, op(a, x), y) : a;
});

exports.reduce = reduce;

var map = curry(function (op, y) {
  return reduce(function (a, x) {
    return [].concat(_toConsumableArray(a), [op(x)]);
  }, [], y);
});

exports.map = map;

var filter = curry(function (op, y) {
  return reduce(function (a, x) {
    return op(x) ? [].concat(_toConsumableArray(a), [x]) : a;
  }, [], y);
});

exports.filter = filter;

var reverse = function reverse(y) {
  return reduce(function (a, x) {
    return [x].concat(_toConsumableArray(a));
  }, [], y);
};

exports.reverse = reverse;

var sequence = function sequence() {
  for (var _len2 = arguments.length, ops = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    ops[_key2] = arguments[_key2];
  }

  return function (a) {
    return reduce(function (a, op) {
      return op(a);
    }, a, ops);
  };
};

exports.sequence = sequence;

var compose = function compose() {
  for (var _len3 = arguments.length, ops = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    ops[_key3] = arguments[_key3];
  }

  return sequence.apply(undefined, _toConsumableArray(reverse(ops)));
};

exports.compose = compose;

var all = curry(function (fn, _ref3) {
  var _ref32 = _toArray(_ref3);

  var x = _ref32[0];

  var y = _ref32.slice(1);

  return x === undefined ? true : fn(x) ? all(fn, y) : false;
});

exports.all = all;

var any = curry(function (fn, _ref4) {
  var _ref42 = _toArray(_ref4);

  var x = _ref42[0];

  var y = _ref42.slice(1);

  return x === undefined ? false : fn(x) ? true : any(fn, y);
});

exports.any = any;

var none = curry(function (fn, _ref5) {
  var _ref52 = _toArray(_ref5);

  var x = _ref52[0];

  var y = _ref52.slice(1);

  return x === undefined ? true : fn(x) ? false : none(fn, y);
});

exports.none = none;
/* jshint -W067 */

var zip = curry(function (y1, y2) {
  return (function (aux) {
    return (aux = function (_ref6, _ref7, acc) {
      var _ref62 = _toArray(_ref6);

      var x1 = _ref62[0];

      var y1 = _ref62.slice(1);

      var _ref72 = _toArray(_ref7);

      var x2 = _ref72[0];

      var y2 = _ref72.slice(1);

      return x1 === undefined || x2 === undefined ? acc : aux(y1, y2, acc.concat([[x1, x2]]));
    })(y1, y2, []);
  })();
});
/* jshint +W067 */
exports.zip = zip;