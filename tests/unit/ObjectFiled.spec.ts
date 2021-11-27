import { mount } from '@vue/test-utils';
import JsonSchemaForm, { StringField, NumberFiled } from '../../lib';

describe('ObjectFiled', () => {
    let schema: any;
    beforeEach(() => {
        schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                age: {
                    type: 'number',
                },
            },
        };
    });

    test('should render properties to current fields', async () => {
        let value: any = {
            name: '123',
        };
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema,
                value: {},
                onChange: (v: any) => {
                    value = v;
                },
            },
        });
        const strField = wrapper.findComponent(StringField);
        // const numField = wrapper.findComponent(NumberFiled);
        // expect(strField.exists()).toBeTruthy();
        await strField.props('onChange')(undefined);
        expect(value.name).toBeUndefined();
        // expect(numField.exists()).toBeTruthy();
    });
    test('should change value when sub fields trigger onChange', async () => {
        let value: any = {};
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema,
                value,
                onChange: (v: any) => {
                    value = v;
                },
            },
        });
        const strField = wrapper.findComponent(StringField);
        const numField = wrapper.findComponent(NumberFiled);
        await strField.props('onChange')('1');
        await numField.props('onChange')(2);

        expect(value.name).toEqual('1');
        expect(value.age).toEqual(2);
    });
});
