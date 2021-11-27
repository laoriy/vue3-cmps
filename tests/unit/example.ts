import { mount } from '@vue/test-utils';
import JsonSchemaForm, { NumberFiled } from '../../lib';

describe('JsonSchemaForm', () => {
    beforeEach(() => {
        console.log('beforeEach');
    });
    afterEach(() => {
        console.log('afterEach');
    });

    beforeAll(() => {
        console.log('beforeAll');
    });

    afterAll(() => {
        console.log('afterAll');
    });
    test('renders props.msg when passed', async () => {
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

        /**
         * 异步测试方式
         * 1.async  await
         * 2.return new Promise()
         * 3.done 参数
         */
    });
    // test('should work', () => {
    //     expect(1 + 1).toBe(2);
    // });
});
