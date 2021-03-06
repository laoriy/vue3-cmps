import { defineComponent, PropType, ref, watch } from 'vue';
import { withFormItem } from './FormItem';

export default withFormItem(
    defineComponent({
        props: {
            value: {},
            onChange: {
                type: Function as PropType<(v: any) => void>,
                required: true,
            },
            options: {
                required: true,
                type: Array as PropType<{ key: string; value: any }[]>,
            },
            errors: {
                type: Array as PropType<string[]>,
            },
        },
        setup(props) {
            const currentValueRef = ref(props.value);
            watch(currentValueRef, (newV) => {
                if (newV !== props.value) {
                    props.onChange(newV);
                }
            });

            watch(
                () => props.value,
                (v) => {
                    if (v !== currentValueRef.value) {
                        currentValueRef.value = v;
                    }
                }
            );

            return () => (
                <select multiple={true} v-model={currentValueRef.value}>
                    {props.options.map((op) => (
                        <option value={op.value}>{op.key}</option>
                    ))}
                </select>
            );
        },
    })
);
