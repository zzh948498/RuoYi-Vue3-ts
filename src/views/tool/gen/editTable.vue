<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="basic">
                <basic-info-form ref="basicFormInstance" :info="info" />
            </el-tab-pane>
            <el-tab-pane label="字段信息" name="columnInfo">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            v-hasPermi="['tool:gen:code']"
                            type="primary"
                            plain
                            icon="Download"
                            @click="addColumns"
                            >添加字段</el-button
                        >
                    </el-col>
                </el-row>
                <el-form ref="columnsFormRef" :model="columnsForm" :rules="rules" label-width="0">
                    <el-table
                        ref="dragTable"
                        :data="columnsForm.columns"
                        row-key="id"
                        :max-height="tableHeight"
                    >
                        <el-table-column label="序号" type="index" min-width="5%" />
                        <el-table-column label="字段列名" min-width="10%">
                            <template #default="scope">
                                <el-form-item
                                    :prop="'columns.' + scope.$index + '.name'"
                                    :rules="rules.name"
                                    class="pt-4"
                                >
                                    <el-input v-model="scope.row.name"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="字段描述" min-width="10%">
                            <template #default="scope">
                                <el-input v-model="scope.row.desc"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="ts类型" min-width="11%">
                            <template #default="scope">
                                <div>
                                    <el-select v-model="scope.row.tsType">
                                        <el-option label="string" value="string" />
                                        <el-option label="number" value="number" />
                                        <el-option label="boolean" value="boolean" />
                                        <el-option label="Date" value="Date" />
                                    </el-select>
                                </div>
                                <el-select
                                    v-show="scope.row.isEnum"
                                    v-model="scope.row.enumValues"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="填写你的类型"
                                >
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="枚举类型" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.isEnum"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="插入" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.isInsert"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="编辑" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.isEdit"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="列表" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.isList"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="查询" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.isQuery"></el-checkbox>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="查询方式" min-width="10%">
                            <template #default="scope">
                                <el-select v-model="scope.row.queryType">
                                    <el-option label="=" value="EQ" />
                                    <el-option label="!=" value="NE" />
                                    <el-option label=">" value="GT" />
                                    <el-option label=">=" value="GTE" />
                                    <el-option label="<" value="LT" />
                                    <el-option label="<=" value="LTE" />
                                    <el-option label="LIKE" value="LIKE" />
                                    <el-option label="BETWEEN" value="BETWEEN" />
                                </el-select>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="必填" min-width="5%">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.required"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="显示类型" min-width="12%">
                            <template #default="scope">
                                <el-select v-model="scope.row.htmlType">
                                    <el-option label="文本框" value="input" />
                                    <el-option label="文本域" value="textarea" />
                                    <el-option label="下拉框" value="select" />
                                    <el-option label="单选框" value="radio" />
                                    <el-option label="复选框" value="checkbox" />
                                    <el-option label="日期控件" value="datetime" />
                                    <el-option label="图片上传" value="imageUpload" />
                                    <el-option label="文件上传" value="fileUpload" />
                                    <el-option label="富文本控件" value="editor" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="字典类型" min-width="12%">
                            <template #default="scope">
                                <el-select
                                    v-model="scope.row.dictType"
                                    clearable
                                    filterable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="dict in dictOptions"
                                        :key="dict.dictType"
                                        :label="dict.dictName"
                                        :value="dict.dictType"
                                    >
                                        <span style="float: left">{{ dict.dictName }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{
                                            dict.dictType
                                        }}</span>
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="50"
                            class-name="small-padding fixed-width"
                        >
                            <template #default="scope">
                                <el-tooltip content="删除" placement="top">
                                    <el-button
                                        v-hasPermi="['tool:gen:remove']"
                                        link
                                        type="primary"
                                        icon="Delete"
                                        @click="handleDelete(scope.row, scope.$index)"
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="关系信息" name="genInfo">
                <gen-info-form ref="genFormInstance" :info="info" :tables="tables" @getAllList="getList" />
            </el-tab-pane>
        </el-tabs>
        <el-form label-width="100px">
            <div style="text-align: center; margin-left: -100px; margin-top: 10px">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="close()">返回</el-button>
            </div>
        </el-form>
    </el-card>
</template>

<script setup name="GenEdit" lang="ts">
import { optionselect as getDictOptionselect } from '@/api/system/dict/type';
import basicInfoForm from './basicInfoForm.vue';
import genInfoForm from './genInfoForm.vue';
import { ref } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import { oneOf, PartialByKeys } from '@zeronejs/utils';
import { getGenTableAll } from '@/api/controller/genTable/getGenTableAll';
import { GenColumnsEntity, GenTableEntity, GenTableRelationsEntity } from '@/api/interface';
import { ElMessage, FormInstance } from 'element-plus';
import { ElModalConfirm } from '@/plugins/ElModal';
import tab from '@/plugins/tab';
import { patchGenTableUpdateById } from '@/api/controller/genTable/patchGenTableUpdateById';
import { deleteGenColumnsRemoveById } from '@/api/controller/genColumns/deleteGenColumnsRemoveById';
import { getGenTableDetailsById } from '@/api/controller/genTable/getGenTableDetailsById';
import { patchGenColumnsUpdateById } from '@/api/controller/genColumns/patchGenColumnsUpdateById';
import { postGenColumnsCreate } from '@/api/controller/genColumns/postGenColumnsCreate';
import { patchGenTableRelationsUpdateById } from '@/api/controller/genTableRelations/patchGenTableRelationsUpdateById';
import { postGenTableRelationsCreate } from '@/api/controller/genTableRelations/postGenTableRelationsCreate';

