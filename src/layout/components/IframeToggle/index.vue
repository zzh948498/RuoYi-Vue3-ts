<template>
    <transition-group name="fade-transform" mode="out-in">
        <inner-link
            v-for="(item, index) in tagsViewStore.iframeViews"
            v-show="route.path === item.path"
            :key="item.path"
            :iframeId="'iframe' + index"
            :src="(item.meta.link as any)"
        ></inner-link>
    </transition-group>
</template>

<script setup lang="ts">
import InnerLink from '../InnerLink/index.vue';
import useTagsViewStore from '@/store/modules/tagsView';
import { useRoute } from 'vue-router';

const route = useRoute();
const tagsViewStore = useTagsViewStore();
</script>
