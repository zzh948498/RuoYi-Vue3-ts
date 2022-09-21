import { GenTableEntity } from "../../interface";

export interface GenColumnsEntity {
    /** id */
    id: number;
    /** 字段名称 */
    name: string;
    /** 字段描述 */
    desc: string;
    /** ts类型 */
    tsType: 'string' | 'number' | 'boolean' | 'Date';
    /** 插入 */
    isInsert: boolean;
    /** 编辑 */
    isEdit: boolean;
    /** 列表 */
    isList: boolean;
    /** 查询 */
    isQuery: boolean;
    /** 必填 */
    required: boolean;
    /** 创建时间 */
    createdAt: string;
    /** 修改时间 */
    updatedAt: string;
    /** 表信息 */
    table: GenTableEntity;
    /** 表id */
    tableId: number;
}