const route = useRoute();
type ColumnsListItem = PartialByKeys<GenColumnsEntity, 'id' | 'createdAt' | 'updatedAt' | 'table'>;

const activeName = ref('columnInfo');
const tableHeight = ref(document.documentElement.scrollHeight - 245 + 'px');
const tables = ref<GenTableEntity[]>([]);
const columnsFormRef = ref<FormInstance>();
// const columns = ref<ColumnsListItem[]>([]);
const columnsForm = ref<{
    columns: ColumnsListItem[];
}>({
    columns: [],
});

const dictOptions = ref<any[]>([]);
const info = ref<GenTableEntity>();
const basicFormInstance = ref<InstanceType<typeof basicInfoForm>>();
const genFormInstance = ref<InstanceType<typeof genInfoForm>>();
const rules = ref({
    name: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入字段描述', trigger: 'blur' }],
    tsType: [
        {
            required: true,
            message: '请选择一个ts类型',
            trigger: 'change',
        },
    ],
});
const submiting = ref(false);
const addColumns = () => {
    columnsForm.value.columns.push({
        name: 'string',
        /** 字段描述 */
        desc: '',
        /** ts类型 */
        tsType: 'string',
        isEnum: false,
        /** 插入 */
        isInsert: true,
        /** 编辑 */
        isEdit: true,
        /** 列表 */
        isList: true,
        /** 查询 */
        isQuery: true,
        /** 必填 */
        required: false,
        /** 表id */
        tableId: info.value?.id ?? 0,
    });
};
/** 提交按钮 */
async function submitForm() {
    const basicForm = basicFormInstance.value?.basicInfoForm;
    const genInfoForm = genFormInstance.value?.genInfoForm;
    // const genForm = genFormInstance.value?.$refs.genInfoForm as Ref<FormInstance>;
    if (submiting.value) {
        return;
    }
    submiting.value = true;
    const [basicCheck, columnsCheck, genInfoCheck] = await Promise.all(
        [basicForm!, columnsFormRef.value!, genInfoForm!].map(getFormPromise)
    );
    if (!basicCheck) {
        submiting.value = false;
        return ElMessage.error('基本信息校验未通过，请重新检查提交内容');
    } else if (!columnsCheck) {
        submiting.value = false;
        return ElMessage.error('字段校验未通过，请重新检查提交内容');
    } else if (!genInfoCheck) {
        submiting.value = false;
        return ElMessage.error('关系信息校验未通过，请重新检查提交内容');
    }

    await Promise.all([
        ...columnsForm.value.columns.map(it => {
            if (!it.id) {
                return postGenColumnsCreate(it);
            }
            return patchGenColumnsUpdateById({ id: it.id }, it);
        }),
        patchGenTableUpdateById({ id: info.value!.id }, info.value ?? {}),
        ...(genFormInstance.value?.relationsForm.relations.map(it => {
            if (!it.id) {
                return postGenTableRelationsCreate(it);
            }
            return patchGenTableRelationsUpdateById({ id: it.id }, it);
        }) ?? []),
    ]);
    ElMessage.success('操作成功');
    await getList();
    submiting.value = false;
}
function getFormPromise(form: FormInstance) {
    return new Promise(resolve => {
        form.validate((res: boolean) => {
            resolve(res);
        });
    });
}
/** 删除按钮操作 */
async function handleDelete(row: ColumnsListItem, index: number) {
    if (row.id) {
        try {
            await ElModalConfirm('确定删除？');
            // delTable(tableIds);
        } catch (e) {
            return console.log(e);
        }
        await deleteGenColumnsRemoveById({ id: row.id });

        await getList();
    } else {
        columnsForm.value.columns.splice(index, 1);
    }
    ElMessage.success('删除成功');
    // const tableIds = row.tableId || ids.value;
}
function close() {
    const obj: RouteLocationRaw = {
        path: '/tool/gen',
        query: { t: Date.now(), pageNum: route.query.pageNum },
    };
    tab.closeOpenPage(obj);
}
const getList = async () => {
    const tableId = Number(oneOf(route.params.tableId));
    if (tableId) {
        // 获取表详细信息
        // getGenTable(tableId).then(res => {
        //     columns.value = res.data.rows;
        //     info.value = res.data.info;
        //     tables.value = res.data.tables;
        // });
        const [tableInfo, tableAll] = await Promise.all([
            getGenTableDetailsById({ id: tableId }),
            getGenTableAll({}),
        ]);
        tables.value = tableAll.data.data;
        info.value = tableInfo.data.data;
        columnsForm.value.columns = tableInfo.data.data.columns;
        genFormInstance.value?.getList(tableInfo.data.data.relations);
        /** 查询字典下拉列表 */
        getDictOptionselect().then(response => {
            dictOptions.value = response.data;
        });
    }
};
getList();
</script>
