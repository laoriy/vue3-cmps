import { defineComponent } from 'vue';
import { CommonWidgetPropsDefine } from '../types';
import styles from './index.module.less';

const FormItem = defineComponent({
    name: 'FormItem',
    props: CommonWidgetPropsDefine,
    setup(props, { slots }) {
        return () => {
            const { schema, errors } = props;
            return (
                <div class={styles.container}>
                    <label class={styles.label}>{schema.title}</label>
                    {slots.default?.()}
                    <div class={styles.errorText}>
                        <ul>
                            {errors?.map((err) => (
                                <li>{err}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        };
    },
});
export default FormItem;
// HOC
export function withFormItem(Widget: any) {
    return defineComponent({
        name: `Wrapped${Widget.name}`,
        props: CommonWidgetPropsDefine,
        setup(props, { attrs, slots }) {
            return () => (
                <FormItem {...props}>
                    <Widget {...props} {...attrs} slots={slots} />
                </FormItem>
            );
        },
    }) as any;
}
