import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../types';

export default defineComponent({
    props: FiledPropsDefine,
    setup(props) {
        const handleChange = (e: any) => {
            props.onChange(e.target.value);
        };
        return () => <input type="text" value={props.value} onInput={handleChange} />;
    },
});
