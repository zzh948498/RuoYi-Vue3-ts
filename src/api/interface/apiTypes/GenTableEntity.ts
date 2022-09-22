import { GenColumnsEntity } from "../../interface";

export interface GenTableEntity {
    /** id */
    id: number;
    /** 表名称 */
    name: string;
    /** 表描述 */
    desc: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createdAt: string;
    /** 修改时间 */
    updatedAt: string;
    /** 字段 */
    columns: GenColumnsEntity[];
    /** 生成模板类型 */
    tplCategory: 'crud' | 'tree' | 'sub';
    /** 子表名称 */
    subTableName?: string;
    /** 子表关系类型 */
    relations?: 'OneToOne' | 'ManyToOne' | 'OneToMany' | 'ManyToMany';
    /** 子表关联的外键名 */
    subTableFkName?: string;
}
