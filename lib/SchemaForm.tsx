import {
    defineComponent,
    PropType,
    provide,
    Ref,
    shallowRef,
    ref,
    watch,
    watchEffect,
    computed,
} from 'vue';
import Ajv, { Options } from 'ajv';
import { CommonWidgetDefine, CustomFormat, CustomKeyword, Schema, UISchema } from './types';
import SchemaItem from './SchemaItem';
import { SchemaFormContextKey } from './context';
import { ErrorSchema, validateFormData } from './validator';

interface ContextRef {
    doValidate: () => ReturnType<typeof validateFormData>;
}

const defaultAjvOptions: Options = {
    allErrors: true,
};
export default defineComponent({
    props: {
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
        contextRef: {
            type: Object as PropType<Ref<ContextRef>>,
        },
        ajvOptions: {
            type: Object as PropType<Options>,
        },
        locale: {
            type: String,
            default: 'zh',
        },
        customValidate: {
            type: Function as PropType<(data: any, errors: any) => void>,
        },
        customKeywords: {
            type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
        },
        customFormats: {
            type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
        },
        uiSchema: {
            type: Object as PropType<UISchema>,
        },
    },
    name: 'SchemaForm',
    setup(props) {
        const handleChange = (v: any) => {
            props.onChange(v);
        };

        const formatMapRef = computed(() => {
            if (props.customFormats) {
                const customFormats = Array.isArray(props.customFormats)
                    ? props.customFormats
                    : [props.customFormats];
                return customFormats.reduce((result, format) => {
                    result[format.name] = format.component;
                    return result;
                }, {} as { [key: string]: CommonWidgetDefine });
            }
            return {};
        });
        const transformSchemaRef = computed(() => {
            if (props.customKeywords) {
                const customKeywords = Array.isArray(props.customKeywords)
                    ? props.customKeywords
                    : [props.customKeywords];

                return (schema: Schema) => {
                    let newSchema = schema;
                    customKeywords.forEach((keyword) => {
                        if ((newSchema as any)[keyword.name]) {
                            newSchema = keyword.transformSchema(schema);
                        }
                    });
                    return newSchema;
                };
            }
            return (s: Schema) => s;
        });
        const context = {
            SchemaItem,
            formatMapRef,
            transformSchemaRef,
            // theme: props.theme,
        };
        const errorSchemaRef: Ref<ErrorSchema | undefined> = shallowRef();

        const validatorRef: Ref<Ajv> = shallowRef() as any;

        const validateResolveRef = ref();
        const validateIndex = ref(0);

        const doValidate = async () => {
            console.log('start--->');

            const index = (validateIndex.value += 1);
            const { value, schema, locale, customValidate } = props;
            const result = await validateFormData(
                validatorRef.value,
                value,
                schema,
                locale,
                customValidate
            );

            if (index !== validateIndex.value) return;
            console.log('end--->');

            errorSchemaRef.value = result.errorSchema;
            validateResolveRef.value(result);
            validateResolveRef.value = undefined;
        };
        watch(
            () => props.value,
            () => {
                if (validateResolveRef.value) {
                    doValidate();
                }
            },
            {
                deep: true,
            }
        );

        watchEffect(() => {
            validatorRef.value = new Ajv({
                ...defaultAjvOptions,
                ...props.ajvOptions,
            });

            if (props.customFormats) {
                const customFormats = Array.isArray(props.customFormats)
                    ? props.customFormats
                    : [props.customFormats];
                customFormats.forEach((format) => {
                    validatorRef.value.addFormat(format.name, format.definition);
                });
            }
            if (props.customKeywords) {
                const customKeywords = Array.isArray(props.customKeywords)
                    ? props.customKeywords
                    : [props.customKeywords];
                customKeywords.forEach((keyword) => {
                    validatorRef.value.addKeyword(keyword.name, keyword.definition as any);
                });
            }
        });

        watch(
            () => props.contextRef,
            () => {
                if (props.contextRef) {
                    const { contextRef } = props;
                    contextRef.value = {
                        async doValidate() {
                            // const { value, schema, locale, customValidate } = props;
                            // const result = await validateFormData(
                            //     validatorRef.value,
                            //     value,
                            //     schema,
                            //     locale,
                            //     customValidate
                            // );
                            // errorSchemaRef.value = result.errorSchema;

                            // return result;
                            return new Promise((resolve) => {
                                validateResolveRef.value = resolve;
                            });
                        },
                    };
                }
            },
            { immediate: true }
        );

        provide(SchemaFormContextKey, context);

        return () => {
            const { schema, value, uiSchema } = props;

            return (
                <SchemaItem
                    schema={schema}
                    rootSchema={schema}
                    value={value}
                    onChange={handleChange}
                    uiSchema={uiSchema || {}}
                    errorSchema={errorSchemaRef.value || ({} as ErrorSchema)}
                />
            );
        };
    },
});
