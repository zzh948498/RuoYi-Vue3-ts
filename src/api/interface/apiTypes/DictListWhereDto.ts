export interface DictListWhereDto {
    /** 字典名称 */
    title?: string;
    /** 状态 */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** 字典类型 */
    type?: string;
    /** 创建时间 */
    createdAt?: string[];
}
