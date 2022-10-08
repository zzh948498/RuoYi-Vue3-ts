export interface DictDataCreateDto {
    /** 字典标签 */
    label: string;
    /** 字典排序 */
    sort: number;
    /** 是否默认 */
    isDefault?: boolean;
    /** 字典键值 */
    value: string;
    /** 状态（0正常 1停用） */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** dictId */
    dictId: number;
}
