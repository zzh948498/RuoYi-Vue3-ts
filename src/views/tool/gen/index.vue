<template>
    <div class="app-container">
        <el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="表名称" prop="name">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入表名称"
                    clearable
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="表描述" prop="desc">
                <el-input
                    v-model="queryParams.desc"
                    placeholder="请输入表描述"
                    clearable
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
                <el-date-picker
                    v-model="dateRange"
                    value-format="YYYY-MM-DD"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['tool:gen:code']"
                    type="primary"
                    plain
                    icon="Plus"
                    @click="handleAddTable"
                    >新建</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['tool:gen:code']"
                    type="primary"
                    plain
                    icon="Download"
                    @click="handleGenTable"
                    >生成</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['tool:gen:import']"
                    type="info"
                    plain
                    icon="Upload"
                    @click="openImportTable"
                    >导入</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['tool:gen:edit']"
                    type="success"
                    plain
                    icon="Edit"
                    :disabled="single"
                    @click="handleEditTable"
                    >修改</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['tool:gen:remove']"
                    type="danger"
                    plain
                    icon="Delete"
                    :disabled="multiple"
                    @click="handleDeletes"
                    >删除</el-button
                >
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="tableList" @selectionChange="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="序号" type="index" width="50" align="center">
                <template #default="scope">
                    <span>{{ (queryParams.page - 1) * queryParams.psize + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="表名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="表描述" align="center" prop="desc" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="实体" align="center" prop="className" :show-overflow-tooltip="true" /> -->
            <el-table-column label="创建时间" align="center" width="160">
                <template #default="scope">
                    <span>{{ dateFormat(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center" width="160">
                <template #default="scope">
                    <span>{{ dateFormat(scope.row.updatedAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-tooltip content="预览" placement="top">
                        <el-button
                            v-hasPermi="['tool:gen:preview']"
                            link
                            type="primary"
                            icon="View"
                            @click="handlePreview(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="编辑" placement="top">
                        <el-button
                            v-hasPermi="['tool:gen:edit']"
                            link
                            type="primary"
                            icon="Edit"
                            @click="handleEditTable(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button
                            v-hasPermi="['tool:gen:remove']"
                            link
                            type="primary"
                            icon="Delete"
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="同步" placement="top">
                        <el-button
                            v-hasPermi="['tool:gen:edit']"
                            link
                            type="primary"
                            icon="Refresh"
                            @click="handleSynchDb(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="生成代码" placement="top">
                        <el-button
                            v-hasPermi="['tool:gen:code']"
                            link
                            type="primary"
                            icon="Download"
                            @click="handleGenTable(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total > 0"
            v-model:page="queryParams.page"
            v-model:limit="queryParams.psize"
            :total="total"
            @pagination="getList"
        />
        <!-- 添加或修改用户配置对话框 -->
        <el-dialog v-model="open" title="添加表" width="600px" append-to-body>
            <el-form ref="tableAddRef" :model="form" :rules="rules" label-width="80px">
                <!-- <el-row>
                    <el-col :span="12"> -->
                <el-form-item label="表名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入表名称" maxlength="30" />
                </el-form-item>
                <!-- </el-col>
                </el-row> -->

                <!-- <el-row>
                    <el-col :span="12"> -->
                <el-form-item label="表描述" prop="desc">
                    <el-input v-model="form.desc" placeholder="表描述" maxlength="30" />
                </el-form-item>
                <!-- </el-col>
                </el-row> -->
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="open = false">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 预览界面 -->
        <el-dialog
            v-model="preview.open"
            :title="preview.title"
            width="80%"
            top="5vh"
            append-to-body
            class="scrollbar"
        >
            <el-tabs v-model="preview.activeName">
                <el-tab-pane
                    v-for="(value, key) in preview.data"
                    :key="key"
                    :label="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
                    :name="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
                >
                    <el-link
                        v-copyText="value"
                        v-copyText:callback="copyTextSuccess"
                        :underline="false"
                        icon="DocumentCopy"
                        style="float: right"
                        >&nbsp;复制</el-link
                    >
                    <pre>{{ value }}</pre>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <import-table ref="importRef" @ok="handleQuery" />
    </div>
</template>

<script setup name="Gen" lang="ts">
import { deleteGenTableRemoveById } from '@/api/controller/genTable/deleteGenTableRemoveById';
import { postGenCode } from '@/api/controller/genTable/postGenCode';
import { postGenTableCreate } from '@/api/controller/genTable/postGenTableCreate';
import { postGenTableList } from '@/api/controller/genTable/postGenTableList';
import { postGenTableRemoves } from '@/api/controller/genTable/postGenTableRemoves';
import { GenTableCreateDto, GenTableEntity } from '@/api/interface';
import { listTable, previewTable, delTable, genCode, synchDb } from '@/api/tool/gen';
import { ElModalConfirm } from '@/plugins/ElModal';
import router from '@/router';
import { oneOf, dateFormat } from '@zeronejs/utils';
import { ElMessage, FormInstance } from 'element-plus';
import { getCurrentInstance, ComponentInternalInstance, ref, reactive, toRefs, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import importTable from './importTable.vue';
import { saveAs } from 'file-saver';

const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const open = ref(false);
const tableList = ref<GenTableEntity[]>([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<number[]>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tableNames = ref<any[]>([]);
const dateRange = ref<any[]>([]);
const uniqueId = ref('');
const tableAddRef = ref<FormInstance>();
const form = ref<GenTableCreateDto>({
    name: '',
    desc: '',
    tplCategory: 'crud',
});
const rules = ref({
    name: [
        { required: true, message: '表名称不能为空', trigger: 'blur' },
        { min: 2, max: 20, message: '表名称长度必须介于 2 和 20 之间', trigger: 'blur' },
    ],
    desc: [{ required: true, message: '表描述不能为空', trigger: 'blur' }],
});
const data = reactive<{
    queryParams: {
        page: number;
        psize: number;
        name?: string;
        desc?: string;
    };
    preview: {
        open: boolean;
        title: string;
        data: Record<string, any>;
        activeName: string;
    };
}>({
    queryParams: {
        page: 1,
        psize: 10,
        name: undefined,
        desc: undefined,
    },
    preview: {
        open: false,
        title: '代码预览',
        data: {},
        activeName: 'domain.java',
    },
});

const { queryParams, preview } = toRefs(data);

onActivated(() => {
    const time = oneOf(route.query.t);
    if (time && time !== uniqueId.value) {
        uniqueId.value = time;
        queryParams.value.page = Number(route.query.page);
        dateRange.value = [];
        proxy?.resetForm('queryForm');
        getList();
    }
});

/** 查询表集合 */
async function getList() {
    loading.value = true;
    const { data } = await postGenTableList({});
    tableList.value = data.data;
    total.value = data.total;
    loading.value = false;
    // listTable(proxy?.addDateRange(queryParams.value, dateRange.value)).then((response: any) => {
    //     tableList.value = response.rows;
    //     total.value = response.total;
    //     loading.value = false;
    // });
}
/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.page = 1;
    getList();
}
/** 生成代码操作 */
async function handleGenTable(row: GenTableEntity) {
    const { data } = await postGenCode({
        ids: [row.id],
    });
    const arraybuffer = new Int8Array(data.data);
    // 再输入到 Blob 生成文件
    const blob = new Blob([arraybuffer], { type: 'application/zip' });
    saveAs(blob, 'ruoyi.zip');
}
/** 同步数据库操作 */
function handleSynchDb(row: any) {
    const name = row.name;
    proxy?.$modal
        .confirm('确认要强制同步"' + name + '"表结构吗？')
        .then(function () {
            return synchDb(name);
        })
        .then(() => {
            proxy!.$modal.msgSuccess('同步成功');
        })
        .catch((e: any) => {
            console.log(e);
        });
}
/** 打开导入表弹窗 */
function openImportTable() {
    (proxy?.$refs['importRef'] as any).show();
}
/** 重置按钮操作 */
function resetQuery() {
    dateRange.value = [];
    proxy?.resetForm('queryRef');
    handleQuery();
}
/** 新增按钮操作 */
function handleAddTable() {
    open.value = true;
}
/** 提交按钮 */
async function submitForm() {
    const valid = await tableAddRef.value?.validate();
    if (valid) {
        await postGenTableCreate(form.value);
        ElMessage.success('新增成功');
        open.value = false;
        getList();
        tableAddRef.value?.resetFields();
    }
}
/** 预览按钮 */
function handlePreview(row: any) {
    previewTable(row.tableId).then(response => {
        preview.value.data = response.data;
        preview.value.open = true;
        preview.value.activeName = 'domain.java';
    });
}
/** 复制代码成功 */
function copyTextSuccess() {
    proxy?.$modal.msgSuccess('复制成功');
}
// 多选框选中数据
function handleSelectionChange(selection: any[]) {
    ids.value = selection.map(item => item.id);
    tableNames.value = selection.map(item => item.name);
    single.value = selection.length !== 1;
    multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleEditTable(row: GenTableEntity) {
    const tableId = row.id || ids.value[0];
    router.push({ path: '/tool/gen-edit/index/' + tableId, query: { page: queryParams.value.page } });
}
/** 删除按钮操作 */
async function handleDelete(row: GenTableEntity) {
    try {
        await ElModalConfirm('是否确认删除表编号为"' + row.id + '"的数据项？');
    } catch (e) {
        return console.log(e);
    }
    await deleteGenTableRemoveById({ id: row.id });
    getList();
    ElMessage.success('删除成功');
}
/** 删除按钮操作 */
async function handleDeletes() {
    try {
        await ElModalConfirm('是否确认删除表编号为"' + ids.value + '"的数据项？');
    } catch (e) {
        return console.log(e);
    }
    await postGenTableRemoves({ ids: ids.value });
    getList();
    ElMessage.success('删除成功');
}

getList();
</script>
