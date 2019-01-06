(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("buildConfig", [], factory);
	else if(typeof exports === 'object')
		exports["buildConfig"] = factory();
	else
		root["buildConfig"] = factory();
})(window, function() {
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

/***/ "./node_modules/curriable/dist/curriable.js":
/*!**************************************************!*\
  !*** ./node_modules/curriable/dist/curriable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, function (exports) { 'use strict';

  /**
   * @constant __ placeholder used when parameters are skipped
   */
  var __ = typeof Symbol === 'function' ? Symbol('curriable placeholder') : 0xedd1;
  /**
   * @function recursiveCurry
   *
   * @description
   * recursively curry over the arguments until all have been resolved
   *
   * @param fn the function to curry
   * @param arity the length of the function to curry until
   * @param args the existing arguments
   * @returns the result of the function call
   */
  var recursiveCurry = function (fn, arity, args) {
      return function () {
          var length = args.length;
          var newArgs = arguments;
          var newArgsLength = newArgs.length;
          var combined = [];
          var newArgsIndex = 0;
          var remaining = arity;
          var value;
          if (length) {
              for (var index = 0; index < length; index++) {
                  value = combined[index] =
                      args[index] === __ && newArgsIndex < newArgsLength
                          ? newArgs[newArgsIndex++]
                          : args[index];
                  if (value !== __) {
                      --remaining;
                  }
              }
          }
          if (newArgsIndex < newArgsLength) {
              for (; newArgsIndex < newArgsLength; newArgsIndex++) {
                  value = newArgs[newArgsIndex];
                  combined.push(value);
                  if (value !== __ && newArgsIndex < arity) {
                      --remaining;
                  }
              }
          }
          return remaining > 0
              ? recursiveCurry(fn, arity, combined)
              : fn.apply(this, combined);
      };
  };

  // utils
  /**
   * @function curry
   *
   * @description
   * get the method passed as a curriable method based on its parameters
   *
   * @param fn the method to make curriable
   * @param arity the arity of the curried method
   * @returns the fn passed as a curried function
   */
  var curry = function (fn, arity) {
      if (arity === void 0) { arity = fn.length; }
      var curried = recursiveCurry(fn, arity, []);
      curried.arity = arity;
      curried.fn = fn;
      return curried;
  };
  curry.__ = __;
  /**
   * @function uncurry
   *
   * @description
   * return a function that is the non-curried version of the fn passed
   *
   * @param curried the curried function to uncurry
   * @returns the original fn
   */
  var uncurry = function (curried) { return curried.fn; };
  curry.uncurry = uncurry;

  exports.__ = __;
  exports.curry = curry;
  exports.uncurry = uncurry;
  exports.default = curry;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=curriable.js.map


/***/ }),

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

/***/ "./node_modules/unchanged/es/index.js":
/*!********************************************!*\
  !*** ./node_modules/unchanged/es/index.js ***!
  \********************************************/
/*! exports provided: __, assign, call, get, getOr, has, merge, remove, set, transform, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return call; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOr", function() { return getOr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony import */ var curriable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curriable */ "./node_modules/curriable/dist/curriable.js");
/* harmony import */ var curriable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curriable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__", function() { return curriable__WEBPACK_IMPORTED_MODULE_0__["__"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/unchanged/es/utils.js");
// external dependencies
 // utils



/**
 * @function assign
 *
 * @description
 * get the shallowly-merged object at path
 *
 * @param {Array<number|string>|null|number|string} path the path to match on the object
 * @param {Array<*>|Object} objectToAssign the object to merge
 * @param {Array<*>|Object} object the object to merge with
 * @returns {Array<*>|Object} the new merged object
 */

var assign = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, objectToAssign, object) {
  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isCloneable"])(object)) {
    return objectToAssign;
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getMergedObject"])(object, objectToAssign, false) : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getDeepClone"])(path, object, function (ref, key) {
    ref[key] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getMergedObject"])(ref[key], objectToAssign, false);
  });
});
/**
 * @function call
 *
 * @description
 * call a nested method at the path requested with the parameters provided
 *
 * @param {Array<number|string>|null|number|string} path the path to get the value at
 * @param {Array<*>} parameters the parameters to call the method with
 * @param {Array<*>|Object} object the object to call the method from
 * @param {*} context the context to set as "this" in the function call
 */

