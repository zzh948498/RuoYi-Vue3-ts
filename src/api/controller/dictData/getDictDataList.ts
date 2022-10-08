import request from "@/utils/request2";
import { RListDto, DictDataEntity, DeepRequired } from "../../interface";

export interface GetDictDataListResult extends RListDto {
    data: DictDataEntity[];
}

/**
 * 字典数据表列表
 * /dictData/list
 */
export function getDictDataList(params: GetDictDataListParams) {
    const paramsInput = {
        page: params.page,
        psize: params.psize,
    };
    return request.get<DeepRequired<GetDictDataListResult>>(`/dictData/list`, {
        params: paramsInput,
    });
}

interface GetDictDataListParams {
    /** 页码 */
    page: number;
    /** psize */
    psize: number;
}
