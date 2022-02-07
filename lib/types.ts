import { PropType, defineComponent, DefineComponent } from 'vue';
import { FormatDefinition, KeywordDefinition } from 'ajv';
import { ErrorSchema } from './validator';

export enum SchemaTypes {
    'NUMBER' = 'number',
    'INTEGER' = 'integer',
    'STRING' = 'string',
    'OBJECT' = 'object',
    'ARRAY' = 'array',
    'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string };

// type Schema = any
export interface Schema {
    type?: SchemaTypes | string;
    const?: any;
    format?: string;

    title?: string;
    default?: any;

    properties?: {
        [key: string]: Schema;
    };
    items?: Schema | Schema[] | SchemaRef;
    uniqueItems?: any;
    dependencies?: {
        [key: string]: string[] | Schema | SchemaRef;
    };
    oneOf?: Schema[];
    anyOf?: Schema[];
    allOf?: Schema[];
    // TODO: uiSchema
    // vjsf?: VueJsonSchemaConfig
    required?: string[];
    enum?: any[];
    enumNames?: any[];
    enumKeyValue?: any[];
    additionalProperties?: any;
    additionalItems?: Schema;

    minLength?: number;
    maxLength?: number;
    minimun?: number;
    maximum?: number;
    multipleOf?: number;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
}
export const CommonWidgetPropsDefine = {
    value: {},
    onChange: {
        type: Function as PropType<(v: any) => void>,
        required: true,
    },
    errors: {
        type: Array as PropType<string[]>,
    },
    schema: {
        type: Object as PropType<Schema>,
        required: true,
    },
    options: {
        type: Object as PropType<{ [key: string]: any }>,
    },
} as const;
export const SelectionWidgetPropsDefine = {
    ...CommonWidgetPropsDefine,
    options: {
        required: true,
        type: Array as PropType<{ key: string; value: any }[]>,
    },
} as const;
export type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine, {}, {}>;
export type SelectionWidgetDefine = DefineComponent<typeof SelectionWidgetPropsDefine, {}, {}>;

export interface UISchema {
    widget?: string | CommonWidgetDefine;
    properties?: {
        [key: string]: UISchema;
    };
    items?: UISchema | UISchema[];
    [key: string]: any;
}
export const FiledPropsDefine = {
    schema: {
        type: Object as PropType<Schema>,
        required: true,
    },
    value: {
        required: true,
    },
    onChange: {
        type: Function as PropType<(v: any) => void>,
        required: true,
    },
    rootSchema: {
        type: Object as PropType<Schema>,
        required: true,
    },
    errorSchema: {
        type: Object as PropType<ErrorSchema>,
        required: true,
    },
    uiSchema: {
        type: Object as PropType<UISchema>,
        required: true,
    },
} as const;

export const TypeHelperComponent = defineComponent({
    props: FiledPropsDefine,
});

export type CommonFieldType = typeof TypeHelperComponent;
export interface Theme {
    widgets: {
        SelectionWidget: SelectionWidgetDefine;
        TextWidget: CommonWidgetDefine;
        NumberWidget: CommonWidgetDefine;
    };
}
export interface CustomFormat {
    name: string;
    definition: FormatDefinition<string>;
    component: CommonWidgetDefine;
}

export interface CustomKeyword {
    name: string;
    definition: Partial<KeywordDefinition>;
    transformSchema: (originSchema: Schema) => Schema;
}