var call = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, parameters, object, context) {
  if (context === void 0) {
    context = object;
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["callIfFunction"])(object, context, parameters) : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["callNestedProperty"])(path, context, parameters, object);
}, // eslint-disable-next-line no-magic-numbers
3);
/**
 * @function get
 *
 * @description
 * get the value to the object at the path requested
 *
 * @param {Array<number|string>|null|number|string} path the path to get the value at
 * @param {Array<*>|Object} object the object to get the value from
 * @returns {*} the value requested
 */

var get = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, object) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? object : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getNestedProperty"])(path, object);
});
/**
 * @function getOr
 *
 * @description
 * get the value to the object at the path requested, or noMatchValue if nothing
 * is there.
 *
 * @param {*} noMatchValue the fallback value if nothing is found at the given path
 * @param {Array<number|string>|null|number|string} path the path to get the value at
 * @param {Array<*>|Object} object the object to get the value from
 * @returns {*} the value requested
 */

var getOr = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (noMatchValue, path, object) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? object : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getNestedProperty"])(path, object, noMatchValue);
});
/**
 * @function has
 *
 * @description
 * does the nested path exist on the object
 *
 * @param {Array<number|string>|null|number|string} path the path to match on the object
 * @param {Array<*>|Object} object the object to get the value from
 * @returns {boolean} does the path exist
 */

/* eslint-disable eqeqeq */

var has = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, object) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? object != null : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hasNestedProperty"])(path, object);
});
/* eslint-enable */

/**
 * @function merge
 *
 * @description
 * get the deeply-merged object at path
 *
 * @param {Array<number|string>|null|number|string} path the path to match on the object
 * @param {Array<*>|Object} objectToMerge the object to merge
 * @param {Array<*>|Object} object the object to merge with
 * @returns {Array<*>|Object} the new merged object
 */

var merge = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, objectToMerge, object) {
  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isCloneable"])(object)) {
    return objectToMerge;
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getMergedObject"])(object, objectToMerge, true) : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getDeepClone"])(path, object, function (ref, key) {
    ref[key] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getMergedObject"])(ref[key], objectToMerge, true);
  });
});
/**
 * @function removeobject with quoted keys
 *
 * @description
 * remove the value in the object at the path requested
 *
 * @param {Array<number|string>|number|string} path the path to remove the value at
 * @param {Array<*>|Object} object the object to remove the value from
 * @returns {Array<*>|Object} a new object with the same structure and the value removed
 */

var remove = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, object) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path)) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getNewEmptyObject"])(object);
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["hasNestedProperty"])(path, object) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getDeepClone"])(path, object, function (ref, key) {
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isArray"])(ref)) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["splice"])(ref, key);
    } else {
      delete ref[key];
    }
  }) : object;
});
/**
 * @function set
 *
 * @description
 * set the value in the object at the path requested
 *
 * @param {Array<number|string>|number|string} path the path to set the value at
 * @param {*} value the value to set
 * @param {Array<*>|Object} object the object to set the value in
 * @returns {Array<*>|Object} a new object with the same structure and the value assigned
 */

var set = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, value, object) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? value : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getDeepClone"])(path, object, function (ref, key) {
    ref[key] = value;
  });
});
/**
 * @function transform
 *
 * @description
 * perform same operation as set, but using a callback function that receives
 * the value (and additional parameters, if provided) to get the value to set
 *
 * @param {Array<number|string>|number|string} path the path to set the value at
 * @param {function} fn the function to transform the retrieved value with
 * @param {Array<*>|Object} object the object to set the value in
 * @param {...Array<any>} extraArgs additional arguments to pass to the transform function
 * @returns {Array<*>|Object} a new object with the same structure and the value assigned
 */

var transform = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, fn, object) {
  for (var _len = arguments.length, extraArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    extraArgs[_key - 3] = arguments[_key];
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path) ? fn.apply(void 0, [object].concat(extraArgs)) : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getDeepClone"])(path, object, function (ref, key) {
    return ref[key] = fn.apply(void 0, [ref[key]].concat(extraArgs));
  });
}, // eslint-disable-next-line no-magic-numbers
3);
/**
 * @function add
 *
 * @description
 * add the value to the object at the path requested
 *
 * @param {Array<number|string>|null|number|string} path the path to assign the value at
 * @param {*} value the value to assign
 * @param {Array<*>|Object} object the object to assignobject the value in
 * @returns {Array<*>|Object} a new object with the same structure and the value added
 */

