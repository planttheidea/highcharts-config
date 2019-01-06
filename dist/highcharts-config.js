(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("unchanged"));
	else if(typeof define === 'function' && define.amd)
		define("buildConfig", ["unchanged"], factory);
	else if(typeof exports === 'object')
		exports["buildConfig"] = factory(require("unchanged"));
	else
		root["buildConfig"] = factory(root["unchanged"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_unchanged__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pathington/es/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/pathington/es/constants.js ***!
  \*************************************************/
/*! exports provided: CACHE, DOTTY_WITH_BRACKETS_SYNTAX, MAX_CACHE_SIZE, NUMBER, QUOTED_KEY, VALID_QUOTES, VALID_KEY, WHITE_SPACE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CACHE", function() { return CACHE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOTTY_WITH_BRACKETS_SYNTAX", function() { return DOTTY_WITH_BRACKETS_SYNTAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_CACHE_SIZE", function() { return MAX_CACHE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER", function() { return NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUOTED_KEY", function() { return QUOTED_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_QUOTES", function() { return VALID_QUOTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_KEY", function() { return VALID_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITE_SPACE", function() { return WHITE_SPACE; });
/**
 * @constant {Object} CACHE
 *
 * @property {function} clear clear the cache results
 * @property {Object} results the map of path => array results
 * @property {number} size the size of the cache
 */
var CACHE = {
  clear: function clear() {
    CACHE.results = {};
    CACHE.size = 0;
  },
  results: {},
  size: 0
};
/**
 * @constant {RegExp} DOTTY_WITH_BRACKETS_SYNTAX
 */

var DOTTY_WITH_BRACKETS_SYNTAX = /"[^"]+"|`[^`]+`|'[^']+'|[^.[\]]+/g;
/**
 * @constant {number} MAX_CACHE_SIZE
 */

var MAX_CACHE_SIZE = 500;
/**
 * @constant {RegExp} NUMBER
 */

var NUMBER = /^\d+$/i;
/**
 * @constant {RegExp} QUOTED_KEY
 */

var QUOTED_KEY = /^"[^"]+"|`[^`]+`|'[^']+'$/;
/**
 * @constant {Array<string>} VALID_QUOTES
 */

var VALID_QUOTES = /^["'`]{1}$/;
/**
 * @constant {RegExp} VALID_KEY
 */

var VALID_KEY = /^\d+$|^[a-zA-Z_$][\w$]+$/;
/**
 * @constant {RegExp} WHITE_SPACE
 */

var WHITE_SPACE = /\s/;

/***/ }),

/***/ "./node_modules/pathington/es/index.js":
/*!*********************************************!*\
  !*** ./node_modules/pathington/es/index.js ***!
  \*********************************************/
/*! exports provided: create, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/pathington/es/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/pathington/es/utils.js");
// constants
 // utils


/**
 * @function create
 *
 * @description
 * create a new path string based on the path and quote passed
 *
 * @param {Array<number|string>} path the path to convert to a string
 * @param {string} [quote="] the quote string to use when quoting keys
 * @returns {string} the path string
 */

var create = function create(path, quote) {
  if (quote === void 0) {
    quote = '"';
  }

  if (!Array.isArray(path)) {
    throw new ReferenceError('path passed must be an array');
  }

  if (!_constants__WEBPACK_IMPORTED_MODULE_0__["VALID_QUOTES"].test(quote)) {
    throw new SyntaxError("quote " + quote + " passed is invalid, must be \", `, or '.");
  }

  var pathString = path.reduce(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createGetNormalizedCreateKey"])(quote), '');
  return pathString[0] === '.' ? pathString.slice(1) : pathString;
};
/**
 * @function parse
 *
 * @description
 * the path parsed into a valid array of keys / indices
 *
 * @param {Array<number|string>|number|string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */

var parse = function parse(path) {
  if (typeof path === 'string') {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseStringPath"])(path);
  }

  if (Array.isArray(path)) {
    return path.map(_utils__WEBPACK_IMPORTED_MODULE_1__["getNormalizedParseKey"]);
  }

  return [typeof path === 'number' ? path : "" + path];
};

/***/ }),

/***/ "./node_modules/pathington/es/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/pathington/es/utils.js ***!
  \*********************************************/
