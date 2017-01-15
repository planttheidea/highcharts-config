// test
import test from 'ava';
import _ from 'lodash';

// src
import * as utils from '../src/utils';
import * as constants from '../src/constants';

test('if canCombineChartTypes returns true if series has all types that are not part of CHARTS_UNABLE_TO_BE_MIXED', (t) => {
  const type1 = 'foo';
  const type2 = 'bar';
  const series = [
    {type: type1},
    {type: type2}
  ];

  const result = utils.canCombineChartTypes(series);

  t.true(result);
});

test('if createAddMethod will return a function that will call the addMethod method on the Constructor passed and returns method', (t) => {
  const methodName = 'foo';
  const method = () => {};

  class Foo {
    static addMethod(Constructor) {
      t.is(Constructor, Foo);

      return (...args) => {
        t.deepEqual(args, [
          methodName,
          method
        ]);
      };
    }
  }

  const buildConfig = 'bar';

  const fn = utils.createAddMethod(Foo, buildConfig);

  t.true(_.isFunction(fn));

  const result = fn(methodName, method);

  t.is(result, buildConfig);
});

test('if createAddMethod will throws when method is not a function', (t) => {
  const methodName = 'foo';
  const method = 'bar';

  class Foo {}

  const buildConfig = 'bar';

  const fn = utils.createAddMethod(Foo, buildConfig);

  t.true(_.isFunction(fn));

  t.throws(() => {
    fn(methodName, method);
  }, TypeError);
});

test('if createAddMethodWrapper returns a function calls the method passed with the config and the instance as arguments', (t) => {
  const config = {};
  const options = {};

  class Foo {
    constructor(configPassed, optionsPassed) {
      this.config = configPassed;
      this.options = optionsPassed;
    }

    config = null;
    options = null;
  }

  const instance = new Foo(config, options);

  const method = (...args) => {
    t.deepEqual(args, [
      config,
      instance
    ]);
  };

  let fn = utils.createAddMethodWrapper(Foo, method);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn();
});

test('if createAddMethodWrapper returns a function that returns a new instance with the config returned from method when a plain object', (t) => {
  const config = {};
  const options = {};

  class Foo {
    constructor(configPassed, optionsPassed) {
      this.config = configPassed;
      this.options = optionsPassed;
    }

    config = null;
    options = null;
  }

  const instance = new Foo(config, options);
  const newConfig = {};

  const method = () => {
    return newConfig;
  };

  const fn = utils.createAddMethodWrapper(Foo, method).bind(instance);

  const result = fn();

  t.true(result instanceof Foo);
  t.is(result.config, newConfig);
});

test('if createAddMethodWrapper returns a function that returns a new instance with the original config ' +
  'from method when return from method is not a plain object', (t) => {
  const config = {};
  const options = {};

  class Foo {
    constructor(configPassed, optionsPassed) {
      this.config = configPassed;
      this.options = optionsPassed;
    }

    config = null;
    options = null;
  }

  const instance = new Foo(config, options);

  const method = () => {
    return 'foo';
  };

  const fn = utils.createAddMethodWrapper(Foo, method).bind(instance);

  const result = fn();

  t.true(result instanceof Foo);
  t.is(result.config, config);
});

test('if createBuildConfig returns a function that will call new constructor with arguments passed it', (t) => {
  const config = {};
  const options = {};

  class Foo {
    constructor(...args) {
      t.deepEqual(args, [
        config,
        options
      ]);
    }
  }

  const result = utils.createBuildConfig(Foo);

  t.true(_.isFunction(result));

  result(config, options);
});

test('if getConfig returns original object when config is not an instance of the Constructor passed', (t) => {
  class Foo {}
  const bar = {};

  const result = utils.getConfig(Foo, bar);


  t.is(result, bar);
});

test('if getConfig calls get method when config is an instance of the Constructor passed', (t) => {
  const baz = [];

  class Foo {
    constructor() {
      return this;
    }

    get() {
      return baz;
    }
  }
  const bar = new Foo();

  const result = utils.getConfig(Foo, bar);

  t.is(result, baz);
});

test('if getDefaultSeries returns an empty array when series property does not exist', (t) => {
  const foo = {};

  const result = utils.getDefaultSeries(foo);

  t.deepEqual(result, []);
});

test('if getDefaultSeries returns the series property when it exists', (t) => {
  const series = [];
  const foo = {
    series
  };

  const result = utils.getDefaultSeries(foo);

  t.is(result, series);
});

test('if getNamespacedKey concatenates key and namespace via dot separation', (t) => {
  const key = 'foo';
  const namespace = 'bar';

  const result = utils.getNamespacedKey(key, namespace);

  t.is(result, [namespace, key].join('.'));
});