var add = Object(curriable__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (path, value, object) {
  var isPathEmpty = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isEmptyPath"])(path);
  var valueAtPath = isPathEmpty ? object : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getNestedProperty"])(path, object);
  var fullPath = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isArray"])(valueAtPath) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isArray"])(path) ? path.concat([valueAtPath.length]) : (isPathEmpty ? '' : path) + "[" + valueAtPath.length + "]" : path;
  return set(fullPath, value, object);
});

/***/ }),

/***/ "./node_modules/unchanged/es/utils.js":
/*!********************************************!*\
  !*** ./node_modules/unchanged/es/utils.js ***!
  \********************************************/
/*! exports provided: isArray, cloneArray, reduce, getOwnProperties, assignFallback, isCloneable, isGlobalConstructor, callIfFunction, getShallowClone, getNewEmptyChild, getNewEmptyObject, cloneIfPossible, getNewChildClone, getCoalescedValue, onMatchAtPath, getMergedObject, getParsedPath, callNestedProperty, getNestedProperty, getDeepClone, hasNestedProperty, isEmptyPath, splice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneArray", function() { return cloneArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnProperties", function() { return getOwnProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignFallback", function() { return assignFallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCloneable", function() { return isCloneable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGlobalConstructor", function() { return isGlobalConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callIfFunction", function() { return callIfFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShallowClone", function() { return getShallowClone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewEmptyChild", function() { return getNewEmptyChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewEmptyObject", function() { return getNewEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneIfPossible", function() { return cloneIfPossible; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewChildClone", function() { return getNewChildClone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoalescedValue", function() { return getCoalescedValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMatchAtPath", function() { return onMatchAtPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMergedObject", function() { return getMergedObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParsedPath", function() { return getParsedPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callNestedProperty", function() { return callNestedProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNestedProperty", function() { return getNestedProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeepClone", function() { return getDeepClone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasNestedProperty", function() { return hasNestedProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyPath", function() { return isEmptyPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splice", function() { return splice; });
/* harmony import */ var pathington__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pathington */ "./node_modules/pathington/es/index.js");
// external dependencies

var O = Object;
var create = O.create,
    getOwnPropertySymbols = O.getOwnPropertySymbols,
    getPrototypeOf = O.getPrototypeOf,
    keys = O.keys,
    propertyIsEnumerable = O.propertyIsEnumerable;
var toStringObject = O.prototype.toString;
var toStringFunction = Function.prototype.toString;
/**
 * @constant {Symbol} REACT_ELEMENT
 */
// eslint-disable-next-line no-magic-numbers

var REACT_ELEMENT = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('react.element') : 0xeac7;
/**
 * @constant {RegExp} FUNCTION_NAME
 */

