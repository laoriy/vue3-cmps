import { mount } from '@vue/test-utils';
import JsonSchemaForm, { Selection, ArrayField, NumberFiled, StringField } from '../../lib';

describe('ArrayFiled', () => {
    test('should render multi type', () => {
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema: {
                    type: 'array',
                    items: [{ type: 'string' }, { type: 'number' }],
                },
                value: [],
                onChange: () => {},
            },
        });
        const arr = wrapper.findComponent(ArrayField);
        const str = arr.findComponent(StringField);
        const num = arr.findComponent(NumberFiled);
        expect(str.exists()).toBeTruthy();
        expect(num.exists()).toBeTruthy();
    });

    test('should render single type', () => {
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                value: ['1', '2'],
                onChange: () => {},
            },
        });
        const arr = wrapper.findComponent(ArrayField);
        const strs = arr.findAllComponents(StringField);
        expect(strs.length).toBe(2);
        expect(strs[0].props('value')).toBe('1');
    });

    test('should render select', () => {
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['1', '2', '3'],
                    },
                },
                value: [],
                onChange: () => {},
            },
        });
        const arr = wrapper.findComponent(ArrayField);
        const select = arr.findComponent(Selection);
        expect(select.exists()).toBeTruthy();
    });
});
