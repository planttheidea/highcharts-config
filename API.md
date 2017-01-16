# highcharts-config API

### Table of contents

* [buildConfig](#buildconfig)
  * [buildConfig.chart](#buildconfigchart)
  * [buildConfig.options](#buildconfigoptions)
  * [buildConfig.addChartMethod](#buildconfigaddchartmethod)
  * [buildConfig.addOptionsMethod](#buildconfigaddoptionsmethod)
* [ChartConfig](#chartconfig)
  * [Built-in OptionsConfig convenience methods](#built-in-chartconfig-convenience-methods)
  * [Additional OptionsConfig methods](#additional-chartconfig-methods)
* [OptionsConfig](#optionsconfig)
  * [Built-in OptionsConfig convenience methods](#built-in-optionsconfig-convenience-methods)
  * [Additional OptionsConfig methods](#additional-optionsconfig-methods)

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

const configInstance = buildConfig(INITIAL_CONFIG, OPTIONS);
```

`buildConfig([config: (ChartConfig|Object) = {}[, options: Object = {}]]): ChartConfig`

Build a configuration object specific to charts (same as *buildConfig.chart*), with the accompanying convenience methods. Accepts the initial configuration object to populate with, either as a plain object or an existing ChartConfig instance, and any options to apply to the configuration, with all properties optional. Takes the following shape:

```
{
  validate: Function
}
```

*options.validate(config: Object): boolean*

Receives the current configuration object in plain object form and expects a boolean return from the function. You can use whatever validator you wish to pass in, and the only thing that is done with this function is that the return is assigned to the *isValid* property on the ChartConfig instance for each chained method.

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

`buildConfig.options(config: (Object|OptionsConfig) = {}[, options: Object = {}]])`

Build a configuration object specific to global options, with the accompanying convenience methods. Accepts the initial configuration object to populate with, either as a plain object or an existing OptionsConfig instance, and any options to apply to the configuration, with all properties optional. Takes the following shape:

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

`buildConfig.addChartMethod(methodName: string, method: Function): buildConfig`

Accepts the name of the method and the method itself, and returns the *buildConfig* method for chaining multiple usages of *addChartMethod*. This method is useful for development-specific configurations, or if you are using a plugin and want to create a convenience method specific to it.

The method you pass will receive two parameters, the current configuration in plain object form, and the configuration instance itself. If you return a plain object from this method, it will assume you made modifications to the configuration and will assign that return to a new configuration instance. If you return anything other than a plain object, it will simply continue the chaining.

### buildConfig.addOptionsMethod

```javascript
buildConfig.addOptionsMethod('log', (config, configInstance) => {
 const useUTC = config.global.getTimezoneOffset() === 0;
 ChartConfig
 return {
  ...config,
  global: {
    ...config.global,
    useUTC
  }
 };
});
```

`buildConfig.addOptionsMethod(methodName: string, method: Function): buildConfig`

Accepts the name of the method and the method itself, and returns the *buildConfig* method for chaining multiple usages of *addOptionsMethod*. This method is useful for development-specific configurations, or if you are using a plugin and want to create a convenience method specific to it.

The method you pass will receive two parameters, the current configuration in plain object form, and the configuration instance itself. If you return a plain object from this method, it will assume you made modifications to the configuration and will assign that return to a new configuration instance. If you return anything other than a plain object, it will simply continue the chaining.

### ChartConfig

The internal class specific to the configuration used in the `Highcharts.chart` method ([more details here](http://api.highcharts.com/highcharts)). An instance of this class is returned when you call `buildConfig.chart` or simply `buildConfig`.

### Built-in ChartConfig convenience methods

All convenience methods follow the same paradigm:

`chartConfig.CONVENIENCE_METHOD(key: (Array<number|string>|Object|string), value: any): OptionsConfig`

If the first parameter is an object or an array, it is a *setter* for the method name property.

```javascript
chartConfig.legend({
 align: 'right',
 layout: 'vertical',
 verticalAlign: 'middle'
});
```

If there is no second parameter, it is a *getter* of that path. When using a string, you can use path notation for deeply-nested values. Returns a new ChartConfig instance with the updated configuration values.

```javascripy
const title = chartConfig.title('text');
```

If there is a second parameter, it is a *setter* of that value at the location of the first parameter's location. When using a string, you can use path notation for deeply-nested values. Returns a new ChartConfig instance with the updated configuration values.

```javascript
chartConfig.yAxis('title.text', 'My Fancy Chart');
```

The list of available convenience methods:
* accessibility
* chart
* colorAxis
* colors
* credits
* data
* defs
* drilldown
* exporting
* labels
* legend
* loading
* mapNavigation
* navigation
* noData
* pane
* plotOptions
* responsive
* series (if setting, it should be preferred to use the *addType* method)
* subtitle
* title
* tooltip
* xAxis
* yAxis
* zAxis

### Additional ChartConfig methods

`addType(chartType: string, seriesData: (Array<Object>|Object)): ChartConfig`

```javascript
// single series
chartConfig.addType('spline', {
 data: [1, 5, 4, 2, 7]
 name: 'Foo'
});

// mltiple series
chartConfig.addType('spline', [
 {
  data: [1, 5, 4, 2, 7]
  name: 'Foo'
 }, {
  data: [5, 2, 7, 3, 4]
  name: 'Bar'
 }
);
```

Add a chart type to the configuration, with the series data provided. You can use an array of objects (standard use per the documentation), or if a single dataset you can simply pass the object for the series.

`get([path: string]): ChartConfig`

```javascript
// get a specific property
const yAxisTitle = chartConfig.get('yAxis.title.text');

// or the whole config
Highcharts.chart('#chart', chartConfig.get());
```

If a path is provided, returns the value on the configuration object at that path, else returns the entire config.

`getType(type: (Array<string>|string)): (Array<Object>|Object)`

```javascript
// single type
const type = chartConfig.getType('spline');

// multiple types
const types = chartConfig.getType(['spline[0]', 'bar']);
```

Get's all matching series objects for the given type(s) and returns them. If only one match is found, returns the object itself, else returns an array of objects.

`remove(path: string): ChartConfig`

```javascript
chartConfig
 .subtitle('x', -20)
 .remove('subtitle.x');
```

Removes the property at the path passed from the configuration and returns a new ChartConfig instance. When using a string, you can use path notation for deeply-nested values.

`removeType(path: string): ChartConfig`

```javascript
chartConfig.removeType('spline[0]');
```

Removes all charts of the type requested from the charts in the configuration. If an index is provided, it removes the chart matching both that type and occurrence order. For example, if you had a chart with three types of `spline`, `bar`, and another `spline`, and you wanted to delete the final `spline`, you would use the key `spline[1]`.

`set(path: (Array<number|string>|Object|string)[, value: any]): ChartConfig`

```javascript
chartConfig.set('yAxis.title.text', 'Foo');
```

Set the value passed at the path provided, or if the path is an object then assigns the key value pairs to the top level of the config

`updateType(path: string, seriesObject: Object): ChartConfig`

```javascript
chartConfig
 .addType('spline', {
  data: [2, 3, 1],
  name: 'Foo'
 })
 .updateType('spline[0]', {
  data: [4, 6, 2]
 });
```

Updates the chart type at the path passed by shallowly merging the seriesObject passed with the existing object. If an index is not specified in the path it will default to the 0 (the first instance of that chart type).

### OptionsConfig

The internal class specific to the configuration used in the `Highcharts.setOptions` method ([more details here](http://api.highcharts.com/highcharts)). An instance of this class is returned when you call `buildConfig.options`.

### Built-in OptionsConfig convenience methods

All convenience methods follow the same paradigm:

`optionsConfig.CONVENIENCE_METHOD(key: (Array<number|string>|Object|string), value: any): OptionsConfig`

If the first parameter is an object or an array, it is a *setter* for the method name property. Returns a new OptionsConfig instance with the updated configuration values.

```javascript
optionsConfig.global({
 useUTC: false
});
```

If there is no second parameter, it is a *getter* of that path. When using a string, you can use path notation for deeply-nested values.

```javascripy
const useUTC = optionsConfig.global('useUTC');
```

If there is a second parameter, it is a *setter* of that value at the location of the first parameter's location. When using a string, you can use path notation for deeply-nested values. Returns a new OptionsConfig instance with the updated configuration values.

```javascript
optionsConfig.global('useUTC', false);
```

The list of available convenience methods:
* global
* lang

### Additional OptionsConfig methods

`get([path: string]): OptionsConfig`

```javascript
const useUTC = optionsConfig.get('global.useUTC');
```

If a path is provided, returns the value on the configuration object at that path, else returns the entire config

`remove(path: string): OptionsConfig`

```javascript
optionsConfig
 .global({
  useUTC: false
 })
 .remove('global.useUTC');
```

Removes the property at the path passed from the configuration and returns a new OptionsConfig instance. When using a string, you can use path notation for deeply-nested values.

`set(path: (Array<number|string>|Object|string)[, value: any]): OptionsConfig`

```javascript
optionsConfig.set('global.useURC', false);
```

Set the value passed at the path provided, or if the path is an object then assigns the key value pairs to the top level of the config