/*! exports provided: isNumericKey, isQuotedKey, shouldBeInBrackets, shouldBeInQuotes, createGetNormalizedCreateKey, getNormalizedParseKey, parseStringPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumericKey", function() { return isNumericKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isQuotedKey", function() { return isQuotedKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldBeInBrackets", function() { return shouldBeInBrackets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldBeInQuotes", function() { return shouldBeInQuotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGetNormalizedCreateKey", function() { return createGetNormalizedCreateKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedParseKey", function() { return getNormalizedParseKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseStringPath", function() { return parseStringPath; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/pathington/es/constants.js");
// constants

/**
 * @function isNumericKey
 *
 * @description
 * is the key passed a numeric string
 *
 * @param {string} key the key to test
 * @returns {boolean} is the key passed a numeric string
 */

var isNumericKey = function isNumericKey(key) {
  return !!key.length && _constants__WEBPACK_IMPORTED_MODULE_0__["NUMBER"].test(key);
};
/**
 * @function isQuotedKey
 *
 * @description
 * is the key passed a quoted key
 *
 * @param {string} key the key to test
 * @returns {boolean} is the key a quoted key
 */

var isQuotedKey = function isQuotedKey(key) {
  return _constants__WEBPACK_IMPORTED_MODULE_0__["QUOTED_KEY"].test(key);
};
/**
 * @function shouldBeInBrackets
 *
 * @description
 * should the key passed be encased in brackets when in the path string
 *
 * @param {*} key the key that is being added to the path string
 * @returns {boolean} should the key be in brackets
 */

var shouldBeInBrackets = function shouldBeInBrackets(key) {
  return typeof key === 'number' || isNumericKey(key) || isQuotedKey(key);
};
/**
 * @function shouldBeInQuotes
 *
 * @description
 * should the key passed be encased in quotes when in the path string
 *
 * @param {*} key the key that is being added to the path string
 * @returns {boolean} should the key be in quotes
 */

var shouldBeInQuotes = function shouldBeInQuotes(key) {
  return _constants__WEBPACK_IMPORTED_MODULE_0__["WHITE_SPACE"].test(key) || !_constants__WEBPACK_IMPORTED_MODULE_0__["VALID_KEY"].test(key);
};
/**
 * @function createGetNormalizedCreateKey
 *
 * @description
 * get the normalized path string based on the quote and key passed
 *
 * @param {string} [quote="] the quote string to use
 * @returns {function(string, *): string}
 */

var createGetNormalizedCreateKey = function createGetNormalizedCreateKey(quote) {
  return function (existingString, key) {
    var normalizedKey = shouldBeInQuotes(key) ? "" + quote + key + quote : key;
    return shouldBeInBrackets(normalizedKey) ? existingString + "[" + normalizedKey + "]" : existingString + "." + normalizedKey;
  };
};
/**
 * @function getNormalizedParseKey
 *
 * @description
 * get the key as a number if parseable, or as a quoted string if applicable
 *
 * @param {string} key the key to try to parse
 * @returns {number|string} the parsed key
 */

var getNormalizedParseKey = function getNormalizedParseKey(key) {
  var cleanKey = isQuotedKey(key) ? key.substring(1, key.length - 1) : key;
  return isNumericKey(cleanKey) ? +cleanKey : cleanKey;
};
/**
 * @function parsePath
 *
 * @description
 * parse the path, memoizing the results
 *
 * @param {string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */

var parseStringPath = function parseStringPath(path) {
  if (_constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].results[path]) {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].results[path];
  }

  if (_constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].size > _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_CACHE_SIZE"]) {
    _constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].clear();
  }

  _constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].results[path] = path ? path.match(_constants__WEBPACK_IMPORTED_MODULE_0__["DOTTY_WITH_BRACKETS_SYNTAX"]).map(getNormalizedParseKey) : [path];
  _constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].size++;
  return _constants__WEBPACK_IMPORTED_MODULE_0__["CACHE"].results[path];
};

/***/ }),

/***/ "./src/classes/ChartConfig.js":
/*!************************************!*\
  !*** ./src/classes/ChartConfig.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Config2 = __webpack_require__(/*! ./Config */ "./src/classes/Config.js");

var _Config3 = _interopRequireDefault(_Config2);

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // classes


// constants


// utils


/**
 * @module classes/ChartConfig
 */

var isArray = Array.isArray;

/**
 * @private
 *
 * @class ChartConfig
 * @classdesc configuration object builder for charts
 */

