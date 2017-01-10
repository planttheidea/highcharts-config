// classes
import ChartConfig from './classes/ChartConfig';
import GlobalConfig from './classes/GlobalConfig';

/**
 * @module index
 */

/**
 * @function createConfig
 *
 * @description
 * create a configuration builder class
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {ChartConfig} the configuration class for a given chart
 */
const createConfig = (config = {}, options = {}) => {
  return new ChartConfig(config, options);
};

/**
 * @function createConfig.chart
 *
 * @description
 * create a configuration builder class
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {ChartConfig} the configuration class for a given chart
 */
createConfig.chart = createConfig;

/**
 * @function createConfig.global
 *
 * @description
 * create a configuration builder class
 *
 * @param {Object} [config={}] configuration to assign
 * @param {Object} [options={}] additional options for the configuration class
 * @returns {ChartConfig} the configuration class for global options
 */
createConfig.global = (config = {}, options = {}) => {
  return new GlobalConfig(config, options);
};

export default createConfig;