var FUNCTION_NAME = /^\s*function\s*([^\(]*)/i;
/**
 * @function isArray
 */

var isArray = Array.isArray;
/**
 * @function cloneArray
 *
 * @description
 * shallowly clone an array
 *
 * @param {Array<any>} array the array to clone
 * @returns {Array<any>} the cloned array
 */


var cloneArray = function cloneArray(array) {
  var cloned = new array.constructor();

  for (var index = 0; index < array.length; index++) {
    cloned[index] = array[index];
  }

  return cloned;
};
/**
 * @function reduce
 *
 * @description
 * a slimmer, simpler reduce than native (for performance)
 *
 * @param {Array<any>} array the array to reduce
 * @param {function} fn the function to reduce each iteration of the array with
 * @param {any} initialValue the initial value of the reduction
 * @returns {any} the reduced array value
 */

var reduce = function reduce(array, fn, initialValue) {
  var value = initialValue;

  for (var index = 0; index < array.length; index++) {
    value = fn(value, array[index]);
  }

  return value;
};
/**
 * @function getOwnProperties
 *
 * @description
 * get the own properties of an object, either keys or symbols
 *
 * @param {Object} object the object to get all keys and symbols of
 * @returns {Array<string|symbol>} the own properties of the object
 */

var getOwnProperties = function getOwnProperties(object) {
  var ownSymbols = getOwnPropertySymbols(object);

  if (!ownSymbols.length) {
    return keys(object);
  }

  return keys(object).concat(reduce(ownSymbols, function (enumerableSymbols, symbol) {
    if (propertyIsEnumerable.call(object, symbol)) {
      enumerableSymbols.push(symbol);
    }

    return enumerableSymbols;
  }, []));
};
/**
 * @function assignFallback
 *
 * @description
 * a simple implementation of Object.assign
 *
 * @param {Object} target the target object
 * @param {Object} source the object to merge into target
 * @returns {Object} the shallowly-merged object
 */

var assignFallback = function assignFallback(target, source) {
  if (!source) {
    return target;
  }

  return reduce(getOwnProperties(source), function (clonedObject, property) {
    clonedObject[property] = source[property];
    return clonedObject;
  }, Object(target));
};
var assign = typeof O.assign === 'function' ? O.assign : assignFallback;
/**
 * @function isCloneable
 *
 * @description
 * can the object be cloned
 * 
 * - the object exists and is an object
 * - the object is not a Date or RegExp
 * - the object is not a React element
 *
 * @param {*} object the object to test
 * @returns {boolean} can the object be merged
 */

var isCloneable = function isCloneable(object) {
  if (!object || typeof object !== 'object') {
    return false;
  }

  var type = toStringObject.call(object);
  return type !== '[object Date]' && type !== '[object RegExp]' && object.$$typeof !== REACT_ELEMENT;
};
/**
 * @function isGlobalConstructor
 *
 * @description
 * is the function passed a global constructor function
 *
 * @param {function} fn the function to test
 * @returns {boolean} is the function a global constructor
 */

var isGlobalConstructor = function isGlobalConstructor(fn) {
  return typeof fn === 'function' && global[fn.name || toStringFunction.call(fn).split(FUNCTION_NAME)[1]] === fn;
};
/**
 * @function callIfFunction
 *
 * @description
 * call the object passed if it is a function and return its return, else return undefined
 *
 * @param {*} object the object to conditionally call if a function
 * @param {*} context the context to apply to the call
 * @param {Array<*>} parameters the parametesr to apply the function with
 * @returns {*} the restulf of the call or undefined
 */

var callIfFunction = function callIfFunction(object, context, parameters) {
  return typeof object === 'function' ? object.apply(context, parameters) : void 0;
};
/**
 * @function getShallowClone
 *
 * @description
 * get a shallow clone of the value passed based on the type requested (maintaining prototype if possible)
 *
 * @param {Array<*>|Object} object the object to clone
 * @param {number|string} key the key to base the object type fromisReactElement(object) ||
 * @returns {Array<*>|Object} a shallow clone of the value
 */

var getShallowClone = function getShallowClone(object) {
  if (object.constructor === O) {
    return assign({}, object);
  }

  if (isArray(object)) {
    return cloneArray(object);
  }

  return isGlobalConstructor(object.constructor) ? {} : assign(create(getPrototypeOf(object)), object);
};
/**
 * @function getNewEmptyChild
 *
 * @description
 * get a new empty child for the type of key provided
 *
 * @param {number|string} key the key to test
 * @returns {Array|Object} the empty child
 */

var getNewEmptyChild = function getNewEmptyChild(key) {
  return typeof key === 'number' ? [] : {};
};
/**
 * @function getNewEmptyObject
 *
 * @description
 * get a new empty object for the type of key provided
 *
 * @param {Array|Object} object the object to get an empty value of
 * @returns {Array|Object} the empty object
 */

var getNewEmptyObject = function getNewEmptyObject(object) {
  return isArray(object) ? [] : {};
};
/**
 * @function cloneIfPossible
 *
 * @description
 * clone the object passed if it is mergeable, else return itself
 *
 * @param {*} object he object to clone
 * @returns {*} the cloned object
 */

var cloneIfPossible = function cloneIfPossible(object) {
  return isCloneable(object) ? getShallowClone(object) : object;
};
/**
 * @function getNewChildClone
 *
 * @description
 * get the shallow clone of the child when it is the correct type
 *
 * @param {Array<*>|Object} object the object to clone
 * @param {number|string} nextKey the key that the next object will be based from
 * @returns {Array<*>|Object} the clone of the key at object
 */

var getNewChildClone = function getNewChildClone(object, nextKey) {
  return isCloneable(object) ? getShallowClone(object) : getNewEmptyChild(nextKey);
};
/**
 * @function getCoalescedValue
 *
 * @description
 * get the value if it is not undefined, else get the fallback
 *`
 * @param {any} value the main value to return
 * @param {any} fallbackValue the value to return if main is undefined
 * @returns {any} the coalesced value
 */

var getCoalescedValue = function getCoalescedValue(value, fallbackValue) {
  return value === void 0 ? fallbackValue : value;
};
/**
 * @function onMatchAtPath
 *
 * @description
 * when there is a match for the path requested, call onMatch, else return the noMatchValue
 *
 * @param {Array<number|string>} path the path to find a match at
 * @param {Array<*>|Object} object the object to find the path in
 * @param {function} onMatch when a match is found, call this method
 * @param {boolean} shouldClone should the object be cloned
 * @param {*} noMatchValue when no match is found, return this value
 * @param {number} [index=0] the index of the key to process
 * @returns {*} either the return from onMatch or the noMatchValue
 */

var onMatchAtPath = function onMatchAtPath(path, object, onMatch, shouldClone, noMatchValue, index) {
  if (index === void 0) {
    index = 0;
  }

  var key = path[index];
  var nextIndex = index + 1;

  if (nextIndex === path.length) {
    var result = object || shouldClone ? onMatch(object, key) : noMatchValue;
    return shouldClone ? object : result;
  }

  if (shouldClone) {
    object[key] = onMatchAtPath(path, getNewChildClone(object[key], path[nextIndex]), onMatch, shouldClone, noMatchValue, nextIndex);
    return object;
  }

  return object && object[key] ? onMatchAtPath(path, object[key], onMatch, shouldClone, noMatchValue, nextIndex) : noMatchValue;
};
/**
 * @function getMergedObject
 *
 * @description
 * get the objects merged into a new object
 *
 * @param {Array<*>|Object} object1 the object to merge into
 * @param {Array<*>|Object} object2 the object to merge
 * @param {boolean} isDeep is the object deeply merged
 * @returns {Array<*>|Object} the merged object
 */

var getMergedObject = function getMergedObject(object1, object2, isDeep) {
  var isObject1Array = isArray(object1);

  if (isObject1Array !== isArray(object2) || !isCloneable(object1)) {
    return cloneIfPossible(object2);
  }

  if (isObject1Array) {
    return object1.concat(object2);
  }

  var target = object1.constructor === O || isGlobalConstructor(object1.constructor) ? {} : create(getPrototypeOf(object1));
  return reduce(getOwnProperties(object2), function (clone, key) {
    clone[key] = isDeep && isCloneable(object2[key]) ? getMergedObject(object1[key], object2[key], isDeep) : object2[key];
    return clone;
  }, assign(target, object1));
};
/**
 * @function getParsedPath
 *
 * @description
 * get the path array, either as-is if already an array, or parsed by pathington
 *
 * @param {Array<number|string>|number|string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */

var getParsedPath = function getParsedPath(path) {
  return isArray(path) ? path : Object(pathington__WEBPACK_IMPORTED_MODULE_0__["parse"])(path);
};
/**
 * @function callNestedProperty
 *
 * @description
 * parse the path passed and call the nested method at that path
 *
 * @param {Array<number|string>|number|string} path the path to retrieve values from the object
 * @param {*} context the context that the method is called with
 * @param {Array<*>} parameters the parameters to call the method with
 * @param {*} object the object to get values from
 * @returns {*} the retrieved values
 */

var callNestedProperty = function callNestedProperty(path, context, parameters, object) {
  var parsedPath = getParsedPath(path);

  if (parsedPath.length === 1) {
    return object ? callIfFunction(object[parsedPath[0]], context, parameters) : void 0;
  }

  return onMatchAtPath(parsedPath, object, function (ref, key) {
    return callIfFunction(ref[key], context, parameters);
  });
};
/**
 * @function getNestedProperty
 *
 * @description
 * parse the path passed and get the nested property at that path
 *
 * @param {Array<number|string>|number|string} path the path to retrieve values from the object
 * @param {*} object the object to get values from
 * @param {*} noMatchValue an optional fallback value to be returned when the nested property isn't found
 * @returns {*} the retrieved values
 */

var getNestedProperty = function getNestedProperty(path, object, noMatchValue) {
  var parsedPath = getParsedPath(path);

  if (parsedPath.length === 1) {
    return object ? getCoalescedValue(object[parsedPath[0]], noMatchValue) : noMatchValue;
  }

  return onMatchAtPath(parsedPath, object, function (ref, key) {
    return getCoalescedValue(ref[key], noMatchValue);
  }, false, noMatchValue);
};
/**
 * @function getDeepClone
 *
 * @description
 * parse the path passed and clone the object at that path
 *
 * @param {Array<number|string>|number|string} path the path to deeply modify the object on
 * @param {Array<*>|Object} object the objeisCurrentKeyArrayct to modify
 * @param {function} onMatch the callback to execute
 * @returns {Array<*>|Object} the clone object
 */

var getDeepClone = function getDeepClone(path, object, onMatch) {
  var parsedPath = getParsedPath(path);
  var topLevelClone = isCloneable(object) ? getShallowClone(object) : getNewEmptyChild(parsedPath[0]);

  if (parsedPath.length === 1) {
    onMatch(topLevelClone, parsedPath[0]);
    return topLevelClone;
  }

  return onMatchAtPath(parsedPath, topLevelClone, onMatch, true);
};
/**
 * @function hasNestedProperty
 *
 * @description
 * parse the path passed and determine if a value at the path exists
 *
 * @param {Array<number|string>|number|string} path the path to retrieve values from the object
 * @param {*} object the object to get values from
 * @returns {boolean} does the nested path exist
 */

var hasNestedProperty = function hasNestedProperty(path, object) {
  return getNestedProperty(path, object) !== void 0;
};
/* eslint-disable eqeqeq */

/**
 * @function isEmptyPath
 *
 * @description
 * is the object passed an empty key value
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object an empty key value
 */

var isEmptyPath = function isEmptyPath(object) {
  return object == null || isArray(object) && !object.length;
};
/* eslint-enable */

/**
 * @function splice
 *
 * @description
 * splice a single item from the array
 *
 * @param {Array<*>} array array to splice from
 * @param {number} splicedIndex index to splice at
 */

var splice = function splice(array, splicedIndex) {
  if (array.length) {
    var length = array.length;
    var index = splicedIndex;

    while (index < length - 1) {
      array[index] = array[index + 1];
      ++index;
    }

    --array.length;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/classes/ChartConfig.js":
/*!************************************!*\
  !*** ./src/classes/ChartConfig.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Config */ "./src/classes/Config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// classes


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
    if (!isArray(seriesPassed) && !Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(seriesPassed)) {
      throw new TypeError('Series passed must be either a plain object or an array of plain objects.');
    }

    var series = isArray(seriesPassed) ? seriesPassed : [seriesPassed];
    var config = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getNewConfigWithSeries"])(this.config, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getNewChartSeries"])(series, type));

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

    return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(types) ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getFirstIfOnly"])(series) : Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getSpecificSeries"])(series, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getArrayOfItem"])(types));
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
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(chartPath)) {
      return this.remove('series');
    }

    var _config$series = this.config.series,
        currentSeries = _config$series === undefined ? [] : _config$series;


    if (!currentSeries.length) {
      return this;
    }

    var _getPathArray = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getPathArray"])(chartPath),
        chart = _getPathArray[0],
        indexString = _getPathArray[1];

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(indexString)) {
      var series = currentSeries.filter(function (_ref) {
        var type = _ref.type;
        return type !== chart;
      });

      return this.set('series', series);
    }

    var chartIndices = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getMatchingChartIndices"])(currentSeries, chart);
    var indexNumber = +indexString;
    var indexToRemove = chartIndices[Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isNAN"])(indexNumber) ? 0 : indexNumber];

    return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(indexToRemove) ? this : this.remove('series[' + indexToRemove + ']');
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

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(chartPath) || !length) {
      return this;
    }

    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(seriesInstance)) {
      throw new TypeError('Series passed must be a plain object.');
    }

    var _getPathArray2 = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getPathArray"])(chartPath),
        chart = _getPathArray2[0],
        indexString = _getPathArray2[1];

    var chartIndices = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getMatchingChartIndices"])(currentSeries, chart);
    var indexNumber = +indexString;
    var indexToUpdate = chartIndices[Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isNAN"])(indexNumber) ? 0 : indexNumber];

    var key = 'series[' + indexToUpdate + ']';
    var existingSeries = this.get(key);

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(existingSeries)) {
      return this;
    }

    var mergedSeries = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, existingSeries, seriesInstance);
    var series = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getNewChartSeries"])([mergedSeries], chart);

    return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(indexToUpdate) ? this : this.set(key, series[0]);
  };

  return ChartConfig;
}(_Config__WEBPACK_IMPORTED_MODULE_0__["default"]);

