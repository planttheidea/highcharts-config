// test
import test from 'ava';
import sinon from 'sinon';
import _ from 'lodash';

// src
import ChartConfig from '../../src/classes/ChartConfig';
import Config from '../../src/classes/Config';
import * as utils from '../../src/utils';
import * as constants from '../../src/constants';

test('if ChartConfig is extension of Config', (t) => {
  const result = new ChartConfig();

  t.true(result instanceof ChartConfig);
  t.true(result instanceof Config);

  t.is(result.constructor, ChartConfig);
  t.not(result.constructor, Config);
});

test('if prototype for OptionsConfig are the properties from CHART_CONVENIENCE_METHOD_NAMES', (t) => {
  const optionsPrototype = Object.getOwnPropertyNames(ChartConfig.prototype)
    .filter((method) => {
      return method !== 'constructor';
    })
    .sort();

  const expectedResult = [...constants.CHART_CONVENIENCE_METHOD_NAMES, 'addChart', 'removeChart'].sort();

  t.deepEqual(optionsPrototype, expectedResult);
});

test('if addChart will call getNewConfigWithSeries and assign its return to a new instance', (t) => {
  const newConfig = {
    foo: 'bar'
  };

  const stub = sinon.stub(utils, 'getNewConfigWithSeries', () => {
    return newConfig;
  });

  const instance = new ChartConfig();

  const result = instance.addChart('foo', []);

  t.true(stub.calledOnce);
  t.not(result, instance);
  t.is(result.config, newConfig);

  stub.restore();
});

test('if addChart will coalesce a plain object to an array of that object', (t) => {
  const newConfig = {
    foo: 'bar'
  };
  const seriesInstance = {};
  const series = [seriesInstance];

  const instance = new ChartConfig();

  const configStub = sinon.stub(utils, 'getNewConfigWithSeries', () => {
    return newConfig;
  });
  const plainObjectStub = sinon.stub(utils, 'getNewChartSeries', (seriesPassed) => {
    t.true(_.isArray(seriesPassed));
    t.is(seriesPassed.length, 1);
    t.is(seriesPassed[0], seriesInstance);

    return seriesPassed;
  });

  instance.addChart('foo', seriesInstance);

  plainObjectStub.restore();

  const arrayStub = sinon.stub(utils, 'getNewChartSeries', (seriesPassed) => {
    t.is(seriesPassed, series);

    return seriesPassed;
  });

  instance.addChart('foo', series);

  arrayStub.restore();
  configStub.restore();
});

test('if addChart will throw when series is not an array or plain object', (t) => {
  const instance = new ChartConfig();

  t.throws(() => {
    instance.addChart('foo', 'bar');
  }, TypeError);
});

test('if removeChart will remove all series values if no argument is passed', (t) => {
  const config = {
    series: ['foo', 'bar', 'baz']
  };

  const instance = new ChartConfig(config);

  t.not(instance.config.series.length, 0);

  const result = instance.removeChart();

  t.is(result.config.series, undefined);
});

test('if removeChart will return the instance if no entries currently exist', (t) => {
  const config = {
    series: []
  };

  const instance = new ChartConfig(config);

  const result = instance.removeChart('foo');

  t.is(result, instance);
});

test('if removeChart will remove all instances of a specific type of that type when no index is passed', (t) => {
  const foo = 'foo';
  const bar = 'bar';
  const config = {
    series: [
      {type: foo},
      {type: bar},
      {type: foo}
    ]
  };

  const instance = new ChartConfig(config);

  const result = instance.removeChart(foo);

  const expectedResult = {
    series: [
      config.series[1]
    ]
  };

  t.deepEqual(result.config, expectedResult);
});

test('if removeChart will remove a single instance of a specific type of that type when an index is passed', (t) => {
  const foo = 'foo';
  const bar = 'bar';
  const config = {
    series: [
      {type: foo},
      {type: bar},
      {type: foo}
    ]
  };

  const instance = new ChartConfig(config);

  const result = instance.removeChart(`${foo}[0]`);

  const expectedResult = {
    series: [
      config.series[1],
      config.series[2]
    ]
  };

  t.deepEqual(result.config, expectedResult);
  t.is(result.config.series[1], expectedResult.series[1]);
});