var ChartConfig = function (_Config) {
  _inherits(ChartConfig, _Config);

  function ChartConfig() {
    _classCallCheck(this, ChartConfig);

    return _possibleConstructorReturn(this, _Config.apply(this, arguments));
  }

  /**
   * @function addType
   *
   * @description
   * add a chart type with provided series
   *
   * @param {string} type chart type to add to config
   * @param {Array<Object>} seriesPassed data series to populate chart with
   * @returns {ChartConfig} new config class
   */
  ChartConfig.prototype.addType = function addType(type, seriesPassed) {
    if (!isArray(seriesPassed) && !(0, _utils.isPlainObject)(seriesPassed)) {
      throw new TypeError('Series passed must be either a plain object or an array of plain objects.');
    }

    var series = isArray(seriesPassed) ? seriesPassed : [seriesPassed];
    var config = (0, _utils.getNewConfigWithSeries)(this.config, (0, _utils.getNewChartSeries)(series, type));

    return new ChartConfig(config, this.options);
  };

  /**
   * @function getType
   *
   * @description
   * get a specific type (or a list of types) from the series in the config
   *
   * @param {Array<string>|string} types the type(s) to select from the config
   * @returns {Array<Object>|Object|null} the matching type(s)
   */


  ChartConfig.prototype.getType = function getType(types) {
    var series = this.get('series');
    var length = series ? series.length : 0;

    if (!length) {
      return null;
    }

    return (0, _utils.isUndefined)(types) ? (0, _utils.getFirstIfOnly)(series) : (0, _utils.getSpecificSeries)(series, (0, _utils.getArrayOfItem)(types));
  };

  /**
   * @function removeType
   *
   * @description
   * remove an instance of a chart type, all instances, or all charts
   *
   * @param {Array<number|string>|string} [chartPath] chart type with optional index
   * @returns {ChartConfig} new config class
   */


  ChartConfig.prototype.removeType = function removeType(chartPath) {
    if ((0, _utils.isUndefined)(chartPath)) {
      return this.remove('series');
    }

    var _config$series = this.config.series,
        currentSeries = _config$series === undefined ? [] : _config$series;


    if (!currentSeries.length) {
      return this;
    }

    var _getPathArray = (0, _utils.getPathArray)(chartPath),
        chart = _getPathArray[0],
        indexString = _getPathArray[1];

    if ((0, _utils.isUndefined)(indexString)) {
      var series = currentSeries.filter(function (_ref) {
        var type = _ref.type;
        return type !== chart;
      });

      return this.set('series', series);
    }

    var chartIndices = (0, _utils.getMatchingChartIndices)(currentSeries, chart);
    var indexNumber = +indexString;
    var indexToRemove = chartIndices[(0, _utils.isNAN)(indexNumber) ? 0 : indexNumber];

    return (0, _utils.isUndefined)(indexToRemove) ? this : this.remove('series[' + indexToRemove + ']');
  };

  /**
   * @function updateType
   *
   * @description
   * update an existing type in the series of the config
   *
   * @param {Array<number|string>|string} chartPath chart type with optional index
   * @param {Object} seriesInstance value to update matching series instance to
   * @returns {ChartConfig} new config class
   */


  ChartConfig.prototype.updateType = function updateType(chartPath, seriesInstance) {
    var _config$series2 = this.config.series,
        currentSeries = _config$series2 === undefined ? [] : _config$series2;


    var length = currentSeries.length;

    if ((0, _utils.isUndefined)(chartPath) || !length) {
      return this;
    }

    if (!(0, _utils.isPlainObject)(seriesInstance)) {
      throw new TypeError('Series passed must be a plain object.');
    }

    var _getPathArray2 = (0, _utils.getPathArray)(chartPath),
        chart = _getPathArray2[0],
        indexString = _getPathArray2[1];

    var chartIndices = (0, _utils.getMatchingChartIndices)(currentSeries, chart);
    var indexNumber = +indexString;
    var indexToUpdate = chartIndices[(0, _utils.isNAN)(indexNumber) ? 0 : indexNumber];

    var key = 'series[' + indexToUpdate + ']';
    var existingSeries = this.get(key);

    if ((0, _utils.isUndefined)(existingSeries)) {
      return this;
    }

    var mergedSeries = (0, _utils.assign)({}, existingSeries, seriesInstance);
    var series = (0, _utils.getNewChartSeries)([mergedSeries], chart);

    return (0, _utils.isUndefined)(indexToUpdate) ? this : this.set(key, series[0]);
  };

  return ChartConfig;
}(_Config3.default);

