import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../types';

export default defineComponent({
    props: FiledPropsDefine,
    setup(props) {
        const handleChange = (e: any) => {
            const value = e.target.value;
            const num = Number(value);

            if (Number.isNaN(num)) {
                props.onChange(undefined);
            } else {
                props.onChange(num);
            }
        };

        return () => <input type="number" value={props.value} onInput={handleChange} />;
    },
});
