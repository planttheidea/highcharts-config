// external dependencies
import isArray from 'lodash/fp/isArray';
import isNAN from 'lodash/fp/isNaN';
import isPlainObject from 'lodash/fp/isPlainObject';
import isUndefined from 'lodash/fp/isUndefined';
import toPath from 'lodash/fp/toPath';

// classes
import Config from './Config';

// constants
import {
  CHART_CONVENIENCE_METHOD_NAMES
} from '../constants';

// utils
import {
  getMatchingChartIndices,
  getNewChartSeries,
  getNewConfigWithSeries
} from '../utils';

/**
 * @module classes/ChartConfig
 */

/**
 * @private
 *
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
    let series;

    if (isArray(seriesPassed)) {
      series = seriesPassed;
    } else if (isPlainObject(seriesPassed)) {
      series = [seriesPassed];
    } else {
      throw new TypeError('Series passed must be either a plain object or an array of plain objects.');
    }

    const config = getNewConfigWithSeries(this.config, type, getNewChartSeries(series, type));

    return new ChartConfig(config, this.options);
  }

  /**
   * @function removeChart
   *
   * @description
   * remove an instance of a chart type, all instances, or all charts
   *
   * @param {string} [chartPath] chart type with optional index
   * @returns {ChartConfig} new config class
   */
  removeChart(chartPath) {
    if (isUndefined(chartPath)) {
      return this.remove('series');
    }

    const {
      series: currentSeries = []
    } = this.config;

    if (!currentSeries.length) {
      return this;
    }

    const [
      chart,
      indexString
    ] = toPath(chartPath);

    if (isUndefined(indexString)) {
      const series = currentSeries.filter(({type}) => {
        return type !== chart;
      });

      return this.set('series', series);
    }

    const chartIndices = getMatchingChartIndices(currentSeries, chart);
    const indexNumber = +indexString;
    const indexToRemove = chartIndices[isNAN(indexNumber) ? 0 : indexNumber];

    return isUndefined(indexToRemove) ? this : this.remove(`series[${indexToRemove}]`);
  }
}

CHART_CONVENIENCE_METHOD_NAMES.forEach(ChartConfig.addMethod(ChartConfig));

export default ChartConfig;
