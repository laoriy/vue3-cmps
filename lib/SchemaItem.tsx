import { computed, defineComponent } from 'vue';
import { SchemaTypes, FiledPropsDefine } from './types';
import StringField from './fields/StringField';
import NumberFields from './fields/NumberFields';
import { retrieveSchema } from './utils';
import ObjectField from './fields/ObjectField';
import ArrayField from './fields/ArrayField';

const SchemaItem = defineComponent({
    name: 'SchemaItem',
    props: FiledPropsDefine,
    setup(props) {
        const retrieveSchemaRef = computed(() => {
            const { schema, rootSchema, value } = props;
            return retrieveSchema(schema, rootSchema, value);
        });
        return () => {
            const { schema } = props;
            const retrieveSchemaData = retrieveSchemaRef.value;
            // TODO:猜测类型
            const type = schema.type;
            let Component: any;
            switch (type) {
                case SchemaTypes.STRING: {
                    Component = StringField;
                    break;
                }

                case SchemaTypes.NUMBER: {
                    Component = NumberFields;
                    break;
                }

                case SchemaTypes.OBJECT: {
                    Component = ObjectField;
                    break;
                }

                case SchemaTypes.ARRAY: {
                    Component = ArrayField;
                    break;
                }

                default: {
                    console.warn(`${type} is not supported`);
                }
            }
            return <Component {...props} schema={retrieveSchemaData} />;
        };
    },
});

export default SchemaItem;
