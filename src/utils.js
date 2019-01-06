// external dependencies
import {parse} from 'pathington';
import {
  getOr,
  remove,
  set,
} from 'unchanged';

// constants
import {CHARTS_UNABLE_TO_BE_MIXED} from './constants';

const {isArray} = Array;
const {getOwnPropertySymbols, keys} = Object;
const {hasOwnProperty} = Object.prototype;

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
export const isFunction = (object) => typeof object === 'function';

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
export const isNAN = (object) => object !== object;

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
export const isPlainObject = (object) => !!object && object.constructor === Object;

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
export const isUndefined = (object) => object === void 0;

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
export const assignFallback = (target, ...sources) =>
  sources.reduce((assigned, source) => {
    if (!isPlainObject(source) && !isUndefined(source)) {
      return assigned;
    }

    for (let key in source) {
      if (hasOwnProperty.call(source, key)) {
        assigned[key] = source[key];
      }
    }

    if (typeof getOwnPropertySymbols !== 'function') {
      return assigned;
    }

    const symbols = getOwnPropertySymbols(source);

    return symbols.reduce((assignedWithSymbols, symbol) => {
      assignedWithSymbols[symbol] = source[symbol];

      return assignedWithSymbols;
    }, assigned);
  }, target);

export const assign = typeof Object.assign === 'function' ? Object.assign : assignFallback;

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
export const createAddMethod = (Constructor, buildConfig) => (methodName, method) => {
  if (typeof method === 'function') {
    Constructor.addMethod(Constructor)(methodName, method);

    return buildConfig;
  }

  throw new TypeError('The second parameter needs to be a function.');
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
export const createAddMethodWrapper = function(Constructor, method) {
  return function() {
    const result = method.call(this, this.config, this);
    const config = isPlainObject(result) ? result : this.config;

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
export const createBuildConfig = (Constructor) => (config = {}, options = {}) => new Constructor(config, options);

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
export const getArrayOfItem = (item) => (isArray(item) ? item : [item]);

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
export const getPathArray = (path) => (isArray(path) ? path : parse(path));

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
export const getConfig = (Config, config) => (config instanceof Config ? config.get() : config);

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
export const getDefaultSeries = (config) => getOr([], ['series'], config);

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
export const getNamespacedKey = (key, namespace) => `${namespace}.${key}`;

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
export const canCombineChartTypes = (series) => series.every(({type}) => !~CHARTS_UNABLE_TO_BE_MIXED.indexOf(type));

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
export const createPropertyConvenienceMethod = (property) =>
  function(subKey, value) {
    const length = arguments.length;

    if (!length) {
      return this.get(property);
    }

    if (isPlainObject(subKey)) {
      const cleanArgs = keys(subKey).reduce((updatedObject, keyWithoutProperty) => {
        updatedObject[getNamespacedKey(keyWithoutProperty, property)] = subKey[keyWithoutProperty];

        return updatedObject;
      }, {});

      return this.set(cleanArgs);
    }

    if (isArray(subKey)) {
      return this.set(property, subKey);
    }

    const key = getNamespacedKey(subKey, property);

    return length === 1 ? this.get(key) : this.set(key, value);
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
export const isMixedChartType = (series) => {
  if (!series.length) {
    return false;
  }

  const originalType = series[0].type;

  return series.slice(1).some(({type}) => type !== originalType);
};

export const getFirstIfOnly = (items) => (items.length === 1 ? items[0] : items);

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
export const getMatchingChartIndices = (series, chart) =>
  series.reduce((indices, {type}, seriesIndex) => {
    if (type === chart) {
      indices.push(seriesIndex);
    }

    return indices;
  }, []);

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
export const getNewChartSeries = (series, type) =>
  series.map((seriesInstance) => (seriesInstance.type ? seriesInstance : assign({}, seriesInstance, {type})));

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
export const getNewConfigFromObject = (currentConfig, object) =>
  keys(object).reduce((config, key) => set(key, object[key], config), currentConfig);

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
export const getNewConfigWithSeries = (config, series) => {
  const updatedSeries = getDefaultSeries(config).concat(series);

  if (isMixedChartType(updatedSeries) && !canCombineChartTypes(updatedSeries)) {
    throw new TypeError('Cannot combine these chart types.');
  }

  return set(['series'], updatedSeries, config);
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
export const getSpecificSeries = (series, types) => {
  let chart, indexOfChart, matches, match;

  const specificSeries = types.reduce((matchingSeries, type) => {
    [chart, indexOfChart] = getPathArray(type);

    matches = series.filter(({type: seriesType}) => seriesType === chart);

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
export const removeOrOmit = (paths, object) =>
  paths.reduce((updatedObject, path) => remove(path, updatedObject), object);
