/**
 * @copyright   2010-2017, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import { default as BaseGate } from '../Gateway/Gate';
import Toast from './Toast';
import { positions } from '../../propTypes';
import MODULE from './module';

export default class Gate extends BaseGate {
  static module = MODULE;

  static defaultProps = {
    ...BaseGate.defaultProps,
    contract: Toast,
    position: 'bottom-left',
  };

  static propTypes = {
    ...BaseGate.propTypes,
    animation: PropTypes.oneOf([
      'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
    ]),
    position: positions,
  };

  render() {
    const { animation, position } = this.props;

    return (
      <aside
        role="log"
        className={this.formatChildClass('gate', animation, position)}
        aria-relevant="additions"
        aria-hidden="false"
      >
        {this.renderChildren(this.state.children)}
      </aside>
    );
  }
}
