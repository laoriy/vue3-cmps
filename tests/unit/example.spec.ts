import { mount } from '@vue/test-utils';
import JsonSchemaForm, { NumberFiled } from '../../lib';

describe('JsonSchemaForm', () => {
    it('renders props.msg when passed', async () => {
        let value = '';
        const wrapper = mount(JsonSchemaForm, {
            props: {
                schema: {
                    type: 'number',
                },
                value: '',
                onChange: (v: string) => {
                    value = v;
                    console.log(value);
                },
            },
        });

        const numberFiled = wrapper.findComponent(NumberFiled);
        expect(numberFiled.exists()).toBeTruthy();

        const input = numberFiled.find('input');
        input.element.value = '123';
        input.trigger('input');
        expect(value).toBe(123);
    });
});
