<template>
    <div class="flex bg-white w-[100%] h-[100%]">
        <!-- 左侧列表 -->
        <div class="w-[260px] h-[100vh]">
            <div class="h-[42px] border-b border-[#f1e8e8] flex items-center pl-[12px]">
                <img
                    class="w-[30px] h-[30px]"
                    src="http://vue.ruoyi.vip/static/img/logo.4eeb8a8e.png"
                    alt="logo"
                />
                <span class="text-[#00afff] leading-[30px] font-semibold text-[17px] ml-[3px]">
                    Form Generator</span
                >
            </div>
            <div class="overflow-hidden p-[8px] h-[100%] border-r border-[#f1e8e8]">
                <div class="text-[14px] text-[#222] mt-[6px] ml-[2px]">
                    <svg-icon class="text-[#666] text-[18px]" icon-class="component" />
                    <span>输入型组件</span>
                </div>
                <div class="mt-[15px]">
                    <draggable
                        v-model="inputComponents"
                        class="grid grid-cols-2 gap-[8px]"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                        item-key="tag"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <template #item="{ element }">
                            <div
                                class="flex bg-[#f6f7ff] items-center px-[8px] py-[10px] rounded-[3px] border border-[#f6f7ff]"
                            >
                                <svg-icon class="text-[15px] text-[#777]" :icon-class="element.tagIcon" />
                                <span class="text-[12px] ml-[3px]">{{ element.label }}</span>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="text-[14px] text-[#222] mt-[30px] ml-[2px]">
                    <svg-icon class="text-[#666] text-[18px]" icon-class="component" />
                    <span>选择型组件</span>
                </div>
                <div class="mt-[15px]">
                    <draggable
                        v-model="selectComponents"
                        class="grid grid-cols-2 gap-2"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                        item-key="tag"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <template #item="{ element }">
                            <div
                                class="flex bg-[#f6f7ff] items-center px-[8px] py-[10px] rounded-[3px] border border-[#f6f7ff]"
                            >
                                <svg-icon class="text-[15px] text-[#777]" :icon-class="element.tagIcon" />
                                <span class="text-[12px] ml-[3px]">{{ element.label }}</span>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="text-[14px] text-[#222] mt-[30px] ml-[2px]">
                    <svg-icon class="text-[#666] text-[18px]" icon-class="component" />
                    <span>布局型组件</span>
                </div>
                <div class="mt-[15px]">
                    <draggable
                        v-model="layoutComponents"
                        class="grid grid-cols-2 gap-2"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                        item-key="tag"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <template #item="{ element }">
                            <div
                                class="flex bg-[#f6f7ff] items-center px-[8px] py-[10px] rounded-[3px] border border-[#f6f7ff]"
                            >
                                <svg-icon class="text-[15px] text-[#777]" :icon-class="element.tagIcon" />
                                <span class="text-[12px] ml-[3px]">{{ element.label }}</span>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <!-- 中间列表 -->
        <div class="h-[100vh] flex-1">
            <div class="px-[15px] h-[42px] flex justify-end items-center border-r border-b border-[#f1e8e8]">
                <el-button :text="true" class="text-[20px]">
                    <el-icon class="text-[20px] align-middle" style="vertical-align: middle">
                        <download />
                    </el-icon>
                    <span class="align-middle text-[14px]"> 导出vue文件 </span>
                </el-button>
                <el-button :text="true" class="text-[20px]">
                    <el-icon class="align-middle">
                        <documentCopy />
                    </el-icon>
                    <span class="align-middle text-[14px]"> 复制代码 </span>
                </el-button>
                <el-button :text="true" class="text-[#f56c6c] text-[20px]">
                    <el-icon class="align-middle" style="vertical-align: middle">
                        <delete />
                    </el-icon>
                    <span class="align-middle text-[14px]"> 清空</span>
                </el-button>
            </div>
            <el-scrollbar class="h-[calc(100vh-42px)] overflow-hidden border-l border-r border-[#f1e8e8]">
                <el-row class="px-[12px] pt-[12px] pb-[15px]" :gutter="formConf.gutter">
                    <el-form
                        class="h-[calc(100vh-69px)] w-full"
                        :size="formConf.size"
                        :label-position="formConf.labelPosition"
                        :disabled="formConf.disabled"
                        :label-width="formConf.labelWidth + 'px'"
                    >
                        <draggable
                            v-model="drawingList"
                            :group="{ name: 'people', pull: '' }"
                            item-key="tag"
                            @change="log"
                        >
                            <template #item="{ element, index }">
                                <Test
                                    :drawing-list="drawingList"
                                    :element="element"
                                    :index="index"
                                    :active-id="activeId"
                                    :form-conf="formConf"
                                ></Test>
                            </template>
                        </draggable>
                        <div
                            v-show="!drawingList.length"
                            class="text-[18px] text-[#ccb1ea] tracking-[4px] flex justify-center items-center h-full w-full"
                        >
                            从左侧拖入或点选组件进行表单设计
                        </div>
                    </el-form>
                </el-row>
            </el-scrollbar>
        </div>
        <!-- 右边列表 -->
        <div class="h-[100vh] w-[350px] bg-red-400"></div>
    </div>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable';
import { inputComponents, selectComponents, layoutComponents, formConf } from '@/utils/generator/config';
import drawingDefault from '@/utils/generator/drawingDefault';
import { ref } from 'vue';
import TagsView from '@/layout/components/TagsView/index.vue';
import Test from './test.vue';
const drag = ref(false);
const drawingList = ref<any[]>(drawingDefault);
const log = (evt: any) => {
    window.console.log(evt);
};
const activeId = ref(drawingDefault[0].formId);
// const lsit = [];
// lsit.push(<div>sfsdf</div>);
</script>
