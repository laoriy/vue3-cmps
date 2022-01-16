import { defineComponent } from 'vue';
import { CommonWidgetPropsDefine } from '../types';
import { withFormItem } from './FormItem';

export default withFormItem(
    defineComponent({
        props: CommonWidgetPropsDefine,
        setup(props) {
            const handleChange = (e: any) => {
                const value = e.target.value;
                const num = Number(value);
                console.log(value, num, '--');

                if (Number.isNaN(num)) {
                    props.onChange(undefined);
                } else {
                    props.onChange(num);
                }
            };

            return () => <input type="number" value={props.value} onInput={handleChange} />;
        },
    })
);
