import request from "@/utils/request2";
import { RDto, DeepRequired, BodyIdsDto } from "../../interface";

export interface PostDictDataRemovesResult extends RDto {
    data: string;
}

/**
 * 删除多个字典数据表
 * /dictData/removes
 */
export function postDictDataRemoves(input: BodyIdsDto) {
    return request.post<DeepRequired<PostDictDataRemovesResult>>(`/dictData/removes`, input);
}
