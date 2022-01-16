export default {
    name: 'Demo',
    schema: {
        type: 'object',
        properties: {
            pass1: {
                title: 'password',
                type: 'string',
                minLength: 10,
            },
            pass2: {
                title: 're try password',
                type: 'string',
                minLength: 10,
            },
        },
    },
    async customValidate(data: any, errors: any) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                if (data.pass1 !== data.pass2) {
                    errors.pass2.addError('密码必须相同');
                }
                resolve();
            }, 2000);
        });
    },
    uiSchema: {},
    default: {},
};
