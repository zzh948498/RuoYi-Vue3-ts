<!-- eslint-disable vue/no-mutating-props -->
<template>
    <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="表名称" prop="name">
                    <el-input v-model="info.name" placeholder="请输入仓库名称" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="表描述" prop="desc">
                    <el-input v-model="info.desc" placeholder="请输入" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="表类型" prop="tplCategory">
                    <el-select v-model="info.tplCategory">
                        <el-option label="单表（增删改查）" value="crud" />
                        <el-option label="树表（增删改查）" value="tree" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
                <el-form-item label="作者" prop="functionAuthor">
                    <el-input v-model="info.functionAuthor" placeholder="请输入" />
                </el-form-item>
            </el-col> -->
            <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="info.remark" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { GenTableEntity } from '@/api/interface';
import { FormInstance } from 'element-plus';
import { ref } from 'vue';
defineProps({
    info: {
        type: Object as () => GenTableEntity,
        default: () => ({}),
    },
});
const basicInfoForm = ref<FormInstance>();
// 表单校验
const rules = ref({
    name: [{ required: true, message: '请输入表名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入表描述', trigger: 'blur' }],
    tplCategory: [{ required: true, message: '请选择表类型', trigger: 'blur' }],
    // className: [{ required: true, message: '请输入实体类名称', trigger: 'blur' }],
    // functionAuthor: [{ required: true, message: '请输入作者', trigger: 'blur' }],
});
defineExpose({ basicInfoForm });
</script>
