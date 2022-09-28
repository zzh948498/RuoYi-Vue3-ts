<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-button type="primary" class="ml-[16px]" @click="addRelations">添加关系</el-button>
            </el-col>
        </el-row>
        <!-- <h4 class="form-header">关联信息</h4> -->
        <el-form ref="genInfoForm" :model="relationsForm" :rules="rules" label-width="150px" class="mt-4">
            <el-row v-for="(relation, index) in relationsForm.relations" :key="index">
                <el-col :span="12">
                    <el-form-item :prop="'relations.' + index + '.subTableName'">
                        <template #label>
                            关联子表的表名
                            <el-tooltip content="关联子表的表名， 如：sys_user" placement="top">
                                <el-icon><question-filled /></el-icon>
                            </el-tooltip>
                        </template>
                        <el-select
                            v-model="relation.subTableName"
                            placeholder="请选择"
                            @change="onSubTableNameChange(relation)"
                        >
                            <el-option
                                v-for="(table, index) in tables"
                                :key="index"
                                :label="table.name + '：' + table.desc"
                                :value="table.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :prop="'relations.' + index + '.type'">
                        <template #label>主子表关系类型</template>
                        <el-select v-model="relation.type">
                            <el-option label="一对一" value="OneToOne" />
                            <el-option label="多对一" value="ManyToOne" />
                            <el-option label="一对多" value="OneToMany" />
                            <!-- <el-option label="多对多" value="ManyToMany" /> -->
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col v-show="relation.subTableName" :span="12">
                    <el-form-item :prop="'relations.' + index + '.relationColumn'">
                        <template #label><label>自身关系字段</label> </template>
                        <el-input v-model="relation.relationColumn" placeholder="" class="w-[219px]" />
                        <!-- <div>{{ lowerFirst(relation.subTableName).replace(/Entity$/, '') }}</div> -->
                    </el-form-item>
                </el-col>
                <el-col v-show="relation.subTableName" :span="12">
                    <el-form-item :prop="'relations.' + index + '.targetColumn'">
                        <template #label><label>对方关系字段</label> </template>
                        <el-input v-model="relation.targetColumn" placeholder="" class="w-[219px]" />
                        <!-- <div>{{ lowerFirst(relation.subTableName).replace(/Entity$/, '') }}</div> -->
                    </el-form-item>
                </el-col>
                <el-col v-if="relation.type === 'OneToOne' || relation.type === 'ManyToOne'" :span="12">
                    <el-form-item :prop="'relations.' + index + '.subTableFkName'">
                        <template #label>
                            子表关联的外键名
                            <el-tooltip content="子表关联的外键名， 如：userId" placement="top">
                                <el-icon><question-filled /></el-icon>
                            </el-tooltip>
                        </template>
                        <el-select v-model="relation.subTableFkName" placeholder="请选择">
                            <el-option :label="'id' + '：' + 'id'" value="id"></el-option>
                            <el-option
                                v-for="(column, index) in tables[
                                    tables.findIndex(it => it.name === relation.subTableName)
                                ]?.columns ?? []"
                                :key="index"
                                :label="column.name + '：' + column.desc"
                                :value="column.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-button type="danger" :icon="Delete" circle @click="deleteItem(relation, index)" />
                </el-col>
                <el-divider />
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { GenTableEntity, GenTableRelationsEntity } from '@/api/interface';
import { listMenu } from '@/api/system/menu';
import { ref, getCurrentInstance, ComponentInternalInstance, watch } from 'vue';
import { lowerFirst } from 'lodash';
import { ElMessage, FormInstance } from 'element-plus';
import { PartialByKeys } from '@zeronejs/utils';
import { Delete } from '@element-plus/icons-vue';
import { deleteGenTableRelationsRemoveById } from '@/api/controller/genTableRelations/deleteGenTableRelationsRemoveById';
import { ElModalConfirm } from '@/plugins/ElModal';
const menuOptions = ref({});
const genInfoForm = ref<FormInstance>();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
type RelationsListItem = PartialByKeys<GenTableRelationsEntity, 'id' | 'createdAt' | 'updatedAt' | 'table'>;
const emits = defineEmits<{
    (e: 'getAllList'): Promise<void>;
}>();
const props = defineProps({
    info: {
        type: Object as () => Partial<GenTableEntity>,
        default: () => ({}),
    },
    tables: {
        type: Array as () => Array<GenTableEntity>,
        default: () => [],
    },
});
const relationsForm = ref<{
    relations: RelationsListItem[];
}>({
    relations: [],
});
// 表单校验
const rules = ref({
    tplCategory: [{ required: true, message: '请选择生成模板', trigger: 'blur' }],
    subTableName: [{ required: true, message: '请选择子表名称', trigger: 'blur' }],
    relations: [{ required: true, message: '请选择关系类型', trigger: 'blur' }],
    subTableFkName: [{ required: true, message: '请选择关联的外键名', trigger: 'blur' }],
    relationColumn: [{ required: true, message: '请填写自身关系字段', trigger: 'blur' }],
    targetColumn: [{ required: true, message: '请填写对方关系字段', trigger: 'blur' }],
});
const getList = (relations: GenTableRelationsEntity[]) => {
    relationsForm.value.relations = relations;
};
const addRelations = () => {
    relationsForm.value.relations.push({
        subTableName: '',
        type: 'OneToOne',
        subTableFkName: '',
        tableId: props.info.id ?? 0,
        relationColumn: '',
        targetColumn: '',
    });
};

const onSubTableNameChange = (relation: RelationsListItem) => {
    if (!relation.relationColumn) {
        relation.relationColumn = lowerFirst(relation.subTableName).replace(/Entity$/, '');
    }
};
const deleteItem = async (relation: RelationsListItem, index: number) => {
    if (relation.id) {
        try {
            await ElModalConfirm('确定删除？');
        } catch (e) {
            return console.log(e);
        }
        await deleteGenTableRelationsRemoveById({ id: relation.id });
        await emits('getAllList');
    } else {
        relationsForm.value.relations.splice(index, 1);
    }
    ElMessage.success('删除成功');
};
/** 查询菜单下拉树结构 */
function getMenuTreeselect() {
    listMenu().then(response => {
        menuOptions.value = proxy!.handleTree(response.data, 'menuId');
    });
}

getMenuTreeselect();
defineExpose({ genInfoForm, getList, relationsForm });
</script>
