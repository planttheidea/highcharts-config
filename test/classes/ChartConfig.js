// test
import test from 'ava';
import sinon from 'sinon';
import _ from 'lodash';

// src
import ChartConfig from '../../src/classes/ChartConfig';
import Config from '../../src/classes/Config';
import * as utils from '../../src/utils';
import * as constants from '../../src/constants';

const ADDED_PROTOTYPE_METHODS = ['addType', 'getType', 'removeType', 'updateType'];

test('if ChartConfig is extension of Config', (t) => {
  const result = new ChartConfig();

  t.true(result instanceof ChartConfig);
  t.true(result instanceof Config);

  t.is(result.constructor, ChartConfig);
  t.not(result.constructor, Config);
});

test('if prototype for OptionsConfig are the properties from CHART_CONVENIENCE_METHOD_NAMES', (t) => {
  const optionsPrototype = Object.getOwnPropertyNames(ChartConfig.prototype)
    .filter((method) => method !== 'constructor')
    .sort();

  const expectedResult = [...constants.CHART_CONVENIENCE_METHOD_NAMES, ...ADDED_PROTOTYPE_METHODS].sort();

  t.deepEqual(optionsPrototype, expectedResult);
});

test('if addType will call getNewConfigWithSeries and assign its return to a new instance', (t) => {
  const newConfig = {
    foo: 'bar',
  };

  const stub = sinon.stub(utils, 'getNewConfigWithSeries').callsFake(() => newConfig);

  const instance = new ChartConfig();

  const result = instance.addType('foo', []);

  t.true(stub.calledOnce);
  t.not(result, instance);
  t.is(result.config, newConfig);

  stub.restore();
});

test('if addType will coalesce a plain object to an array of that object', (t) => {
  const newConfig = {
    foo: 'bar',
  };
  const seriesInstance = {};
  const series = [seriesInstance];

  const instance = new ChartConfig();

  const configStub = sinon.stub(utils, 'getNewConfigWithSeries').callsFake(() => newConfig);
  const plainObjectStub = sinon.stub(utils, 'getNewChartSeries').callsFake((seriesPassed) => {
    t.true(_.isArray(seriesPassed));
    t.is(seriesPassed.length, 1);
    t.is(seriesPassed[0], seriesInstance);

    return seriesPassed;
  });

  instance.addType('foo', seriesInstance);

  plainObjectStub.restore();

  const arrayStub = sinon.stub(utils, 'getNewChartSeries').callsFake((seriesPassed) => {
    t.is(seriesPassed, series);

    return seriesPassed;
  });

  instance.addType('foo', series);

  arrayStub.restore();
  configStub.restore();
});

test('if addType will throw when series is not an array or plain object', (t) => {
  const instance = new ChartConfig();

  t.throws(() => {
    instance.addType('foo', 'bar');
  }, TypeError);
});

test('if getType of a config with no series returns null', (t) => {
  const instance = new ChartConfig();

  const result = instance.getType('spline');

  t.is(result, null);
});

test('if getType of a config with an empty series returns null', (t) => {
  const instance = new ChartConfig({
    series: [],
  });

  const result = instance.getType('spline');

  t.is(result, null);
});

test('if getType without any parameters gets all series types', (t) => {
  const series = ['foo', 'bar'];
  const instance = new ChartConfig({
    series,
  });

  const result = instance.getType();

  t.is(result, series);
});

test('if getType with standard type gets the series available for that type', (t) => {
  const type = 'spline';
  const series = [{type}, {type: 'bar'}, {type}];
  const instance = new ChartConfig({
    series,
  });

  const result = instance.getType(type);
  const expectedResult = series.filter(({type: seriesType}) => type === seriesType);

  t.deepEqual(result, expectedResult);
});

test('if getType with type and index as string gets the series available for that type', (t) => {
  const type = 'spline';
  const index = 0;
  const series = [{type}, {type: 'bar'}, {type}];
  const instance = new ChartConfig({
    series,
  });

  const result = instance.getType(`${type}[${index}]`);

  t.deepEqual(result, series[index]);
});

