// classes
import Config from './Config';

// constants
import {
  GLOBAL_CONVENIENCE_METHOD_NAMES
} from '../constants';

// utils
import {
  createPropertyConvenienceMethod
} from '../utils';

/**
 * @module classes/GlobalConfig
 */

/**
 * @class GlobalConfig
 * @classdesc configuration object builder for global options
 */
class GlobalConfig extends Config {}

GLOBAL_CONVENIENCE_METHOD_NAMES.forEach((method) => {
  Object.defineProperty(GlobalConfig.prototype, method, {
    configurable: false,
    enumerable: false,
    value: createPropertyConvenienceMethod(method),
    writable: true
  });
});

export default GlobalConfig;