_constants__WEBPACK_IMPORTED_MODULE_1__["CHART_CONVENIENCE_METHOD_NAMES"].forEach(ChartConfig.addMethod(ChartConfig));

/* harmony default export */ __webpack_exports__["default"] = (ChartConfig);

/***/ }),

/***/ "./src/classes/Config.js":
/*!*******************************!*\
  !*** ./src/classes/Config.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var unchanged__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unchanged */ "./node_modules/unchanged/es/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// external dependencies


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

    this.config = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(Config, config);
    this.options = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, options);

    var validate = this.options.validate;


    if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(validate)) {
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
      var methodToAssign = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(method) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createAddMethodWrapper"])(Constructor, method) : Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createPropertyConvenienceMethod"])(methodName);

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
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(path) ? this.config : Object(unchanged__WEBPACK_IMPORTED_MODULE_0__["get"])(path, this.config);
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
      return Object(unchanged__WEBPACK_IMPORTED_MODULE_0__["merge"])(null, newConfig, Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(Config, config));
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
    var keys = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getArrayOfItem"])(paths);
    var config = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["removeOrOmit"])(keys, this.config);

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
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(path)) {
      return this;
    }

    var config = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(path) ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getNewConfigFromObject"])(this.config, path) : Object(unchanged__WEBPACK_IMPORTED_MODULE_0__["set"])(path, value, this.config);

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

