export interface GenTableRelationsListWhereDto {
    /** 子表名称 */
    subTableName?: string;
    /** 子表关系类型 */
    type?: 'OneToOne' | 'ManyToOne' | 'OneToMany' | 'ManyToMany';
    /** 子表关联的外键名 */
    subTableFkName?: string;
    /** 自身关系字段 */
    relationColumn?: string;
    /** 目标关系字段 */
    targetColumn?: string;
    /** 表id */
    tableId?: number;
}