_constants.CHART_CONVENIENCE_METHOD_NAMES.forEach(ChartConfig.addMethod(ChartConfig));

exports.default = ChartConfig;

/***/ }),

/***/ "./src/classes/Config.js":
/*!*******************************!*\
  !*** ./src/classes/Config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _unchanged = __webpack_require__(/*! unchanged */ "unchanged");

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // external dependencies


// utils


/**
 * @module classes/Config
 */

/**
 * @private
 *
 * @class Config
 * @classdesc configuration object builder base class
 */
var Config = function () {
  /**
   * @function constructor
   *
   * @description
   * build the initial state of the config class
   *
   * @param {Object} [config={}] configuration to assign to the class
   * @param {Object} [options={}] additional options for instantiating the class
   * @returns {Config} configuration class
   */
  function Config() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Config);

    this.config = null;
    this.isValid = null;
    this.options = null;

    this.config = (0, _utils.getConfig)(Config, config);
    this.options = (0, _utils.assign)({}, options);

    var validate = this.options.validate;


    if ((0, _utils.isFunction)(validate)) {
      this.isValid = validate(this.config);
    }

    return this;
  }

  /**
   * @instance
   * @type {Object|null}
   */


  /**
   * @instance
   * @type {boolean|null}
   */


  /**
   * @instance
   * @type {Object|null}
   */


  /**
   * @function addConvenienceMethod
   * @static
   *
   * @description
   * add a convenience method to the constructor passed
   *
   * @param {function} Constructor constructor to assign method to prototype of
   * @param {Object} Constructor.prototype prototype to assign method to
   * @returns {function(string, (function|number)): (ChartConfig|OptionsConfig)} method to add convenience method
   */
  Config.addMethod = function addMethod(Constructor) {
    return function (methodName, method) {
      var methodToAssign = (0, _utils.isFunction)(method) ? (0, _utils.createAddMethodWrapper)(Constructor, method) : (0, _utils.createPropertyConvenienceMethod)(methodName);

      Object.defineProperty(Constructor.prototype, methodName, {
        configurable: false,
        enumerable: false,
        value: methodToAssign,
        writable: true
      });

      return Constructor;
    };
  };

  /**
   * @function clear
   *
   * @description
   * clear out the current config and start anew
   *
   * @returns {Config} new config class
   */


  Config.prototype.clear = function clear() {
    return new this.constructor({}, this.options);
  };

  /**
   * @function get
   *
   * @description
   * get a value from a path (top-level or nested) from the config
   *
   * @param {string} path path to retrieve from config
   * @returns {*} value at path
   */


  Config.prototype.get = function get(path) {
    return (0, _utils.isUndefined)(path) ? this.config : (0, _unchanged.get)(path, this.config);
  };

  /**
   * @function merge
   *
   * @description
   * merge the configs passed to form a new config
   *
   * @returns {Config} new config class
   */


  Config.prototype.merge = function merge() {
    for (var _len = arguments.length, otherConfigs = Array(_len), _key = 0; _key < _len; _key++) {
      otherConfigs[_key] = arguments[_key];
    }

    if (!otherConfigs.length) {
      return this;
    }

    var config = otherConfigs.reduce(function (newConfig, config) {
      return (0, _unchanged.merge)(null, newConfig, (0, _utils.getConfig)(Config, config));
    }, this.config);

    return new this.constructor(config, this.options);
  };

  /**
   * @function remove
   *
   * @description
   * remove item at path (top-level or nested) in the config
   *
   * @param {string} paths path to remove from config
   * @returns {Config} new config class
   */


  Config.prototype.remove = function remove(paths) {
    var keys = (0, _utils.getArrayOfItem)(paths);
    var config = (0, _utils.removeOrOmit)(keys, this.config);

    return new this.constructor(config, this.options);
  };

  /**
   * @function set
   *
   * @param {string} path path to set in config
   * @param {*} value value to assign to path
   * @returns {Config} new config class
   */


  Config.prototype.set = function set(path, value) {
    if ((0, _utils.isUndefined)(path)) {
      return this;
    }

    var config = (0, _utils.isPlainObject)(path) ? (0, _utils.getNewConfigFromObject)(this.config, path) : (0, _unchanged.set)(path, value, this.config);

    return new this.constructor(config, this.options);
  };

  /**
   * @function toString
   *
   * @description
   * return stringified config
   *
   * @returns {string} stringified config
   */


  Config.prototype.toString = function toString() {
    return JSON.stringify(this.config, null, 2);
  };

  return Config;
}();

