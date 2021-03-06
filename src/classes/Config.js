// external dependencies
import {
  get,
  merge,
  set,
} from 'unchanged';

// utils
import {
  assign,
  createAddMethodWrapper,
  createPropertyConvenienceMethod,
  getArrayOfItem,
  getConfig,
  getNewConfigFromObject,
  isFunction,
  isPlainObject,
  isUndefined,
  removeOrOmit,
} from '../utils';

/**
 * @module classes/Config
 */

/**
 * @private
 *
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
    this.config = getConfig(Config, config);
    this.options = assign({}, options);

    const {validate} = this.options;

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
   * @param {function} Constructor constructor to assign method to prototype of
   * @param {Object} Constructor.prototype prototype to assign method to
   * @returns {function(string, (function|number)): (ChartConfig|OptionsConfig)} method to add convenience method
   */
  static addMethod(Constructor) {
    return (methodName, method) => {
      const methodToAssign = isFunction(method)
        ? createAddMethodWrapper(Constructor, method)
        : createPropertyConvenienceMethod(methodName);

      Object.defineProperty(Constructor.prototype, methodName, {
        configurable: false,
        enumerable: false,
        value: methodToAssign,
        writable: true,
      });

      return Constructor;
    };
  }

  /**
   * @function clear
   *
   * @description
   * clear out the current config and start anew
   *
   * @returns {Config} new config class
   */
  clear() {
    return new this.constructor({}, this.options);
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
    return isUndefined(path) ? this.config : get(path, this.config);
  }

  /**
   * @function merge
   *
   * @description
   * merge the configs passed to form a new config
   *
   * @returns {Config} new config class
   */
  merge(...otherConfigs) {
    if (!otherConfigs.length) {
      return this;
    }

    const config = otherConfigs.reduce(
      (newConfig, config) => merge(null, newConfig, getConfig(Config, config)),
      this.config
    );

    return new this.constructor(config, this.options);
  }

  /**
   * @function remove
   *
   * @description
   * remove item at path (top-level or nested) in the config
   *
   * @param {string} paths path to remove from config
   * @returns {Config} new config class
   */
  remove(paths) {
    const keys = getArrayOfItem(paths);
    const config = removeOrOmit(keys, this.config);

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
    if (isUndefined(path)) {
      return this;
    }

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
