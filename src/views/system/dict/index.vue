<template>
    <div class="app-container">
        <el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true">
            <el-form-item label="字典名称" prop="title">
                <el-input
                    v-model="queryParams.title"
                    placeholder="请输入字典名称"
                    clearable
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="字典类型" prop="type">
                <el-input
                    v-model="queryParams.type"
                    placeholder="请输入字典类型"
                    clearable
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="字典状态" clearable style="width: 240px">
                    <el-option
                        v-for="dict in statusGroup"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
                <el-date-picker
                    v-model="dateRange"
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
                    v-hasPermi="['system:dict:add']"
                    type="primary"
                    plain
                    icon="Plus"
                    @click="handleAdd"
                    >新增</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['system:dict:edit']"
                    type="success"
                    plain
                    icon="Edit"
                    :disabled="single"
                    @click="handleUpdate()"
                    >修改</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['system:dict:remove']"
                    type="danger"
                    plain
                    icon="Delete"
                    :disabled="multiple"
                    @click="handleDelete()"
                    >删除</el-button
                >
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi="['system:dict:export']"
                    type="warning"
                    plain
                    icon="Download"
                    @click="handleExport"
                    >导出</el-button
                >
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="dictList" @selectionChange="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="字典编号" align="center" prop="id" />
            <el-table-column label="字典名称" align="center" prop="title" :show-overflow-tooltip="true" />
            <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
                <template #default="scope">
                    <router-link :to="'/system/dict-data/index/' + scope.row.id" class="link-type">
                        <span>{{ scope.row.type }}</span>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status">
                <template #default="scope">
                    <template v-for="item in statusGroup">
                        <template v-if="scope.row.status === item.value">
                            <el-tag :key="item.value">{{ item.label }}</el-tag>
                        </template>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" :show-overflow-tooltip="true" />
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
                <template #default="scope">
                    <span>{{ dateFormat(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button
                        v-hasPermi="['system:dict:edit']"
                        link
                        type="primary"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                        >修改</el-button
                    >
                    <el-button
                        v-hasPermi="['system:dict:remove']"
                        link
                        type="primary"
                        icon="Delete"
                        @click="handleDelete(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <pagination
            v-show="total > 0"
            v-model:page="queryLimit.page"
            v-model:limit="queryLimit.psize"
            :total="total"
            @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog v-model="open" :title="dialogTitle" width="500px" append-to-body>
            <el-form ref="dictRef" :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="字典名称" prop="title">
                    <el-input v-model="editForm.title" placeholder="请输入字典名称" />
                </el-form-item>
                <el-form-item label="字典类型" prop="type">
                    <el-input v-model="editForm.type" placeholder="请输入字典类型" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="editForm.status">
                        <el-radio v-for="dict in statusGroup" :key="dict.value" :label="dict.value">{{
                            dict.label
                        }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="editForm.remark" type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Dict" lang="ts">
import { dateFormat } from '@zeronejs/utils';
import { ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { ElModalConfirm } from '@/plugins/ElModal';
import { endOfDay } from 'date-fns';
import { download } from '@/utils/request';
// 接口
import type { DictCreateDto, DictEntity, DictListWhereDto } from '@/api/interface';
import { postDictCreate } from '@/api/controller/dict/postDictCreate';
import { patchDictUpdateById } from '@/api/controller/dict/patchDictUpdateById';
import { postDictList } from '@/api/controller/dict/postDictList';
import { getDictDetailsById } from '@/api/controller/dict/getDictDetailsById';
import { postDictRemoves } from '@/api/controller/dict/postDictRemoves';

enum DictEntityStatusEnum {
    Normal = 'Normal',
    Disable = 'Disable',
}
// 新建/编辑 表单ref
const dictRef = ref<FormInstance>();
// 搜索栏
const queryRef = ref<FormInstance>();

const dictList = ref<DictEntity[]>([]);
// 新增/编辑 弹窗
const open = ref(false);
// 列表loading
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<number[]>([]);
// 单选
const single = ref(true);
// 是否选中了数据
const multiple = ref(true);
const total = ref(0);
const dialogTitle = ref('');
// 创建日期
const dateRange = ref<Date[]>([]);

const statusGroup = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Disable', value: 'Disable' },
];
const initFormValue = {
    title: '',
    status: DictEntityStatusEnum.Normal,
    remark: '',
    type: '',
};
const fromId = ref(0);
// 新增/编辑
const editForm = ref<DictCreateDto>({ ...initFormValue });
const queryLimit = ref({
    page: 1,
    psize: 10,
});
// 列表请求参数
const queryParams = ref<DictListWhereDto>({
    title: undefined,
    type: undefined,
    status: undefined,
});
const rules = {
    title: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
    type: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
};

/** 查询字典类型列表 */
const getList = async () => {
    loading.value = true;
    const { data } = await postDictList({
        where: {
            ...queryParams.value,
            createdAt:
                dateRange.value.length === 0
                    ? undefined
                    : [dateRange.value[0]?.toISOString(), endOfDay(dateRange.value[1]).toISOString()],
        },
        limit: queryLimit.value,
    });
    dictList.value = data.data;
    total.value = data.total;
    loading.value = false;
};
/** 取消按钮 */
const cancel = () => {
    open.value = false;
    reset();
};
/** 表单重置 */
const reset = () => {
    fromId.value = 0;
    editForm.value = { ...initFormValue };
    dictRef.value?.resetFields();
};
/** 搜索按钮操作 */
const handleQuery = () => {
    queryLimit.value.page = 1;
    getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
    dateRange.value = [];
    queryRef.value?.resetFields();
    handleQuery();
};
/** 新增按钮操作 */
const handleAdd = () => {
    reset();
    open.value = true;
    dialogTitle.value = '添加字典类型';
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: DictEntity[]) => {
    ids.value = selection.map(item => item.id);
    single.value = selection.length !== 1;
    multiple.value = !selection.length;
};
/** 修改按钮操作 */
const handleUpdate = async (row?: DictEntity) => {
    reset();
    const dictId = row ? row.id : ids.value[0];

    const { data } = await getDictDetailsById({ id: dictId });
    fromId.value = dictId;
    editForm.value = data.data;
    open.value = true;
    dialogTitle.value = '修改字典类型';
};
/** 提交按钮 */
const submitForm = async () => {
    const valid = await dictRef.value?.validate();
    if (!valid) {
        return;
    }
    if (fromId.value) {
        await patchDictUpdateById({ id: fromId.value }, editForm.value);
        ElMessage.success('修改成功');
    } else {
        await postDictCreate(editForm.value);
        ElMessage.success('新增成功');
    }
    open.value = false;
    getList();
};
/** 删除按钮操作 */
const handleDelete = async (row?: DictEntity) => {
    const dictIds = row ? [row.id] : ids.value;
    try {
        await ElModalConfirm('是否确认删除字典编号为"' + dictIds + '"的数据项？');
    } catch (e) {
        return console.log(e);
    }
    await postDictRemoves({ ids: dictIds });
    getList();
    ElMessage.success('删除成功');
};
/** 导出按钮操作 */
function handleExport() {
    download(
        'system/dict/type/export',
        {
            ...queryParams.value,
        },
        `dict_${new Date().getTime()}.xlsx`
    );
}

getList();
</script>
