<script lang="tsx">
import { defineComponent, Ref, ref, reactive, watchEffect } from 'vue';
import MonacoEditor from './components/MonacoEditor.vue';
import SchemaForm, { ThemeProvider } from '../lib';
import themeDefault from '../lib/theme-default/index';
import demos from './demos';

// const schemaData = {
//     type: 'string',
// };

type Schema = any;
type UISchema = any;

function toJson(data: any) {
    return JSON.stringify(data, null, 2);
}

export default defineComponent({
    components: { MonacoEditor, SchemaForm },
    setup() {
        const selectedRef: Ref<number> = ref(0);

        const demo: {
            schema: Schema | null;
            data: any;
            uiSchema: UISchema | null;
            schemaCode: string;
            dataCode: string;
            uiSchemaCode: string;
        } = reactive({
            schema: null,
            data: {},
            uiSchema: {},
            schemaCode: '',
            dataCode: '',
            uiSchemaCode: '',
        });

        watchEffect(() => {
            const index = selectedRef.value;
            const d = demos[index];
            demo.schema = d.schema;
            demo.data = d.default;
            demo.uiSchema = d.uiSchema;
            demo.schemaCode = toJson(d.schema);
            demo.dataCode = toJson(d.default);
            demo.uiSchemaCode = toJson(d.uiSchema);
        });

        const methodRef: Ref<any> = ref();

        const handleChange = (v: any) => {
            demo.data = v;
            demo.dataCode = toJson(v);
        };

        function handleCodeChange(filed: 'schema' | 'data' | 'uiSchema', value: string) {
            try {
                const json = JSON.parse(value);
                demo[filed] = json;
                (demo as any)[`${filed}Code`] = value;
            } catch (err) {
                // some thing
            }
        }

        const handleSchemaChange = (v: string) => handleCodeChange('schema', v);
        const handleDataChange = (v: string) => handleCodeChange('data', v);
        const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

        return () => {
            const selected = selectedRef.value;

            console.log(methodRef);

            return (
                // <StyleThemeProvider>
                // <VJSFThemeProvider theme={theme as any}>
                <div class="container">
                    <div class="menu">
                        <h1>Vue3 JsonSchema Form</h1>
                        <div>
                            {demos.map((demoItem, index) => (
                                <button
                                    class={{
                                        menuButton: true,
                                        menuSelected: index === selected,
                                    }}
                                    onClick={() => {
                                        selectedRef.value = index;
                                    }}
                                >
                                    {demoItem.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class="content">
                        <div class="code">
                            <MonacoEditor
                                code={demo.schemaCode}
                                class="codePanel"
                                onChange={handleSchemaChange}
                                title="Schema"
                            />
                            <div class="uiAndValue">
                                <MonacoEditor
                                    code={demo.uiSchemaCode}
                                    class="codePanel"
                                    onChange={handleUISchemaChange}
                                    title="UISchema"
                                />
                                <MonacoEditor
                                    code={demo.dataCode}
                                    class="codePanel"
                                    onChange={handleDataChange}
                                    title="Value"
                                />
                            </div>
                        </div>
                        <div class="form">
                            <ThemeProvider theme={themeDefault}>
                                <SchemaForm
                                    schema={demo.schema}
                                    onChange={handleChange}
                                    value={demo.data}
                                />
                            </ThemeProvider>
                            {/* <SchemaForm
                schema={demo.schema!}
                uiSchema={demo.uiSchema!}
                onChange={handleChange}
                contextRef={methodRef}
                value={demo.data}
              /> */}
                        </div>
                    </div>
                </div>
                // </VJSFThemeProvider>
                // </StyleThemeProvider>
            );
        };
    },
});
</script>

<style lang="less" scoped>
.codePanel {
    min-height: 400px;
    margin-bottom: 20px;
}
.container {
    display: flex;
    flex-direction: column;
    width: 900px;
    min-height: 400px;
    margin: 0 auto;
}
.menu {
    margin-bottom: 20px;
}
.code {
    width: 700;
    flex-shrink: 0;
}

.uiAndValue {
    display: flex;
    justify-content: space-between;
    & > * {
        width: 46%;
    }
}
.content {
    display: flex;
}
.form {
    padding: 0 20px;
    flex-grow: 1;
}
.menuButton {
    appearance: 'none';
    border-width: 0;
    background-color: transparent;
    cursor: pointer;
    display: inline-block;
    padding: 15px;
    border-radius: 5px;
    &:hover {
        background: #efefef;
    }
}
.menuSelected {
    background: #337ab7;
    color: #fff;
    &:hover {
        background: #337ab7;
    }
}
</style>
