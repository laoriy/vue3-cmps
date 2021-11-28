import { defineComponent } from 'vue';
import { CommonWidgetPropsDefine } from '../types';

export default defineComponent({
    props: CommonWidgetPropsDefine,
    setup(props) {
        const handleChange = (e: any) => {
            props.onChange(e.target.value);
        };
        return () => <input type="text" value={props.value} onInput={handleChange} />;
    },
});
