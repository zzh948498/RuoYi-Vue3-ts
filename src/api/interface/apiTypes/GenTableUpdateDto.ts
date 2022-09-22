export interface GenTableUpdateDto {
    /** 表名称 */
    name?: string;
    /** 表描述 */
    desc?: string;
    /** 备注 */
    remark?: string;
    /** 生成模板类型 */
    tplCategory?: 'crud' | 'tree' | 'sub';
    /** 子表名称 */
    subTableName?: string;
    /** 子表关系类型 */
    relations?: 'OneToOne' | 'ManyToOne' | 'OneToMany' | 'ManyToMany';
    /** 子表关联的外键名 */
    subTableFkName?: string;
}
