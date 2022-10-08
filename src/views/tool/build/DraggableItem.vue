<script lang="ts">
import { h, ref } from 'vue';
defineProps({
    element: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    drawingList: {
        type: Array,
        required: true,
    },
    activeId: {
        type: Number,
        required: true,
    },
    formConf: {
        type: Object,
        required: true,
    },
});
const msg = ref('hhh');
//按钮组件
const itemBtns = () => {
    return h('div',[h('span',{title:'复制'})]);
};
const render = () => {
    return h('div', msg);
};
</script>
