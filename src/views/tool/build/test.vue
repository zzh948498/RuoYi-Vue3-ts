<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
const list1 = ref([
    { name: 'dog 1', id: 1 },
    { name: 'dog 2', id: 2 },
    { name: 'dog 3', id: 3 },
    { name: 'dog 4', id: 4 },
]);
const list2 = ref([
    { name: 'cat 5', id: 5 },
    { name: 'cat 6', id: 6 },
    { name: 'cat 7', id: 7 },
]);
const log = (evt: any) => {
    window.console.log(evt);
};
const cloneDog = ({ id }: { id: number }) => {
    return {
        id: idGlobal++,
        name: `cat ${id}`,
    };
};
const drag = ref(false);
const dragOptions = () => {
    return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
    };
};
const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs'];
const list = ref(
    message.map((name, index) => {
        return { name, order: index + 1 };
    })
);
let idGlobal = 8;
</script>
<template>
    <div class="flex">
        <div>
            <h3>Transition</h3>
            <draggable v-model="list" item-key="order" @start="drag = true" @end="drag = false">
                <template #item="{ element }">
                    <li calss="grid grid-cols-2 gap-2 mt-[15px]">
                        <i @click="element.fixed = !element.fixed"></i>
                        {{ element.name }}
                    </li>
                </template>
            </draggable>
        </div>

        <rawDisplayer class="col-3" :value="list" title="List" />
    </div>
</template>
