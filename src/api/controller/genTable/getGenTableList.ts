import request from "@/utils/request2";
import { RListDto, GenTableEntity, DeepRequired } from "../../interface";

export interface GetGenTableListResult extends RListDto {
    data: GenTableEntity[];
}

/**
 * 代码生成信息表列表
 * /genTable/list
 */
export function getGenTableList(params: GetGenTableListParams) {
    const paramsInput = {
        page: params.page,
        psize: params.psize,
    };
    return request.get<DeepRequired<GetGenTableListResult>>(`/genTable/list`, {
        params: paramsInput,
    });
}

interface GetGenTableListParams {
    /** 页码 */
    page: number;
    /** psize */
    psize: number;
}
