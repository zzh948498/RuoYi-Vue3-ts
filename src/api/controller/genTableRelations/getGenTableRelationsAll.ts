import request from "@/utils/request2";
import { RListDto, GenTableRelationsEntity, DeepRequired } from "../../interface";

export interface GetGenTableRelationsAllResult extends RListDto {
    data: GenTableRelationsEntity[];
}

/**
 * 代码生成关系表列表-全部
 * /genTableRelations/all
 */
export function getGenTableRelationsAll(params: GetGenTableRelationsAllParams) {
    const paramsInput = {
        subTableName: params.subTableName,
        type: params.type,
        subTableFkName: params.subTableFkName,
        relationColumn: params.relationColumn,
        targetColumn: params.targetColumn,
        tableId: params.tableId,
    };
    return request.get<DeepRequired<GetGenTableRelationsAllResult>>(`/genTableRelations/all`, {
        params: paramsInput,
    });
}

interface GetGenTableRelationsAllParams {
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
