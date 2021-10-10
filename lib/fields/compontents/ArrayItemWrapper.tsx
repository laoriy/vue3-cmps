import { defineComponent, PropType } from 'vue';
import styles from './index.module.less';

const ArrayItemWrapper = defineComponent({
    props: {
        onAdd: {
            required: true,
            type: Function as PropType<(index: number) => void>,
        },
        onDelete: {
            required: true,
            type: Function as PropType<(index: number) => void>,
        },
        onUp: {
            required: true,
            type: Function as PropType<(index: number) => void>,
        },
        onDown: {
            required: true,
            type: Function as PropType<(index: number) => void>,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    name: 'ArrayItemWrapper',
    setup(props, { slots }) {
        const handleAdd = () => {
            props.onAdd(props.index);
        };
        const handleDelete = () => {
            props.onDelete(props.index);
        };
        const handleUp = () => {
            props.onUp(props.index);
        };
        const handleDown = () => {
            props.onDown(props.index);
        };
        return () => (
            <div class={styles.container}>
                <div class={styles.actions}>
                    <button class={styles.action} onClick={handleAdd}>
                        新增
                    </button>
                    <button class={styles.action} onClick={handleDelete}>
                        删除
                    </button>
                    <button class={styles.action} onClick={handleUp}>
                        上移
                    </button>
                    <button class={styles.action} onClick={handleDown}>
                        下移
                    </button>
                </div>
                <div class="content">{slots.default?.()}</div>
            </div>
        );
    },
});

export default ArrayItemWrapper;
