import { defineComponent, PropType } from 'vue';
import JsonSchemaForm, { Schema, ThemeProvider } from '../../lib';
import theme from '../../lib/theme-default';

export const ThemeDefaultProvider = defineComponent({
    setup(_props, { slots }) {
        return () => <ThemeProvider theme={theme}>{slots.default?.()}</ThemeProvider>;
    },
});

export default defineComponent({
    name: 'TestComponent',
    props: {
        schema: {
            type: Object as PropType<Schema>,
            required: true,
        },
        value: {
            required: true,
        },
        onChange: {
            type: Function as PropType<(v: any) => void>,
            required: true,
        },
    },
    setup(props) {
        return () => (
            <ThemeDefaultProvider>
                <JsonSchemaForm {...props} />
            </ThemeDefaultProvider>
        );
    },
});
