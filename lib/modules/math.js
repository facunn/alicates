'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _mathAdd = require('./math/add');

var _add = _interopRequireWildcard(_mathAdd);

var _mathAddAll = require('./math/addAll');

var _addAll = _interopRequireWildcard(_mathAddAll);

var add = _add.add;
exports.add = add;
var addAll = _addAll.addAll;
exports.addAll = addAll;