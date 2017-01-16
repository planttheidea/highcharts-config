// external dependencies
import isArray from 'lodash/fp/isArray';
import isNAN from 'lodash/fp/isNaN';
import isPlainObject from 'lodash/fp/isPlainObject';
import isUndefined from 'lodash/fp/isUndefined';

// classes
import Config from './Config';

// constants
import {
  CHART_CONVENIENCE_METHOD_NAMES
} from '../constants';

// utils
import {
  getArrayOfItem,
  getFirstIfOnly,
  getMatchingChartIndices,
  getNewChartSeries,
  getNewConfigWithSeries,
  getPathArray,
  getSpecificSeries
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
   * @function addType
   *
   * @description
   * add a chart type with provided series
   *
   * @param {string} type chart type to add to config
   * @param {Array<Object>} seriesPassed data series to populate chart with
   * @returns {ChartConfig} new config class
   */
  addType(type, seriesPassed) {
    let series;

    if (isArray(seriesPassed)) {
      series = seriesPassed;
    } else if (isPlainObject(seriesPassed)) {
      series = [seriesPassed];
    } else {
      throw new TypeError('Series passed must be either a plain object or an array of plain objects.');
    }

    const config = getNewConfigWithSeries(this.config, getNewChartSeries(series, type));

    return new ChartConfig(config, this.options);
  }

  /**
   * @function getType
   *
   * @description
   * get a specific type (or a list of types) from the series in the config
   *
   * @param {Array<string>|string} types the type(s) to select from the config
   * @returns {Array<Object>|Object|null} the matching type(s)
   */
  getType(types) {
    const series = this.get('series');
    const length = series ? series.length : 0;

    if (!length) {
      return null;
    }

    if (isUndefined(types)) {
      return getFirstIfOnly(series);
    }

    return getSpecificSeries(series, getArrayOfItem(types));
  }

  /**
   * @function removeType
   *
   * @description
   * remove an instance of a chart type, all instances, or all charts
   *
   * @param {Array<number|string>|string} [chartPath] chart type with optional index
   * @returns {ChartConfig} new config class
   */
  removeType(chartPath) {
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
    ] = getPathArray(chartPath);

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
  updateType(chartPath, seriesInstance) {
    const {
      series: currentSeries = []
    } = this.config;

    const length = currentSeries.length;

    if (isUndefined(chartPath) || !length) {
      return this;
    }

    if (!isPlainObject(seriesInstance)) {
      throw new TypeError('Series passed must be a plain object.');
    }

    const [
      chart,
      indexString
    ] = getPathArray(chartPath);

    const indexNumber = +indexString;
    const chartIndices = getMatchingChartIndices(currentSeries, chart);
    const indexToUpdate = chartIndices[isNAN(indexNumber) ? 0 : indexNumber];

    const key = `series[${indexToUpdate}]`;
    const existingSeries = this.get(key);

    if (isUndefined(existingSeries)) {
      return this;
    }

    const mergedSeries = {
      ...existingSeries,
      ...seriesInstance
    };
    const series = getNewChartSeries([mergedSeries], chart);

    return isUndefined(indexToUpdate) ? this : this.set(key, series[0]);
  }
}

CHART_CONVENIENCE_METHOD_NAMES.forEach(ChartConfig.addMethod(ChartConfig));

export default ChartConfig;
