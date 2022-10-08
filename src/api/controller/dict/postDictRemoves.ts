import request from "@/utils/request2";
import { RDto, DeepRequired, BodyIdsDto } from "../../interface";

export interface PostDictRemovesResult extends RDto {
    data: string;
}

/**
 * 删除多个字典表
 * /dict/removes
 */
export function postDictRemoves(input: BodyIdsDto) {
    return request.post<DeepRequired<PostDictRemovesResult>>(`/dict/removes`, input);
}
