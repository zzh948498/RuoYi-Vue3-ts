import request from "@/utils/request2";
import { RDto, DictDataEntity, DeepRequired, DictDataCreateDto } from "../../interface";

export interface PostDictDataCreateResult extends RDto {
    data: DictDataEntity;
}

/**
 * 新增字典数据表
 * /dictData/create
 */
export function postDictDataCreate(input: DictDataCreateDto) {
    return request.post<DeepRequired<PostDictDataCreateResult>>(`/dictData/create`, input);
}
