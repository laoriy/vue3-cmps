import { defineComponent } from 'vue';
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types';
import { withFormItem } from './FormItem';

const TextWidget: CommonWidgetDefine = withFormItem(
    defineComponent({
        props: CommonWidgetPropsDefine,
        setup(props) {
            const handleChange = (e: any) => {
                props.onChange(e.target.value);
            };
            return () => (
                <div>
                    <input type="text" value={props.value} onInput={handleChange} />
                </div>
            );
        },
    })
);

export default TextWidget;
