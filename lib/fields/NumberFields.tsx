import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../types';
import { getWidget } from '../theme';

export default defineComponent({
    props: FiledPropsDefine,
    setup(props) {
        const handleChange = (v: any) => {
            props.onChange(v);
        };

        const NumberWidgetRef = getWidget('NumberWidget');

        return () => {
            const NumberWidget: any = NumberWidgetRef.value;
            return <NumberWidget value={props.value} onChange={handleChange} />;
        };
    },
});
