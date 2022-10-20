export interface DictListWhereDto {
    /** 字典名称 */
    title?: string;
    /** 状态 */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** 字典类型 */
    type?: string;
    /** 开始时间 */
    beginTime?: string;
    /** 结束时间 */
    endTime?: string;
}
