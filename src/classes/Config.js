// external dependencies
import get from 'lodash/fp/get';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/fp/omit';
import set from 'lodash/fp/set';

// utils
import {
  createPropertyConvenienceMethod,
  getNewConfigFromObject
} from '../utils';

/**
 * @module classes/Config
 */

/**
 * @class Config
 * @classdesc configuration object builder base class
 */
class Config {
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
  constructor(config = {}, options = {}) {
    this.config = {...config};
    this.options = {...options};

    const {
      validate
    } = this.options;

    if (isFunction(validate)) {
      this.isValid = validate(this.config);
    }

    return this;
  }

  /**
   * @instance
   * @type {Object|null}
   */
  config = null;

  /**
   * @instance
   * @type {boolean|null}
   */
  isValid = null;

  /**
   * @instance
   * @type {Object|null}
   */
  options = null;

  /**
   * @function addConvenienceMethod
   * @static
   *
   * @description
   * add a convenience method to the constructor passed
   *
   * @param {ChartConfig|OptionsConfig} Constructor constructor to assign method to
   * @returns {function(string, (function|number)): (ChartConfig|OptionsConfig)} method to add convenience method
   */
  static addMethod(Constructor) {
    return (methodName, method) => {
      if (!isFunction(method)) {
        method = createPropertyConvenienceMethod(methodName);
      }

      Object.defineProperty(Constructor.prototype, methodName, {
        configurable: false,
        enumerable: false,
        value: method,
        writable: true
      });

      return Constructor;
    };
  }

  /**
   * @function get
   *
   * @description
   * get a value from a path (top-level or nested) from the config
   *
   * @param {string} path path to retrieve from config
   * @returns {*} value at path
   */
  get(path) {
    return isUndefined(path) ? {...this.config} : get(path, this.config);
  }

  /**
   * @function remove
   *
   * @description
   * remove item at path (top-level or nested) in the config
   *
   * @param {string} path path to remove from config
   * @returns {Config} new config class
   */
  remove(path) {
    const keys = isArray(path) ? path : [path];
    const config = omit(keys, this.config);

    return new this.constructor(config, this.options);
  }

  /**
   * @function set
   *
   * @param {string} path path to set in config
   * @param {*} value value to assign to path
   * @returns {Config} new config class
   */
  set(path, value) {
    const config = isPlainObject(path) ? getNewConfigFromObject(this.config, path) : set(path, value, this.config);

    return new this.constructor(config, this.options);
  }

  /**
   * @function toString
   *
   * @description
   * return stringified config
   *
   * @returns {string} stringified config
   */
  toString() {
    return JSON.stringify(this.config, null, 2);
  }
}

export default Config;