/* harmony default export */ __webpack_exports__["default"] = (Config);

/***/ }),

/***/ "./src/classes/OptionsConfig.js":
/*!**************************************!*\
  !*** ./src/classes/OptionsConfig.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Config */ "./src/classes/Config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// classes


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
}(_Config__WEBPACK_IMPORTED_MODULE_0__["default"]);

_constants__WEBPACK_IMPORTED_MODULE_1__["OPTIONS_CONVENIENCE_METHOD_NAMES"].forEach(OptionsConfig.addMethod(OptionsConfig));

/* harmony default export */ __webpack_exports__["default"] = (OptionsConfig);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: CHART_CONVENIENCE_METHOD_NAMES, OPTIONS_CONVENIENCE_METHOD_NAMES, CHARTS_UNABLE_TO_BE_MIXED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHART_CONVENIENCE_METHOD_NAMES", function() { return CHART_CONVENIENCE_METHOD_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPTIONS_CONVENIENCE_METHOD_NAMES", function() { return OPTIONS_CONVENIENCE_METHOD_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHARTS_UNABLE_TO_BE_MIXED", function() { return CHARTS_UNABLE_TO_BE_MIXED; });
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
var CHART_CONVENIENCE_METHOD_NAMES = ['accessibility', 'chart', 'colorAxis', 'colors', 'credits', 'data', 'defs', 'drilldown', 'exporting', 'labels', 'legend', 'loading', 'mapNavigation', 'navigation', 'noData', 'pane', 'plotOptions', 'responsive', 'series', 'subtitle', 'title', 'tooltip', 'xAxis', 'yAxis', 'zAxis'];

/**
 * @private
 *
 * @constant
 * @type {Array<string>}
 * @default
 */
var OPTIONS_CONVENIENCE_METHOD_NAMES = ['global', 'lang'];

/**
 * @private
 *
 * @constant
 * @type {Array<string>}
 * @default
 */
var CHARTS_UNABLE_TO_BE_MIXED = ['funnel', 'gauge', 'heatmap', 'pyramid', 'solidgauge', 'treemap'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_ChartConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/ChartConfig */ "./src/classes/ChartConfig.js");
/* harmony import */ var _classes_OptionsConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/OptionsConfig */ "./src/classes/OptionsConfig.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
// classes



// utils


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
var buildConfig = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createBuildConfig"])(_classes_ChartConfig__WEBPACK_IMPORTED_MODULE_0__["default"]);

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
buildConfig.addChartMethod = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createAddMethod"])(_classes_ChartConfig__WEBPACK_IMPORTED_MODULE_0__["default"], buildConfig);

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
buildConfig.addOptionsMethod = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createAddMethod"])(_classes_OptionsConfig__WEBPACK_IMPORTED_MODULE_1__["default"], buildConfig);

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
buildConfig.chart = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createBuildConfig"])(_classes_ChartConfig__WEBPACK_IMPORTED_MODULE_0__["default"]);

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
buildConfig.options = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["createBuildConfig"])(_classes_OptionsConfig__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (buildConfig);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isFunction, isNAN, isPlainObject, isUndefined, assignFallback, assign, createAddMethod, createAddMethodWrapper, createBuildConfig, getArrayOfItem, getPathArray, getConfig, getDefaultSeries, getNamespacedKey, canCombineChartTypes, createPropertyConvenienceMethod, isMixedChartType, getFirstIfOnly, getMatchingChartIndices, getNewChartSeries, getNewConfigFromObject, getNewConfigWithSeries, getSpecificSeries, removeOrOmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNAN", function() { return isNAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignFallback", function() { return assignFallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAddMethod", function() { return createAddMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAddMethodWrapper", function() { return createAddMethodWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBuildConfig", function() { return createBuildConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArrayOfItem", function() { return getArrayOfItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPathArray", function() { return getPathArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultSeries", function() { return getDefaultSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNamespacedKey", function() { return getNamespacedKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canCombineChartTypes", function() { return canCombineChartTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPropertyConvenienceMethod", function() { return createPropertyConvenienceMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMixedChartType", function() { return isMixedChartType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstIfOnly", function() { return getFirstIfOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchingChartIndices", function() { return getMatchingChartIndices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewChartSeries", function() { return getNewChartSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewConfigFromObject", function() { return getNewConfigFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewConfigWithSeries", function() { return getNewConfigWithSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpecificSeries", function() { return getSpecificSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeOrOmit", function() { return removeOrOmit; });
/* harmony import */ var pathington__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pathington */ "./node_modules/pathington/es/index.js");
/* harmony import */ var unchanged__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unchanged */ "./node_modules/unchanged/es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
// external dependencies



// constants


var isArray = Array.isArray;
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

var isFunction = function isFunction(object) {
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
var isNAN = function isNAN(object) {
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
var isPlainObject = function isPlainObject(object) {
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
var isUndefined = function isUndefined(object) {
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
var assignFallback = function assignFallback(target) {
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

var assign = typeof Object.assign === 'function' ? Object.assign : assignFallback;

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
var createAddMethod = function createAddMethod(Constructor, buildConfig) {
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
var createAddMethodWrapper = function createAddMethodWrapper(Constructor, method) {
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
var createBuildConfig = function createBuildConfig(Constructor) {
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
var getArrayOfItem = function getArrayOfItem(item) {
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
var getPathArray = function getPathArray(path) {
  return isArray(path) ? path : Object(pathington__WEBPACK_IMPORTED_MODULE_0__["parse"])(path);
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
var getConfig = function getConfig(Config, config) {
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
var getDefaultSeries = function getDefaultSeries(config) {
  return Object(unchanged__WEBPACK_IMPORTED_MODULE_1__["getOr"])([], ['series'], config);
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
var getNamespacedKey = function getNamespacedKey(key, namespace) {
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
var canCombineChartTypes = function canCombineChartTypes(series) {
  return series.every(function (_ref) {
    var type = _ref.type;
    return !~_constants__WEBPACK_IMPORTED_MODULE_2__["CHARTS_UNABLE_TO_BE_MIXED"].indexOf(type);
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
var createPropertyConvenienceMethod = function createPropertyConvenienceMethod(property) {
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
var isMixedChartType = function isMixedChartType(series) {
  if (!series.length) {
    return false;
  }

  var originalType = series[0].type;

  return series.slice(1).some(function (_ref2) {
    var type = _ref2.type;
    return type !== originalType;
  });
};

var getFirstIfOnly = function getFirstIfOnly(items) {
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
var getMatchingChartIndices = function getMatchingChartIndices(series, chart) {
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
var getNewChartSeries = function getNewChartSeries(series, type) {
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
var getNewConfigFromObject = function getNewConfigFromObject(currentConfig, object) {
  return keys(object).reduce(function (config, key) {
    return Object(unchanged__WEBPACK_IMPORTED_MODULE_1__["set"])(key, object[key], config);
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
var getNewConfigWithSeries = function getNewConfigWithSeries(config, series) {
  var updatedSeries = getDefaultSeries(config).concat(series);

  if (isMixedChartType(updatedSeries) && !canCombineChartTypes(updatedSeries)) {
    throw new TypeError('Cannot combine these chart types.');
  }

  return Object(unchanged__WEBPACK_IMPORTED_MODULE_1__["set"])(['series'], updatedSeries, config);
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
var getSpecificSeries = function getSpecificSeries(series, types) {
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
var removeOrOmit = function removeOrOmit(paths, object) {
  return paths.reduce(function (updatedObject, path) {
    return Object(unchanged__WEBPACK_IMPORTED_MODULE_1__["remove"])(path, updatedObject);
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


/***/ })

/******/ });
});
//# sourceMappingURL=highcharts-config.js.map