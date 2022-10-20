import { DictEntity } from "../../interface";

export interface DictDataEntity {
    /** id */
    id: number;
    /** 字典标签 */
    label: string;
    /** 字典排序 */
    sort: number;
    /** 是否默认 */
    isDefault?: boolean;
    /** 字典键值 */
    value: string;
    /** 状态 */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createdAt: string;
    /** 修改时间 */
    updatedAt: string;
    /** dict */
    dict: DictEntity;
    /** dictId */
    dictId: number;
}
