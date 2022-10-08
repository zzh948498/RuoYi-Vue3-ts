import request from "@/utils/request2";
import { RListDto, DictDataEntity, DeepRequired, DictDataListDto } from "../../interface";

export interface PostDictDataListResult extends RListDto {
    data: DictDataEntity[];
}

/**
 * 字典数据表列表（query）
 * /dictData/list
 */
export function postDictDataList(input: DictDataListDto) {
    return request.post<DeepRequired<PostDictDataListResult>>(`/dictData/list`, input);
}