exports.default = Config;

/***/ }),

/***/ "./src/classes/OptionsConfig.js":
/*!**************************************!*\
  !*** ./src/classes/OptionsConfig.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Config2 = __webpack_require__(/*! ./Config */ "./src/classes/Config.js");

var _Config3 = _interopRequireDefault(_Config2);

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // classes


// constants


/**
 * @module classes/OptionsConfig
 */

/**
 * @private
 *
 * @class OptionsConfig
 * @classdesc configuration object builder for global options
 */
var OptionsConfig = function (_Config) {
  _inherits(OptionsConfig, _Config);

  function OptionsConfig() {
    _classCallCheck(this, OptionsConfig);

    return _possibleConstructorReturn(this, _Config.apply(this, arguments));
  }

  return OptionsConfig;
}(_Config3.default);

_constants.OPTIONS_CONVENIENCE_METHOD_NAMES.forEach(OptionsConfig.addMethod(OptionsConfig));

exports.default = OptionsConfig;

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * @module constants
 */

/**
 * @private
 *
 * @constant
 * @type {Array<string>}
 * @desfault
 */
var CHART_CONVENIENCE_METHOD_NAMES = exports.CHART_CONVENIENCE_METHOD_NAMES = ['accessibility', 'chart', 'colorAxis', 'colors', 'credits', 'data', 'defs', 'drilldown', 'exporting', 'labels', 'legend', 'loading', 'mapNavigation', 'navigation', 'noData', 'pane', 'plotOptions', 'responsive', 'series', 'subtitle', 'title', 'tooltip', 'xAxis', 'yAxis', 'zAxis'];

/**
 * @private
 *
 * @constant
 * @type {Array<string>}
 * @default
 */
var OPTIONS_CONVENIENCE_METHOD_NAMES = exports.OPTIONS_CONVENIENCE_METHOD_NAMES = ['global', 'lang'];

/**
 * @private
 *
 * @constant
 * @type {Array<string>}
 * @default
 */
