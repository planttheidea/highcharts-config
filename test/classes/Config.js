// test
import test from 'ava';
import _ from 'lodash';
import sinon from 'sinon';

// src
import Config from '../../src/classes/Config';
import * as utils from '../../src/utils';

test('if Config called by itself creates an empty config and options object', (t) => {
  const result = new Config();

  t.true(result instanceof Config);

  t.deepEqual(result.config, {});
  t.is(result.isValid, null);
  t.deepEqual(result.options, {});
});

test('if Config will assign the config passed and a shallow clone of the options passed', (t) => {
  const config = {
    foo: 'foo'
  };
  const options = {
    bar: 'bar'
  };

  const result = new Config(config, options);

  t.is(result.config, config);

  t.not(result.options, options);
  t.deepEqual(result.options, options);
});

test('if Config will call the validate fn when passed in options, and assign its return to isValid', (t) => {
  const config = {
    foo: 'foo'
  };
  const options = {
    validate() {
      return true;
    }
  };

  const spy = sinon.spy(options, 'validate');

  const result = new Config(config, options);

  t.true(spy.calledOnce);

  t.is(result.isValid, true);

  spy.restore();
});

test('if addMethod will return a function that will define a method on the class', (t) => {
  const fn = Config.addMethod(Config);

  t.true(_.isFunction(fn));

  const methodName = 'foo';
  const method = () => {};

  const result = fn(methodName, method);

  t.true(_.isFunction(Config.prototype[methodName]));
  t.is(result, Config);
});

test('if clear will create a new Config with an empty config object while passing through the options', (t) => {
  const config = {
    foo: {
      bar: {
        baz: 'fooBarBaz'
      }
    }
  };
  const options = {
    foo: 'foo'
  };

  const instance = new Config(config, options);

  t.deepEqual(instance.config, config);
  t.deepEqual(instance.options, options);

  const result = instance.clear();

  t.deepEqual(result.config, {});
  t.deepEqual(result.options, options);
});

test('if get will return the config when no arguments are passed', (t) => {
  const config = {
    foo: 'bar'
  };

  const instance = new Config(config);

  t.is(instance.get(), config);
});

test('if get will return the property requested from the config whe passed', (t) => {
  const key = 'foo.bar.baz';
  const baz = 'baz';
  const config = {
    foo: {
      bar: {
        baz
      }
    }
  };

  const instance = new Config(config);

  t.is(instance.get(key), baz);
});

test('if merge returns instance if no configs passed', (t) => {
  const instance = new Config();

  const result = instance.merge();

  t.is(result, instance);
});

test('if merge merges two configs', (t) => {
  const config1 = {
    foo: {
      bar: {
        baz: 'foo'
      }
    }
  };
  const config2 = {
    foo: {
      baz: 'baz'
    },
    bar: {
      baz: 'foo'
    }
  };

  const instance = new Config(config1);

  const result = instance.merge(config2);

  const expectedResult = {
    foo: {
      bar: {
        baz: 'foo'
      },
      baz: 'baz'
    },
    bar: {
      baz: 'foo'
    }
  };

  t.deepEqual(result.config, expectedResult);
});

test('if merge merges more than two configs', (t) => {
  const config1 = {
    foo: {
      bar: {
        baz: 'foo'
      }
    }
  };
  const config2 = {
    foo: {
      baz: 'baz'
    },
    bar: {
      baz: 'foo'
    }
  };
  const config3 = {
    baz: 'foo'
  };

  const instance = new Config(config1);

  const result = instance.merge(config2, config3);

  const expectedResult = {
    foo: {
      bar: {
        baz: 'foo'
      },
      baz: 'baz'
    },
    bar: {
      baz: 'foo'
    },
    baz: 'foo'
  };

  t.deepEqual(result.config, expectedResult);
});

test('if remove calls removeOrOmit and assigns return to new config', (t) => {
  const path = 'foo.bar';
  const config = {};
  const newConfig = {};

  const stub = sinon.stub(utils, 'removeOrOmit', (keys, passedConfig) => {
    t.deepEqual(keys, [path]);
    t.is(config, passedConfig);

    return newConfig;
  });

  const instance = new Config(config);

  const result = instance.remove(path);

  t.not(instance.config, result.config);
  t.is(result.config, newConfig);

  stub.restore();
});

test('if remove coalesces string path to array', (t) => {
  const path = 'foo.bar';
  const paths = [path];

  const instance = new Config();

  const coalesceStub = sinon.stub(utils, 'removeOrOmit', (keys) => {
    t.deepEqual(keys, paths);

    return {};
  });

  instance.remove(path);

  coalesceStub.restore();

  const equalStub = sinon.stub(utils, 'removeOrOmit', (keys) => {
    t.is(keys, paths);

    return {};
  });

  instance.remove(paths);

  equalStub.restore();
});

test('if set returns instance if no key is passed', (t) => {
  const instance = new Config();

  const result = instance.set();

  t.is(result, instance);
});

test('if set assigns nested value and returns new config', (t) => {
  const path = 'foo.bar.baz';
  const value = 'fooBar';

  const instance = new Config();

  const result = instance.set(path, value);

  t.deepEqual(result.config, {
    foo: {
      bar: {
        baz: value
      }
    }
  });
});

test('if set calls getNewConfigFromObject when path is a plain object and assigns its return to new config', (t) => {
  const path = {
    foo: 'baz'
  };
  const config = {
    foo: 'bar'
  };

  const stub = sinon.stub(utils, 'getNewConfigFromObject', (passedConfig, passedPath) => {
    t.is(passedConfig, config);
    t.is(passedPath, path);

    return passedPath;
  });

  const instance = new Config(config);

  const result = instance.set(path);

  t.not(result, instance);
  t.is(result.config, path);
});

test('if toString will stringify the config with proper formatting', (t) => {
  const config = {
    foo: {
      bar: {
        baz: 'fooBarBaz'
      }
    }
  };

  const instance = new Config(config);

  const result = instance.toString();

  t.is(result, JSON.stringify(config, null, 2));
});

