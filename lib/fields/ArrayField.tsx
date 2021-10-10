import { defineComponent } from 'vue';
import { useVJSFContext } from '../context';
import { FiledPropsDefine, Schema } from '../types';
import ArrayItemWrapper from './compontents/ArrayItemWrapper';
import SelectionWidget from '../widgets/Selection';
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

        return () => {
            const { schema, rootSchema, value } = props;
            const schemaItems = schema.items;
            const isMultitype = Array.isArray(schemaItems);
            const isSelect = schema.items && (schema.items as any).enum;
            const SchemaItem = context.SchemaItem;

            if (isMultitype) {
                const arr = Array.isArray(value) ? value : [];
                return (schemaItems as Schema[]).map((s: Schema, index: number) => (
                    <SchemaItem
                        schema={s}
                        key={index}
                        rootSchema={rootSchema}
                        value={arr[index]}
                        onChange={(v: any) => {
                            handleArrayItemchange(v, index);
                        }}
                    />
                ));
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
                            schema={schema.items as Schema}
                            value={v}
                            key={index}
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
                <SelectionWidget onChange={props.onChange} value={props.value} options={options} />
            );
        };
    },
});
