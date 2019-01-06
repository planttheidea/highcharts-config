// classes
import ChartConfig from './classes/ChartConfig';
import OptionsConfig from './classes/OptionsConfig';

// utils
import {
  createAddMethod,
  createBuildConfig,
} from './utils';

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
const buildConfig = createBuildConfig(ChartConfig);

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
buildConfig.addChartMethod = createAddMethod(ChartConfig, buildConfig);

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
buildConfig.addOptionsMethod = createAddMethod(OptionsConfig, buildConfig);

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
buildConfig.chart = createBuildConfig(ChartConfig);

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
buildConfig.options = createBuildConfig(OptionsConfig);

export default buildConfig;
