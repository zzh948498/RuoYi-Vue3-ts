import { GenColumnsEntity, GenTableRelationsEntity } from "../../interface";

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
    /** 关系 */
    relations: GenTableRelationsEntity[];
    /** 生成模板类型 */
    tplCategory: 'crud' | 'tree';
}
