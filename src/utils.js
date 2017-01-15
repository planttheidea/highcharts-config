// external dependencies
import get from 'lodash/fp/get';
import isArray from 'lodash/fp/isArray';
import isFunction from 'lodash/fp/isFunction';
import isPlainObject from 'lodash/fp/isPlainObject';
import omit from 'lodash/fp/omit';
import set from 'lodash/fp/set';
import toPath from 'lodash/fp/toPath';

// constants
import {
  CHARTS_UNABLE_TO_BE_MIXED
} from './constants';

const keys = Object.keys;

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
 * @param {function} Constructor constructor to assign method to
 * @param {function} Constructor.addMethod static method to add method to Constructor
 * @param {function} buildConfig main function, returned to allow chainability
 * @returns {function(string, function): function} add method to Constructor
 */
export const createAddMethod = (Constructor, buildConfig) => {
  return (methodName, method) => {
    if (!isFunction(method)) {
      throw new TypeError('The second parameter needs to be a function.');
    }

    Constructor.addMethod(Constructor)(methodName, method);

    return buildConfig;
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
export const createBuildConfig = (Constructor) => {
  return (config = {}, options = {}) => {
    return new Constructor(config, options);
  };
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
export const getConfig = (Config, config) => {
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
export const getDefaultSeries = (config) => {
  return get('series', config) || [];
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
export const getNamespacedKey = (key, namespace) => {
  return `${namespace}.${key}`;
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
export const canCombineChartTypes = (series) => {
  return series.every(({type}) => {
    return !~CHARTS_UNABLE_TO_BE_MIXED.indexOf(type);
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
export const createPropertyConvenienceMethod = (property) => {
  return function(...args) {
    if (!args.length) {
      return this.get(property);
    }

    const [
      subKey,
      value
    ] = args;

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

    return args.length === 1 ? this.get(key) : this.set(key, value);
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
export const isMixedChartType = (series) => {
  if (!series.length) {
    return false;
  }

  const [
    firstItem,
    ...restOfSeries
  ] = series;
  const originalType = firstItem.type;

  return restOfSeries.some(({type}) => {
    return type !== originalType;
  });
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
export const getMatchingChartIndices = (series, chart) => {
  return series.reduce((indices, {type}, seriesIndex) => {
    return type !== chart ? indices : [
      ...indices,
      seriesIndex
    ];
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
export const getNewChartSeries = (series, type) => {
  return series.map((seriesInstance) => {
    return seriesInstance.type ? seriesInstance : {
      ...seriesInstance,
      type
    };
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
export const getNewConfigFromObject = (currentConfig, object) => {
  return keys(object).reduce((config, key) => {
    return set(key, object[key], config);
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
export const getNewConfigWithSeries = (config, series) => {
  const updatedSeries = [
    ...getDefaultSeries(config),
    ...series
  ];

  if (isMixedChartType(updatedSeries) && !canCombineChartTypes(updatedSeries)) {
    throw new TypeError('Cannot combine these chart types.');
  }

  return set('series', updatedSeries, config);
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
export const removeOrOmit = (paths, object) => {
  let pathArray, finalIndex, initialPath, parent, value, indexToMatch;

  return paths.reduce((updatedObject, path) => {
    pathArray = toPath(path);
    finalIndex = pathArray.length - 1;
    initialPath = pathArray.slice(0, finalIndex);
    parent = get(initialPath, updatedObject);

    if (isArray(parent)) {
      indexToMatch = ~~pathArray[finalIndex];
      value = parent.filter((value, index) => {
        return index !== indexToMatch;
      });

      return set(initialPath, value, updatedObject);
    }

    return omit([path], updatedObject);
  }, object);
};
