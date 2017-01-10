// classes
import Config from './Config';

// constants
import {
  OPTIONS_CONVENIENCE_METHOD_NAMES
} from '../constants';

/**
 * @module classes/OptionsConfig
 */

/**
 * @class OptionsConfig
 * @classdesc configuration object builder for global options
 */
class OptionsConfig extends Config {}

OPTIONS_CONVENIENCE_METHOD_NAMES.forEach(OptionsConfig.addMethod(OptionsConfig));

export default OptionsConfig;
