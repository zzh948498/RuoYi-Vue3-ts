import request from "@/utils/request2";
import { RListDto, GenTableRelationsEntity, DeepRequired } from "../../interface";

export interface GetGenTableRelationsListResult extends RListDto {
    data: GenTableRelationsEntity[];
}

/**
 * 代码生成关系表列表
 * /genTableRelations/list
 */
export function getGenTableRelationsList(params: GetGenTableRelationsListParams) {
    const paramsInput = {
        page: params.page,
        psize: params.psize,
    };
    return request.get<DeepRequired<GetGenTableRelationsListResult>>(`/genTableRelations/list`, {
        params: paramsInput,
    });
}

interface GetGenTableRelationsListParams {
    /** 页码 */
    page: number;
    /** psize */
    psize: number;
}
