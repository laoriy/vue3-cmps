import { inject } from 'vue';
import { CommonFieldType } from './types';

export const SchemaFormContextKey = Symbol('SchemaFormContextKey');

export function useVJSFContext() {
    const context: { SchemaItem: CommonFieldType } | undefined = inject(SchemaFormContextKey);
    if (!context) {
        throw Error('SchemaForm should be used');
    }
    return context;
}
