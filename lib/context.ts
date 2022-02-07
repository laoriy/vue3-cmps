import { CommonWidgetDefine } from 'lib';
import { inject, Ref } from 'vue';
import { CommonFieldType, Schema } from './types';

export const SchemaFormContextKey = Symbol('SchemaFormContextKey');

export function useVJSFContext() {
    const context:
        | {
              SchemaItem: CommonFieldType;
              formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>;
              transformSchemaRef: Ref<(schema: Schema) => Schema>;
          }
        | undefined = inject(SchemaFormContextKey);
    if (!context) {
        throw Error('SchemaForm should be used');
    }
    return context;
}
