import request from "@/utils/request2";
import { RListDto, GenColumnsEntity, DeepRequired } from "../../interface";

export interface GetGenColumnsAllResult extends RListDto {
    data: GenColumnsEntity[];
}

/**
 * 代码生成字段表列表-全部
 * /genColumns/all
 */
export function getGenColumnsAll(params: GetGenColumnsAllParams) {
    const paramsInput = {
        name: params.name,
        desc: params.desc,
        tsType: params.tsType,
        isInsert: params.isInsert,
        isEdit: params.isEdit,
        isList: params.isList,
        isQuery: params.isQuery,
        required: params.required,
        tableId: params.tableId,
    };
    return request.get<DeepRequired<GetGenColumnsAllResult>>(`/genColumns/all`, {
        params: paramsInput,
    });
}

interface GetGenColumnsAllParams {
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
