/**
 * @copyright   2010-2015, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

'use strict';

import { transitionEnd } from '../event';
import { forOwn } from '../object';
import '../../polyfills/request-animation-frame';

export default class Container {
    element = null;

    queue = {};

    constructor(element) {
        this.element = element;
        this.resetQueue();
    }

    /**
     * Add a class to the element.
     *
     * @param {string} className
     * @returns {Container}
     */
    addClass(className) {
        this.queue.addClass = className;

        return this;
    }

    /**
     * Conceal the element by applying the `hide` class.
     * Should be used to trigger transitions and animations.
     *
     * @param {boolean} [dontHide]
     * @returns {Container}
     */
    conceal(dontHide) {
        if (this.hasClass('show') && !dontHide) {
            transitionEnd(this, () => this.setStyle('display', 'none').write());
        }

        return this
            .removeClass('show')
            .addClass('hide')
            .setAria('hidden', true);
    }

    /**
     * Return a list of methods to copy to the `Collection` prototype.
     *
     * @returns {string[]}
     */
    static getCollectionMethods() {
        return [
            'addClass', 'hasClass', 'removeClass', 'conceal', 'reveal', 'write',
            'setAria', 'setArias', 'setAttribute', 'setAttributes', 'setStyle', 'setStyles'
        ];
    }

    /**
     * Verify that a class exists on the element.
     *
     * @param {string} className
     * @returns {Container}
     */
    hasClass(className) {
        return this.element.classList.contains(className);
    }

    /**
     * Process the current container queue by looping over every element in the collection
     * and mutating it based on the items in the queue.
     *
     * @returns {Container}
     */
    processQueue() {
        let queue = this.queue,
            element = this.element;

        // Exit early if no element
        if (!element) {
            throw new Error('No element in container to process queue for');
        }

        // Loop over each mutation and process
        forOwn(queue, (key, value) => {
            switch (key) {
                case 'addClass':
                    element.classList.add(value);
                break;
                case 'removeClass':
                    element.classList.remove(value);
                break;
                case 'attributes':
                    forOwn(value, element.setAttribute);
                break;
                case 'styles':
                    forOwn(value, (k, v) => element.style[k] = v);
                break;
            }
        });

        // Reset the queue
        this.resetQueue();

        return this;
    }

    /**
     * Remove a class from the element.
     *
     * @param {string} className
     * @returns {Container}
     */
    removeClass(className) {
        this.queue.removeClass = className;

        return this;
    }

    /**
     * Reset the current queue.
     *
     * @returns {Container}
     */
    resetQueue() {
        this.queue = {
            attributes: {},
            styles: {}
        };

        return this;
    }

    /**
     * Reveal the element by applying the show class.
     * Should be used to trigger transitions and animations.
     *
     * @param {boolean} [dontShow]
     * @returns {Container}
     */
    reveal(dontShow) {
        if (!dontShow) {
            this.setStyle('display', '');
        }

        return this
            .removeClass('hide')
            .addClass('show')
            .setAria('hidden', false);
    }

    /**
     * Set a value for a defined ARIA attribute.
     * If ARIA is disabled globally, this will do nothing.
     *
     * @param {string} key
     * @param {*} value
     * @returns {Container}
     */
    setAria(key, value) {
        if (!Toolkit.aria) {
            return this;
        }

        if (key === 'toggled') {
            return this.setArias({
                expanded: value,
                selected: value
            });
        }

        return this.setAttribute('aria-' + key, String(value));
    }

    /**
     * Set multiple ARIA attributes.
     *
     * @param {object} keys
     * @returns {Container}
     */
    setArias(keys) {
        forOwn(keys, this.setAria);

        return this;
    }

    /**
     * Set a value for an HTML/DOM attribute.
     *
     * @param {string} attribute
     * @param {*} value
     * @returns {Container}
     */
    setAttribute(attribute, value) {
        this.queue.attributes[attribute] = value;

        return this;
    }

    /**
     * Set multiple HTML/DOM attributes.
     *
     * @param {object} attributes
     * @returns {Container}
     */
    setAttributes(attributes) {
        forOwn(attributes, this.setAttribute);

        return this;
    }

    /**
     * Set a value for a CSS property.
     *
     * @param {string} property
     * @param {*} value
     * @returns {Container}
     */
    setStyle(property, value) {
        this.queue.styles[property] = value;

        return this;
    }

    /**
     * Set multiple CSS properties.
     *
     * @param {object} properties
     * @returns {Container}
     */
    setStyles(properties) {
        forOwn(properties, this.setStyle);

        return this;
    }

    /**
     * Write the current queue to the rendering loop using `requestAnimationFrame`.
     *
     * @returns {Container}
     */
    write() {
        requestAnimationFrame(this.processQueue);

        return this;
    }
}