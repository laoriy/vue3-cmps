const Ajv = require('ajv');
const localize = require("ajv-i18n")
const addFormats = require("ajv-formats")
const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
require("ajv-errors")(ajv /*, {singleError: true} */)
addFormats(ajv)

ajv.addKeyword({
    keyword: "test",
    macro: () => ({ minLength: 10 }),
    metaSchema: {
        type: 'boolean'
    }
})
const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string', minLength: 10
        },
        age: { type: 'number' },
        pets: {
            type: "array",
            items: {
                type: "string"
            }
        },
        isWorker: {
            type: "boolean"
        },

    },
    errorMessage: {
        properties: {
            name: "name 是不对的",
        },
    },
    additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
    name: 'hah',
    age: 28,
    isWorker: false
}

const valid = validate(data)
if (!valid) {
    console.log(validate.errors) // processed errors
}