test('if getType with multiple types gets the series available for those types', (t) => {
  const type = 'spline';
  const type2 = 'bar';
  const series = [{type}, {type: type2}, {type}, {type: 'column'}];
  const instance = new ChartConfig({
    series,
  });

  const result = instance.getType([type, type2]);
  const expectedResult = [{type}, {type}, {type: type2}];

  t.deepEqual(result, expectedResult);
});

test('if removeType will remove all series values if no argument is passed', (t) => {
  const config = {
    series: ['foo', 'bar', 'baz'],
  };

  const instance = new ChartConfig(config);

  t.not(instance.config.series.length, 0);

  const result = instance.removeType();

  t.is(result.config.series, undefined);
});

test('if removeType will return the instance if no entries currently exist', (t) => {
  const config = {
    series: [],
  };

  const instance = new ChartConfig(config);

  const result = instance.removeType('foo');

  t.is(result, instance);
});

test('if removeType will remove all instances of a specific type of that type when no index is passed', (t) => {
  const foo = 'foo';
  const bar = 'bar';
  const config = {
    series: [{type: foo}, {type: bar}, {type: foo}],
  };

  const instance = new ChartConfig(config);

  const result = instance.removeType(foo);

  const expectedResult = {
    series: [config.series[1]],
  };

  t.deepEqual(result.config, expectedResult);
});

test('if removeType will remove a single instance of a specific type of that type when an index is passed', (t) => {
  const foo = 'foo';
  const bar = 'bar';
  const config = {
    series: [{type: foo}, {type: bar}, {type: foo}],
  };

  const instance = new ChartConfig(config);

  const result = instance.removeType(`${foo}[0]`);

  const expectedResult = {
    series: [config.series[1], config.series[2]],
  };

  t.deepEqual(result.config, expectedResult);
  t.is(result.config.series[1], expectedResult.series[1]);
});

test('if updateType will return the instance if the series is empty', (t) => {
  const instance = new ChartConfig();

  const result = instance.updateType();

  t.is(result, instance);
});

test('if updateType will return the instance if the chartPath is empty', (t) => {
  const instance = new ChartConfig({
    series: ['foo'],
  });

  const result = instance.updateType();

  t.is(result, instance);
});

test('if updateType will throw if the series instance is not an object', (t) => {
  const instance = new ChartConfig({
    series: ['foo'],
  });

  t.throws(() => {
    instance.updateType('foo', 'bar');
  }, TypeError);
});

test('if updateType will return the instance if the index to update is larger than the available options to update', (t) => {
  const type = 'spline';
  const instance = new ChartConfig({
    series: [{type}],
  });

  const result = instance.updateType(`${type}[1]`, {});

  t.is(result, instance);
});

test('if updateType will update the type matched', (t) => {
  const type = 'spline';
  const instance = new ChartConfig({
    series: [
      {
        data: ['foo'],
        type,
      },
    ],
  });
  const updatedSeries = {
    data: ['bar'],
  };

  const result = instance.updateType(`${type}[0]`, updatedSeries);
  const expectedResult = {
    ...updatedSeries,
    type,
  };

  t.deepEqual(result.config.series[0], expectedResult);
});

test('if updateType will update the first instance of the type matched when no index is passed', (t) => {
  const type = 'spline';
  const instance = new ChartConfig({
    series: [
      {
        data: ['foo'],
        type,
      },
      {
        data: ['baz'],
        type,
      },
    ],
  });
  const updatedSeries = {
    data: ['bar'],
  };

  const result = instance.updateType(type, updatedSeries);
  const expectedResult = {
    ...updatedSeries,
    type,
  };

  t.deepEqual(result.config.series[0], expectedResult);
  t.deepEqual(result.config.series, [expectedResult, instance.config.series[1]]);
});
