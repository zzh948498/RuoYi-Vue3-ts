export interface GenColumnsAllWhereDto {
    /** 字段名称 */
    name?: string;
    /** 字段描述 */
    desc?: string;
    /** ts类型 */
    tsType?: 'string' | 'number' | 'boolean' | 'Date';
    /** 插入 */
    isInsert?: boolean;
    /** 编辑 */
    isEdit?: boolean;
    /** 列表 */
    isList?: boolean;
    /** 查询 */
    isQuery?: boolean;
    /** 必填 */
    required?: boolean;
    /** 表id */
    tableId?: number;
}
