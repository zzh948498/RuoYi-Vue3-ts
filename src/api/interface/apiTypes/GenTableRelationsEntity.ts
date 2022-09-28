import { GenTableEntity } from "../../interface";

export interface GenTableRelationsEntity {
    /** id */
    id: number;
    /** 子表名称 */
    subTableName: string;
    /** 子表关系类型 */
    type: 'OneToOne' | 'ManyToOne' | 'OneToMany' | 'ManyToMany';
    /** 子表关联的外键名 */
    subTableFkName?: string;
    /** 自身关系字段 */
    relationColumn: string;
    /** 目标关系字段 */
    targetColumn: string;
    /** 创建时间 */
    createdAt: string;
    /** 修改时间 */
    updatedAt: string;
    /** 表信息 */
    table: GenTableEntity;
    /** 表id */
    tableId: number;
}
