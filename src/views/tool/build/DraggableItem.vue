<script setup lang="ts">
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
</script>
