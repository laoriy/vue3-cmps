import { defineComponent } from 'vue';
import { useVJSFContext } from '../context';
import { FiledPropsDefine, Schema } from '../types';
import ArrayItemWrapper from './compontents/ArrayItemWrapper';
import { getWidget } from '../theme';
// import SelectionWidget from '../widgets/Selection';
/**
 * {
 *  items: { type:string }
 * }
 *
 *{
 *
 *   items: [
 *     { type:string },
 *     { type:number }
 *   ]
 * }
 *
 * { items: { type:string }, enum:['1','2']  }
 *
 */

export default defineComponent({
    name: 'ArrayField',
    props: FiledPropsDefine,
    setup(props) {
        const context = useVJSFContext();
        const handleArrayItemchange = (v: any, index: number) => {
            const arr = Array.isArray(props.value) ? props.value : [];
            arr[index] = v;
            props.onChange(arr);
        };

        const handelAdd = (index: number) => {
            const arr = Array.isArray(props.value) ? props.value : [];
            arr.splice(index + 1, 0, undefined);
            props.onChange(arr);
        };
        const handleDelete = (index: number) => {
            const arr = Array.isArray(props.value) ? props.value : [];
            arr.splice(index, 1);
            props.onChange(arr);
        };

        const handleUp = (index: number) => {
            if (index === 0) return;
            const arr = Array.isArray(props.value) ? props.value : [];
            const item = arr.splice(index, 1);
            arr.splice(index - 1, 0, item[0]);
            props.onChange(arr);
        };
        const handleDown = (index: number) => {
            const arr = Array.isArray(props.value) ? props.value : [];
            if (index === arr.length - 1) return;
            const item = arr.splice(index, 1);
            arr.splice(index + 1, 0, item[0]);
            props.onChange(arr);
        };
        const SelectionWidgetRef = getWidget('SelectionWidget');

        return () => {
            const { schema, rootSchema, value, errorSchema, uiSchema } = props;
            const schemaItems = schema.items;
            const isMultitype = Array.isArray(schemaItems);
            const isSelect = schema.items && (schema.items as any).enum;
            const SchemaItem = context.SchemaItem;
            // const SelectionWidget = context.theme.widgets.SelectionWidget;
            const SelectionWidget: any = SelectionWidgetRef.value;
            if (isMultitype) {
                const arr = Array.isArray(value) ? value : [];
                return (schemaItems as Schema[]).map((s: Schema, index: number) => {
                    const itemsUISchema = uiSchema.items;
                    const uiS = Array.isArray(itemsUISchema)
                        ? itemsUISchema[index] || {}
                        : itemsUISchema || {};
                    return (
                        <SchemaItem
                            schema={s}
                            uiSchema={uiS}
                            key={index}
                            rootSchema={rootSchema}
                            errorSchema={errorSchema}
                            value={arr[index]}
                            onChange={(v: any) => {
                                handleArrayItemchange(v, index);
                            }}
                        />
                    );
                });
            }
            if (!isSelect) {
                const arr = Array.isArray(value) ? value : [];
                return arr.map((v: any, index: number) => (
                    <ArrayItemWrapper
                        index={index}
                        onAdd={handelAdd}
                        onDelete={handleDelete}
                        onUp={handleUp}
                        onDown={handleDown}
                    >
                        <SchemaItem
                            uiSchema={(uiSchema.items as any) || {}}
                            schema={schema.items as Schema}
                            value={v}
                            key={index}
                            errorSchema={errorSchema[index] || {}}
                            rootSchema={rootSchema}
                            onChange={(vv: any) => handleArrayItemchange(vv, index)}
                        />
                    </ArrayItemWrapper>
                ));
            }
            const enumOptions = (schema as any).items.enum;
            const options = enumOptions.map((e: any) => ({
                key: e,
                value: e,
            }));

            return (
                <SelectionWidget
                    errors={errorSchema.__errors}
                    onChange={props.onChange}
                    value={props.value}
                    options={options}
                    schema={props.schema}
                />
            );
        };
    },
});
