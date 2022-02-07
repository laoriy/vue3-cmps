import { computed, defineComponent } from 'vue';
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types';
import { withFormItem } from './FormItem';

const TextWidget: CommonWidgetDefine = withFormItem(
    defineComponent({
        props: CommonWidgetPropsDefine,
        setup(props) {
            const handleChange = (e: any) => {
                props.onChange(e.target.value);
            };

            const styleRef = computed(() => ({
                color: props.options?.color || 'black',
            }));
            return () => (
                <div>
                    <input
                        type="text"
                        style={styleRef.value}
                        value={props.value}
                        onInput={handleChange}
                    />
                </div>
            );
        },
    })
);

export default TextWidget;
