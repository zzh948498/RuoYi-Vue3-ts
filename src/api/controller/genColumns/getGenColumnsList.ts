import request from "@/utils/request2";
import { RListDto, GenColumnsEntity, DeepRequired } from "../../interface";

export interface GetGenColumnsListResult extends RListDto {
    data: GenColumnsEntity[];
}

/**
 * 代码生成字段表列表
 * /genColumns/list
 */
export function getGenColumnsList(params: GetGenColumnsListParams) {
    const paramsInput = {
        page: params.page,
        psize: params.psize,
    };
    return request.get<DeepRequired<GetGenColumnsListResult>>(`/genColumns/list`, {
        params: paramsInput,
    });
}

interface GetGenColumnsListParams {
    /** 页码 */
    page: number;
    /** psize */
    psize: number;
}
