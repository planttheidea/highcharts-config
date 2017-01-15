// test
import test from 'ava';

// src
import OptionsConfig from '../../src/classes/OptionsConfig';
import Config from '../../src/classes/Config';
import * as constants from '../../src/constants';

test('if OptionsConfig is extension of Config', (t) => {
  const result = new OptionsConfig();

  t.true(result instanceof OptionsConfig);
  t.true(result instanceof Config);

  t.is(result.constructor, OptionsConfig);
  t.not(result.constructor, Config);
});

test('if prototype for OptionsConfig are the properties from OPTIONS_CONVENIENCE_METHOD_NAMES', (t) => {
  const optionsPrototype = Object.getOwnPropertyNames(OptionsConfig.prototype)
    .filter((method) => {
      return method !== 'constructor';
    })
    .sort();

  const expectedResult = [...constants.OPTIONS_CONVENIENCE_METHOD_NAMES].sort();

  t.deepEqual(optionsPrototype, expectedResult);
});

