/**
 * @copyright   2010-2017, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import { PropTypes } from 'react';
import MODULE from './module';

export const shape = Object.freeze({
  expanded: PropTypes.bool.isRequired,
  hideOverlay: PropTypes.func.isRequired,
  showOverlay: PropTypes.func.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
});

export default {
  [MODULE.contextKey]: PropTypes.shape(shape).isRequired,
};
