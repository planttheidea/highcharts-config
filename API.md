# highcharts-config API

### Table of contents

### buildConfig

```javascript
const INITIAL_CONFIG = {
  colors: [
    'red',
    'green',
    'blue'
  ]
};
const OPTIONS = {
  validate(config) {
    return !!config.colors;
  }
};

const config = buildConfig(INITIAL_CONFIG, OPTIONS);
```

**buildConfig([config: (ChartConfig|Object) = {}[, options: Object = {}]]): ChartConfig**

Build a configuration object specific to charts (same as *buildConfig.chart*), with the accompanying convenience methods.

*config (defaults to {})*

Initial configuration object to populate with, either as a plain object or an existing ChartConfig instance.

*options (defaults to {})*

Options to apply to the configuration, with all properties optional. Takes the following shape:

```
{
  validate: Function
}
```

*options.validate(config: Object): boolean*

Receives the current configuration object in plain object form and expects a boolean return from the function. You can use whatever validator you wish to pass in, and the only thing that is done with this information is that the return from the function is assigned to the *isValid* property on the ChartConfig instance.

### buildConfig.chart

Exact same as *buildConfig*, so please [see it's API for details](#buildconfig)

### buildConfig.options

```javascript
const INITIAL_CONFIG = {
  getTimezzoneOffset(timestamp) {
    return moment.utc(timestamp).utcOffset();
  }
};
const OPTIONS = {
  validate(config) {
    return Math.abs(config.global.getTimezoneOffset()) < 5;
  }
};

const config = buildConfig(INITIAL_CONFIG, OPTIONS);
```

**buildConfig.options(config: (Object|OptionsConfig) = {}[, options: Object = {}]])(**

Build a configuration object spcific to options, with the accompanying convenience methods.

*config (defaults to {})*

Initial configuration object to populate with, either as a plain object or an existing ChartConfig instance.

*options (defaults to {})*

Options to apply to the configuration, with all properties optional. Takes the following shape:

```
{
  validate: Function
}
```

*options.validate(config: Object): boolean*

Receives the current configuration object in plain object form and expects a boolean return from the function. You can use whatever validator you wish to pass in, and the only thing that is done with this information is that the return from the function is assigned to the *isValid* property on the OptionsConfig instance.

### buildConfig.addChartMethod

```javascript
buildConfig.addChartMethod('log', (config, configInstance) => {
 logger.info(config);
});
```

**buildConfig.addChartMethod(methodName: string, method: Function): buildConfig**

Accepts the name of the method and the method itself, and returns the *buildConfig* method for chaining multiple usages of *addChartMethod*. This method is useful for development-specific configurations, or if you are using a plugin and want to create a convenience method specific to it.

The method you pass will receive two parameters, the current configuration in plain object form, and the configuration instance itself. If you return a plain object from this method, it will assume you made modifications to the configuration and will assign that return to a new configuration instance. If you return anything other than a plain object, it will simply continue the chaining.

### buildConfig.addOptionsMethod

```javascript
buildConfig.addOptionsMethod('log', (config, configInstance) => {
 const useUTC = config.global.getTimezoneOffset() === 0;
 
 return {
  ...config,
  global: {
    ...config.global,
    useUTC
  }
 };
});
```

**buildConfig.addOptionsMethod(methodName: string, method: Function): buildConfig**

Accepts the name of the method and the method itself, and returns the *buildConfig* method for chaining multiple usages of *addOptionsMethod*. This method is useful for development-specific configurations, or if you are using a plugin and want to create a convenience method specific to it.

The method you pass will receive two parameters, the current configuration in plain object form, and the configuration instance itself. If you return a plain object from this method, it will assume you made modifications to the configuration and will assign that return to a new configuration instance. If you return anything other than a plain object, it will simply continue the chaining.
