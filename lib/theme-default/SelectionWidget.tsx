import { defineComponent, ref, watch } from 'vue';
import { SelectionWidgetPropsDefine } from '../types';

const Selection = defineComponent({
    props: SelectionWidgetPropsDefine,
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
});

export default Selection;
