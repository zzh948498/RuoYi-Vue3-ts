export interface GenColumnsUpdateDto {
    /** 字段名称 */
    name?: string;
    /** 字段描述 */
    desc?: string;
    /** ts类型 */
    tsType?: 'string' | 'number' | 'boolean' | 'Date';
    /** 是否枚举类型 */
    isEnum?: boolean;
    /** 枚举类型的值 */
    enumValues?: string[];
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
