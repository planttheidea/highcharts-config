# highcharts-config

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

### Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Summary](#summary)
* [API](#api)
* [Development](#development)

### Installation

**yarn**

```
$ yarn add highcharts-config
```

**npm**

```
$ npm i highcharts-config --save
```

### Usage

```javascript
import buildConfig from 'highcharts-config';

const config = buildConfig()
    // use shorthand methods to set properties on the object
    .title('text', 'My fancy chart')
    .colors([
      'red',
      'yellow',
      'blue',
      'green'
    ])
    // then add types of charts
    .addType('spline', {
      data: [3, 5, 6, 2, 10, 7],
      name: 'Average'
    })
    .addType('column', {
        name: 'Total',
        data: [
            {name: 'Foo', y: 13}, 
            {name: 'Bar', y: 23}, 
            {name: 'Baz', y: 19}
        ],
    })
    // finally, retrieve the built config
    .get();
```

### Summary

Highcharts is a fantastic charting library, but it's configuration can be daunting and confusing. `highcharts-config` tries to simplify this process with a natural API and a focus on reusability. There are chainable convenience methods for both chart and global options configurations, and each step in the chain returns a new instance so it can be stored and reused.

It should be noted that while the construct of immutability is applied when updating the configurations, it is not rigidly enforced (Highcharts barks when the configuration is deeply frozen). This means you can mutate the configuration directly without the use of the API, however it is highly discouraged.

### API

Check out the [API page](API.md) for complete information.

### Development

Standard stuff, clone the repo and `yarn` / `npm install` dependencies. The npm scripts available:
* `build` => run webpack to build development `dist` file with NODE_ENV=development
* `build:minifed` => run webpack to build production `dist` file with NODE_ENV=production
* `dev` => run webpack dev server to run example app (playground)
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `prepublish:compile`
* `prepublish:compile` => run `lint`, `test:coverage`, `transpile`, `build`, and `build:minified`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` but with `nyc` for coverage checker
* `test:watch` => run `test`, but with persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`