var CHARTS_UNABLE_TO_BE_MIXED = exports.CHARTS_UNABLE_TO_BE_MIXED = ['funnel', 'gauge', 'heatmap', 'pyramid', 'solidgauge', 'treemap'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ChartConfig = __webpack_require__(/*! ./classes/ChartConfig */ "./src/classes/ChartConfig.js");

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _OptionsConfig = __webpack_require__(/*! ./classes/OptionsConfig */ "./src/classes/OptionsConfig.js");

var _OptionsConfig2 = _interopRequireDefault(_OptionsConfig);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module buildConfig
 */

/**
 * @function buildConfig
 *
 * @description
 * create a configuration builder class
 *
 * @example
 * import buildConfig from 'highcharts-config';
 *
 * const config = buildConfig()
 *   .addType('line', {
 *     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
 *     name: 'Stuff'
 *   })
 *   .get();
 *
 * console.log(config);
 * // {series: [{data: [...], name: 'Stuff', type: 'line'}]}
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {ChartConfig} the configuration class for a given chart
 */
var buildConfig = (0, _utils.createBuildConfig)(_ChartConfig2.default);

/**
 * @function buildConfig.addChartMethod
 *
 * @description
 * add a custom method to the chart config builder
 *
 * @param {string} methodName name of the custom method
 * @param {function} method method to execute in the chain
 * @returns {function} constructor to add method to
 */


// utils
// classes
buildConfig.addChartMethod = (0, _utils.createAddMethod)(_ChartConfig2.default, buildConfig);

/**
 * @function buildConfig.addOptionsMethod
 *
 * @description
 * add a custom method to the options config builder
 *
 * @param {string} methodName name of the custom method
 * @param {function} method method to execute in the chain
 * @returns {function} constructor to add method to
 */
buildConfig.addOptionsMethod = (0, _utils.createAddMethod)(_OptionsConfig2.default, buildConfig);

/**
 * @function buildConfig.chart
 *
 * @description
 * create a configuration builder class for charts
 *
 * @example
 * import buildConfig from 'highcharts-config';
 *
 * const config = buildConfig()
 *   .addType('line', {
 *     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
 *     name: 'Stuff'
 *   })
 *   .get();
 *
 * console.log(config);
 * // {series: [{data: [...], name: 'Stuff', type: 'line'}]}
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {ChartConfig} the configuration class for a given chart
 */
buildConfig.chart = (0, _utils.createBuildConfig)(_ChartConfig2.default);

/**
 * @function buildConfig.options
 *
 * @description
 * create a configuration builder class for options
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {OptionsConfig} the configuration class for options
 */
buildConfig.options = (0, _utils.createBuildConfig)(_OptionsConfig2.default);

exports.default = buildConfig;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removeOrOmit = exports.getSpecificSeries = exports.getNewConfigWithSeries = exports.getNewConfigFromObject = exports.getNewChartSeries = exports.getMatchingChartIndices = exports.getFirstIfOnly = exports.isMixedChartType = exports.createPropertyConvenienceMethod = exports.canCombineChartTypes = exports.getNamespacedKey = exports.getDefaultSeries = exports.getConfig = exports.getPathArray = exports.getArrayOfItem = exports.createBuildConfig = exports.createAddMethodWrapper = exports.createAddMethod = exports.assign = exports.assignFallback = exports.isUndefined = exports.isPlainObject = exports.isNAN = exports.isFunction = undefined;

var _pathington = __webpack_require__(/*! pathington */ "./node_modules/pathington/es/index.js");

var _unchanged = __webpack_require__(/*! unchanged */ "unchanged");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var isArray = Array.isArray;

// constants
// external dependencies

var getOwnPropertySymbols = Object.getOwnPropertySymbols,
    keys = Object.keys;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @private
 *
 * @function isFunction
 *
 * @description
 * is the object passed a function
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a function
 */

var isFunction = exports.isFunction = function isFunction(object) {
  return typeof object === 'function';
};

/**
 * @private
 *
 * @function isNAN
 *
 * @description
 * is the object passed a NaN
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a NaN
 */
var isNAN = exports.isNAN = function isNAN(object) {
  return object !== object;
};

/**
 * @private
 *
 * @function isPlainObject
 *
 * @description
 * is the object passed a plain object
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a plain object
 */
var isPlainObject = exports.isPlainObject = function isPlainObject(object) {
  return !!object && object.constructor === Object;
};

/**
 * @private
 *
 * @function isUndefined
 *
 * @description
 * is the object passed undefined
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object undefined
 */
var isUndefined = exports.isUndefined = function isUndefined(object) {
  return object === void 0;
};

/**
 * @function assignFallback
 *
 * @description
 * the fallback for when Object.assign() is unavailable
 *
 * @param {Object} target the target to assign to
 * @param  {...Object} sources the sources to assign to the target
 * @returns {Object} the assigned object
 */
var assignFallback = exports.assignFallback = function assignFallback(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return sources.reduce(function (assigned, source) {
    if (!isPlainObject(source) && !isUndefined(source)) {
      return assigned;
    }

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        assigned[key] = source[key];
      }
    }

    if (typeof getOwnPropertySymbols !== 'function') {
      return assigned;
    }

    var symbols = getOwnPropertySymbols(source);

    return symbols.reduce(function (assignedWithSymbols, symbol) {
      assignedWithSymbols[symbol] = source[symbol];

      return assignedWithSymbols;
    }, assigned);
  }, target);
};

var assign = exports.assign = typeof Object.assign === 'function' ? Object.assign : assignFallback;

/**
 * @module utils
 */

/**
 * @private
 *
 * @function createAddMethod
 *
 * @description
 * create an add method function for specific constructor
 *
 * @param {function} Constructor constructor to assign method to
 * @param {function} Constructor.addMethod static method to add method to Constructor
 * @param {function} buildConfig main function, returned to allow chainability
 * @returns {function(string, function): function} add method to Constructor
 */
var createAddMethod = exports.createAddMethod = function createAddMethod(Constructor, buildConfig) {
  return function (methodName, method) {
    if (typeof method === 'function') {
      Constructor.addMethod(Constructor)(methodName, method);

      return buildConfig;
    }

    throw new TypeError('The second parameter needs to be a function.');
  };
};

/**
 * @private
 *
 * @function createAddMethodWrapper
 *
 * @description
 * create wrapper for method to ensure chainability
 *
 * @param {function} Constructor constructor to assign method to
 * @param {function} method method to execute in chain
 * @returns {function(): (ChartConfig|OptionsConfig)} new configuration class
 */
var createAddMethodWrapper = exports.createAddMethodWrapper = function createAddMethodWrapper(Constructor, method) {
  return function () {
    var result = method.call(this, this.config, this);
    var config = isPlainObject(result) ? result : this.config;

    return new Constructor(config, this.options);
  };
};