test('if canCombineChartTypes returns true if series has any types that are part of CHARTS_UNABLE_TO_BE_MIXED', (t) => {
  const type1 = 'foo';
  const type2 = constants.CHARTS_UNABLE_TO_BE_MIXED[0];
  const series = [
    {type: type1},
    {type: type2}
  ];

  const result = utils.canCombineChartTypes(series);

  t.false(result);
});

test('if createPropertyConvenienceMethod will return a function that will call get if no arguments are passed', (t) => {
  const property = 'foo';

  class Foo {
    get(...args) {
      t.is(args.length, 1);
      t.is(args[0], property);
    }
  }

  const instance = new Foo();

  let fn = utils.createPropertyConvenienceMethod(property);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn();
});

test('if createPropertyConvenienceMethod will return a function that will call get with the single argument passed as key namespaced by property', (t) => {
  const property = 'foo';
  const key = 'bar';

  class Foo {
    get(...args) {
      t.is(args.length, 1);
      t.is(args[0], utils.getNamespacedKey(key, property));
    }
  }

  const instance = new Foo();

  let fn = utils.createPropertyConvenienceMethod(property);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn(key);
});

test('if createPropertyConvenienceMethod will return a function that will call set with the two arguments passed as key namespaced by property and value', (t) => {
  const property = 'foo';
  const key = 'bar';
  const value = 'baz';

  class Foo {
    set(...args) {
      t.is(args.length, 2);
      t.is(args[0], utils.getNamespacedKey(key, property));
      t.is(args[1], value);
    }
  }

  const instance = new Foo();

  let fn = utils.createPropertyConvenienceMethod(property);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn(key, value);
});

test('if createPropertyConvenienceMethod will return a function that will call set with the single array argument passed as value and property as key', (t) => {
  const property = 'foo';
  const value = ['bar'];

  class Foo {
    set(...args) {
      t.is(args.length, 2);
      t.is(args[0], property);
      t.is(args[1], value);
    }
  }

  const instance = new Foo();

  let fn = utils.createPropertyConvenienceMethod(property);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn(value);
});

test('if createPropertyConvenienceMethod will return a function that will call set with the single object argument passed as value and property as key', (t) => {
  const property = 'foo';
  const value = {
    bar: 'bar'
  };

  class Foo {
    set(...args) {
      t.is(args.length, 1);
      t.deepEqual(args[0], {
        [utils.getNamespacedKey('bar', property)]: value.bar
      });
    }
  }

  const instance = new Foo();

  let fn = utils.createPropertyConvenienceMethod(property);

  t.true(_.isFunction(fn));

  fn = fn.bind(instance);

  fn(value);
});

test('if isMixedChartType returns false when array is empty', (t) => {
  const result = utils.isMixedChartType([]);

  t.false(result);
});

test('if isMixedChartType returns false when array has series of all the same type', (t) => {
  const type = 'foo';
  const series = [
    {type},
    {type},
    {type},
    {type},
    {type},
    {type}
  ];
  const result = utils.isMixedChartType(series);

  t.false(result);
});

test('if isMixedChartType returns true when array has series with different types', (t) => {
  const type = 'foo';
  const series = [
    {type},
    {type},
    {type},
    {type},
    {type: 'bar'},
    {type}
  ];
  const result = utils.isMixedChartType(series);

  t.true(result);
});

test('if getMatchingChartIndices returns an array of indices where the chart type matches in series', (t) => {
  const matchingType = 'foo';
  const otherType = 'bar';
  const series = [
    {type: matchingType},
    {type: otherType},
    {type: matchingType}
  ];

  const result = utils.getMatchingChartIndices(series, matchingType);

  const expectedResult = series
    .map(({type}, index) => {
      return {
        index,
        type
      };
    })
    .filter(({type}) => {
      return type === matchingType;
    })
    .map(({index}) => {
      return index;
    });

  t.deepEqual(result, expectedResult);
});

test('if getNewChartSeries iterates over series adding type', (t) => {
  const foo = 'foo';
  const series = [
    {foo},
    {foo},
    {foo}
  ];
  const type = 'bar';

  const result = utils.getNewChartSeries(series, type);

  const expectedResult = series.map(({foo}) => {
    return {
      foo,
      type
    };
  });

  t.deepEqual(result, expectedResult);
});

test('if getNewConfigFromObject will return a new object with the values deeply set', (t) => {
  const foo = 'foo';
  const bar = 'bar';
  const baz = 'baz';

  const currentObject = {
    foo
  };
  const newObject = {
    foo: bar,
    bar,
    baz: {
      fooBar: baz
    }
  };

  const result = utils.getNewConfigFromObject(currentObject, newObject);

  t.not(result, currentObject);
  t.not(result, newObject);

  t.deepEqual(result, newObject);
});

