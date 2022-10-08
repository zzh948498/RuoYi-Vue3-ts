import request from "@/utils/request2";
import { RDto, DictEntity, DeepRequired, DictCreateDto } from "../../interface";

export interface PostDictCreateResult extends RDto {
    data: DictEntity;
}

/**
 * 新增字典表
 * /dict/create
 */
export function postDictCreate(input: DictCreateDto) {
    return request.post<DeepRequired<PostDictCreateResult>>(`/dict/create`, input);
}