/**
 * @private
 *
 * @function createBuildConfig
 *
 * @description
 * create a buildConfig function specific to a constructor
 *
 * @param {function} Constructor constructor to call with config and options
 * @returns {function(Object, Object): (ChartConfig|OptionsConfig)}
 */
var createBuildConfig = exports.createBuildConfig = function createBuildConfig(Constructor) {
  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Constructor(config, options);
  };
};

/**
 * @private
 *
 * @function getArrayOfItem
 *
 * @description
 * get the array form of the item passed, if not already an array
 *
 * @param {*} item item to return in array form
 * @returns {Array<*>} array form of item
 */
var getArrayOfItem = exports.getArrayOfItem = function getArrayOfItem(item) {
  return isArray(item) ? item : [item];
};

/**
 * @private
 *
 * @function getPathArray
 *
 * @description
 * get the array form of the full path passed
 *
 * @param {Array<number|string>|string} path path to get array form of
 * @returns {Array<number|string>} array form of path
 */
var getPathArray = exports.getPathArray = function getPathArray(path) {
  return isArray(path) ? path : (0, _pathington.parse)(path);
};

/**
 * @private
 *
 * @function getConfig
 *
 * @description
 * curried function to get the config object based on if it is a Config or not
 *
 * @param {function} Config base config class
 * @param {Config|Object} config the object to test
 * @returns {Object} the config object
 */
var getConfig = exports.getConfig = function getConfig(Config, config) {
  return config instanceof Config ? config.get() : config;
};

/**
 * @private
 *
 * @function getDefaultSeries
 *
 * @description
 * get the series in the config or an empty array
 *
 * @param {Object} config config to retrieve series from
 * @returns {Array<Object>} series for the given config
 */
var getDefaultSeries = exports.getDefaultSeries = function getDefaultSeries(config) {
  return (0, _unchanged.getOr)([], ['series'], config);
};

/**
 * @private
 *
 * @function getKeyWithProperty
 *
 * @description
 * get the key namespaced
 *
 * @param {string} key key to namespace
 * @param {string} namespace namespace of key
 * @returns {string} complete key
 */
var getNamespacedKey = exports.getNamespacedKey = function getNamespacedKey(key, namespace) {
  return namespace + '.' + key;
};

/**
 * @private
 *
 * @function canCombineChartTypes
 *
 * @description
 * does the chart types in series allow for combination with other chart types
 *
 * @param {Array<Object>} series series data sets
 * @returns {boolean} does the series allow for combination of all the charts added
 */
var canCombineChartTypes = exports.canCombineChartTypes = function canCombineChartTypes(series) {
  return series.every(function (_ref) {
    var type = _ref.type;
    return !~_constants.CHARTS_UNABLE_TO_BE_MIXED.indexOf(type);
  });
};

/**
 * @private
 *
 * @function createPropertyConvenienceMethod
 *
 * @description
 * create a convenience property for the class
 *
 * @param {string} property property name
 * @returns {Function} method to assign to class at property
 */
var createPropertyConvenienceMethod = exports.createPropertyConvenienceMethod = function createPropertyConvenienceMethod(property) {
  return function (subKey, value) {
    var length = arguments.length;

    if (!length) {
      return this.get(property);
    }

    if (isPlainObject(subKey)) {
      var cleanArgs = keys(subKey).reduce(function (updatedObject, keyWithoutProperty) {
        updatedObject[getNamespacedKey(keyWithoutProperty, property)] = subKey[keyWithoutProperty];

        return updatedObject;
      }, {});

      return this.set(cleanArgs);
    }

    if (isArray(subKey)) {
      return this.set(property, subKey);
    }

    var key = getNamespacedKey(subKey, property);

    return length === 1 ? this.get(key) : this.set(key, value);
  };
};

/**
 * @private
 *
 * @function isMixedChartType
 *
 * @description
 * is the series a mixture of chart types or a single type
 *
 * @param {Array<Object>} series series data sets
 * @returns {boolean} are multiple chart types present
 */
var isMixedChartType = exports.isMixedChartType = function isMixedChartType(series) {
  if (!series.length) {
    return false;
  }

  var originalType = series[0].type;

  return series.slice(1).some(function (_ref2) {
    var type = _ref2.type;
    return type !== originalType;
  });
};

