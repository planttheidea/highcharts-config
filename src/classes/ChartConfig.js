// external dependencies
import isPlainObject from 'lodash/isPlainObject';

// classes
import Config from './Config';

// constants
import {
  CHART_CONVENIENCE_METHOD_NAMES
} from '../constants';

// utils
import {
  getNewChartSeries,
  getNewConfigWithSeries
} from '../utils';

/**
 * @module classes/ChartConfig
 */

/**
 * @class ChartConfig
 * @classdesc configuration object builder for charts
 */
class ChartConfig extends Config {
  /**
   * @function addChart
   *
   * @description
   * add a chart type with provided series
   *
   * @param {string} type chart type to add to config
   * @param {Array<Object>} seriesPassed data series to populate chart with
   * @returns {ChartConfig} new config class
   */
  addChart(type, seriesPassed) {
    const series = isPlainObject(seriesPassed) ? [seriesPassed] : seriesPassed;
    const config = getNewConfigWithSeries(this.config, type, getNewChartSeries(series, type));

    return new ChartConfig(config, this.options);
  }
}

CHART_CONVENIENCE_METHOD_NAMES.forEach(ChartConfig.addMethod(ChartConfig));

export default ChartConfig;
