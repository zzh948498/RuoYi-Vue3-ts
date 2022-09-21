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
    columns: GenColumnsEntity[];
}