var getFirstIfOnly = exports.getFirstIfOnly = function getFirstIfOnly(items) {
  return items.length === 1 ? items[0] : items;
};

/**
 * @private
 *
 * @function getMatchingChartIndices
 *
 * @description
 * get the indices of the series where the type is the same as the chart passed
 *
 * @param {Array<Object>} series the series to get the indices from
 * @param {string} chart the chart to match indices of
 * @returns {Array<T>}
 */
var getMatchingChartIndices = exports.getMatchingChartIndices = function getMatchingChartIndices(series, chart) {
  return series.reduce(function (indices, _ref3, seriesIndex) {
    var type = _ref3.type;

    if (type === chart) {
      indices.push(seriesIndex);
    }

    return indices;
  }, []);
};

/**
 * @private
 *
 * @function getNewChartSeries
 *
 * @description
 * return the new series sets augmented with the chart type
 *
 * @param {Array<Object>} series series data sets
 * @param {string} type the type of chart
 * @returns {Array<Object>} series augmented with chart type
 */
var getNewChartSeries = exports.getNewChartSeries = function getNewChartSeries(series, type) {
  return series.map(function (seriesInstance) {
    return seriesInstance.type ? seriesInstance : assign({}, seriesInstance, { type: type });
  });
};

/**
 * @private
 *
 * @function getNewConfigFromObject
 *
 * @description
 * get a new configuration object based on iteratively setting new values at each key
 *
 * @param {Object} currentConfig configuration of the given instance
 * @param {Object} object key => value pairs to assign to the config
 * @returns {Object} new configuration object
 */
var getNewConfigFromObject = exports.getNewConfigFromObject = function getNewConfigFromObject(currentConfig, object) {
  return keys(object).reduce(function (config, key) {
    return (0, _unchanged.set)(key, object[key], config);
  }, currentConfig);
};

/**
 * @private
 *
 * @function getNewConfigWithSeries
 *
 * @description
 * get a new configuration with an series concatenated with existing series
 *
 * @param {Object} config current configuration of the given instance
 * @param {Array<Object>} series series data sets
 * @returns {Object} new configuration object
 */
var getNewConfigWithSeries = exports.getNewConfigWithSeries = function getNewConfigWithSeries(config, series) {
  var updatedSeries = getDefaultSeries(config).concat(series);

  if (isMixedChartType(updatedSeries) && !canCombineChartTypes(updatedSeries)) {
    throw new TypeError('Cannot combine these chart types.');
  }

  return (0, _unchanged.set)(['series'], updatedSeries, config);
};

/**
 * @private
 *
 * @function getSpecificSeries
 *
 * @description
 * get series that match the provided types
 *
 * @param {Array<Object>} series series to find matches for
 * @param {Array<string> }types types of series to filter by
 * @returns {Array<Object>|Object} matching series
 */
var getSpecificSeries = exports.getSpecificSeries = function getSpecificSeries(series, types) {
  var chart = void 0,
      indexOfChart = void 0,
      matches = void 0,
      match = void 0;

  var specificSeries = types.reduce(function (matchingSeries, type) {
    var _getPathArray = getPathArray(type);

    chart = _getPathArray[0];
    indexOfChart = _getPathArray[1];


    matches = series.filter(function (_ref4) {
      var seriesType = _ref4.type;
      return seriesType === chart;
    });

    if (isUndefined(indexOfChart)) {
      return matchingSeries.concat(matches);
    }

    match = matches[+indexOfChart];

    if (!isUndefined(match)) {
      matchingSeries.push(match);
    }

    return matchingSeries;
  }, []);

  return getFirstIfOnly(specificSeries);
};

/**
 * @private
 *
 * @function removeOrOmit
 *
 * @description
 * remove deeply-nested item from object based on whether it is an array or object
 *
 * @param {Array<string>} paths list of paths to remove
 * @param {Object} object object to remove values at paths from
 * @returns {Object} object with values at paths removed
 */
var removeOrOmit = exports.removeOrOmit = function removeOrOmit(paths, object) {
  return paths.reduce(function (updatedObject, path) {
    return (0, _unchanged.remove)(path, updatedObject);
  }, object);
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tquetano/git/highcharts-config/src/index.js */"./src/index.js");


/***/ }),

/***/ "unchanged":
/*!****************************!*\
  !*** external "unchanged" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_unchanged__;

/***/ })

/******/ });
});
//# sourceMappingURL=highcharts-config.js.map