test('if getNewConfigWithSeries will add a new series', (t) => {
  const type = 'foo';
  const series = [
    {type},
    {type},
    {type},
    {type}
  ];
  const config = {};

  const result = utils.getNewConfigWithSeries(config, series);

  t.deepEqual(result, {
    series
  });
});

test('if getNewConfigWithSeries will add a new series to the existing one', (t) => {
  const existingSeries = [
    {type: 'bar'}
  ];

  const type = 'foo';
  const series = [
    {type},
    {type},
    {type},
    {type}
  ];
  const config = {
    series: existingSeries
  };

  const result = utils.getNewConfigWithSeries(config, series);

  t.deepEqual(result, {
    series: [
      ...existingSeries,
      ...series
    ]
  });
});

test('if getNewConfigWithSeries will throw when there is a mixed series type that matches ones that cannot be mixed', (t) => {
  const existingSeries = [
    {type: constants.CHARTS_UNABLE_TO_BE_MIXED[0]}
  ];

  const type = 'foo';
  const series = [
    {type}
  ];
  const config = {
    series: existingSeries
  };

  t.throws(() => {
    utils.getNewConfigWithSeries(config, series);
  }, TypeError);
});

test('if removeOrOmit will remove a property from the object passed', (t) => {
  const paths = ['foo.bar.baz', 'bar.baz.foo'];

  const foo = {
    barBaz: 'foo'
  };
  const baz = {
    fooBar: 'baz'
  };
  const object = {
    foo: {
      bar: {
        baz
      }
    },
    bar: {
      baz: {
        foo
      }
    }
  };

  const result = utils.removeOrOmit(paths, object);

  t.not(result, object);
  t.deepEqual(result, {
    foo: {
      bar: {}
    },
    bar: {
      baz: {}
    }
  });
});

test('if removeOrOmit will remove an index from the object passed', (t) => {
  const paths = ['foo.bar[0]', 'bar.baz[0]'];

  const bar = [
    'foo',
    'bar'
  ];
  const baz = [
    'baz',
    'foo'
  ];
  const object = {
    foo: {
      bar
    },
    bar: {
      baz
    }
  };

  const result = utils.removeOrOmit(paths, object);

  t.not(result, object);
  t.deepEqual(result, {
    foo: {
      bar: [
        'bar'
      ]
    },
    bar: {
      baz: [
        'foo'
      ]
    }
  });
});

test('if getArrayOfItem returns the item if already an array', (t) => {
  const item = ['foo'];

  const result = utils.getArrayOfItem(item);

  t.is(result, item);
});

test('if getArrayOfItem returns the item wrapped in an array if not aleady an array', (t) => {
  const item = {};

  const result = utils.getArrayOfItem(item);

  t.deepEqual(result, [item]);
  t.is(result[0], item);
});

test('if getFirstIfOnly returns first item in the array if its the only one', (t) => {
  const item = {};

  const result = utils.getFirstIfOnly([item]);

  t.is(result, item);
});

test('if getPathArray will return the path array if not already an array', (t) => {
  const path = 'foo.bar';
  const result = utils.getPathArray(path);

  t.deepEqual(result, [
    'foo',
    'bar'
  ]);
});

test('if getPathArray will return the original array if already an array', (t) => {
  const paths = ['foo', 'bar'];
  const result = utils.getPathArray(paths);

  t.is(result, paths);
});

test('if getFirstIfOnly returns all items in the array if there is more than one', (t) => {
  const item = {};
  const secondItem = {};
  const items = [item, secondItem];

  const result = utils.getFirstIfOnly(items);

  t.not(result, item);
  t.is(result, items);
});

test('if getSpecificSeries finds the correct series based on types passed', (t) => {
  const type1 = 'spline';
  const type2 = 'bar';
  const types = [type1, type2];
  const series = [
    {type: type1},
    {type: 'line'},
    {type: type1},
    {type: type2},
    {type: type2}
  ];

  const result = utils.getSpecificSeries(series, types);
  const expectedResult = series.filter(({type}) => {
    return type === type1 || type === type2;
  });

  t.deepEqual(result, expectedResult);
});

test('if getSpecificSeries finds the correct series based on types and indices passed', (t) => {
  const type1 = 'spline';
  const type2 = 'bar';
  const types = [`${type1}[0]`, `${type2}[1]`];
  const series = [
    {type: type1},
    {type: 'line'},
    {type: type1},
    {type: type2}
  ];

  const result = utils.getSpecificSeries(series, types);

  t.deepEqual(result, series[2]);
});