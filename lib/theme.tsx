import { isObject } from 'lodash';
import {
    defineComponent,
    PropType,
    inject,
    provide,
    computed,
    ComputedRef,
    ref,
    ExtractPropTypes,
} from 'vue';
import { CommonWidgetDefine, Theme, FiledPropsDefine } from './types';

import { useVJSFContext } from './context';

const THEME_PROVIDER_KEY = Symbol('THEME_PROVIDER_KEY');
const ThemeProvider = defineComponent({
    name: 'VJSFThemeProvider',
    props: {
        theme: {
            type: Object as PropType<Theme>,
            required: true,
        },
    },
    setup(props, { slots }) {
        const context = computed(() => props.theme);
        provide(THEME_PROVIDER_KEY, context);
        return () => slots.default?.();
    },
});

export function getWidget(
    name: keyof Theme['widgets'],
    props?: ExtractPropTypes<typeof FiledPropsDefine>
) {
    const formContext = useVJSFContext();
    if (props) {
        const { uiSchema, schema } = props;
        if (uiSchema?.widget && isObject(uiSchema.widget)) {
            return ref(uiSchema.widget as CommonWidgetDefine);
        }
        if (schema.format) {
            if (formContext.formatMapRef.value[schema.format]) {
                return ref(formContext.formatMapRef.value[schema.format]);
            }
        }
    }

    const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY);
    if (!context) {
        throw new Error('vjsf theme required');
    }

    const widgetRef = computed(() => context.value.widgets[name]);
    return widgetRef;
}

export default ThemeProvider;
