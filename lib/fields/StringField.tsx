import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../types';
import { getWidget } from '../theme';

export default defineComponent({
    props: FiledPropsDefine,
    setup(props) {
        const handleChange = (v: any) => {
            props.onChange(v);
        };
        const TextWidgetRef = getWidget('TextWidget');
        return () => {
            const TextWidget: any = TextWidgetRef.value;

            // return <input type="text" value={props.value} onInput={handleChange} />;
            return (
                <TextWidget
                    errors={props.errorSchema?.__errors}
                    value={props.value}
                    schema={props.schema}
                    onChange={handleChange}
                />
            );
        };
    },
});
