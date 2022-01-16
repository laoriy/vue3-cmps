import { defineComponent, PropType, provide, Ref, shallowRef, ref, watch, watchEffect } from 'vue';
import Ajv, { Options } from 'ajv';
import { Schema } from './types';
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
    },
    name: 'SchemaForm',
    setup(props) {
        const handleChange = (v: any) => {
            props.onChange(v);
        };
        const context = {
            SchemaItem,
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
            const { schema, value } = props;

            return (
                <SchemaItem
                    schema={schema}
                    rootSchema={schema}
                    value={value}
                    onChange={handleChange}
                    errorSchema={errorSchemaRef.value || ({} as ErrorSchema)}
                />
            );
        };
    },
});
