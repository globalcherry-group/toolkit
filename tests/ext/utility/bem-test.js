import Titon from '../../../src/Titon';
import bem from '../../../src/ext/utility/bem';

describe('ext/utility/bem()', () => {
    it('should generate a class name', () => {
        expect(bem('foo')).toBe('foo');
        expect(bem('foo', 'bar')).toBe('foo-bar');
        expect(bem('foo', 'bar', 'baz')).toBe('foo-bar--baz');
        expect(bem('foo', '', 'baz')).toBe('foo--baz');
    });

    it('should be able to customize separators', () => {
        Titon.options.elementSeparator = '__';
        Titon.options.modifierSeparator = '---';

        expect(bem('foo')).toBe('foo');
        expect(bem('foo', 'bar')).toBe('foo__bar');
        expect(bem('foo', 'bar', 'baz')).toBe('foo__bar---baz');
        expect(bem('foo', '', 'baz')).toBe('foo---baz');

        Titon.options.elementSeparator = '-';
        Titon.options.modifierSeparator = '--';
    });

    it('should prepend the `namespace`', () => {
        Titon.options.namespace = 'tk-';

        expect(bem('foo', 'bar')).toBe('tk-foo-bar');

        Titon.options.namespace = '';
    });
});