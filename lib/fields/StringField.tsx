import { defineComponent, computed } from 'vue';
import { FiledPropsDefine } from '../types';
import { getWidget } from '../theme';

export default defineComponent({
    props: FiledPropsDefine,
    setup(props) {
        const handleChange = (v: any) => {
            props.onChange(v);
        };
        const TextWidgetRef = computed(() => {
            const widgetRef = getWidget('TextWidget', props);
            return widgetRef.value;
        });
        const widgetOptionsRef = computed(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { widget, properties, items, ...rest } = props.uiSchema;
            return rest;
        });
        return () => {
            const TextWidget: any = TextWidgetRef.value;

            // return <input type="text" value={props.value} onInput={handleChange} />;
            return (
                <TextWidget
                    errors={props.errorSchema?.__errors}
                    value={props.value}
                    schema={props.schema}
                    onChange={handleChange}
                    options={widgetOptionsRef.value}
                />
            );
        };
    },
});
