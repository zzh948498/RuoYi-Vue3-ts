import request from "@/utils/request2";
import { RListDto, DictEntity, DeepRequired } from "../../interface";

export interface GetDictListResult extends RListDto {
    data: DictEntity[];
}

/**
 * 字典表列表
 * /dict/list
 */
export function getDictList(params: GetDictListParams) {
    const paramsInput = {
        page: params.page,
        psize: params.psize,
    };
    return request.get<DeepRequired<GetDictListResult>>(`/dict/list`, {
        params: paramsInput,
    });
}

interface GetDictListParams {
    /** 页码 */
    page: number;
    /** psize */
    psize: number;
}
