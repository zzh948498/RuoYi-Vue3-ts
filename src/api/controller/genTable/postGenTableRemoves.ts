import request from "@/utils/request2";
import { RDto, DeepRequired, BodyIdsDto } from "../../interface";

export interface PostGenTableRemovesResult extends RDto {
    data: string;
}

/**
 * 删除代码生成信息表
 * /genTable/removes
 */
export function postGenTableRemoves(input: BodyIdsDto) {
    return request.post<DeepRequired<PostGenTableRemovesResult>>(`/genTable/removes`, input);
}
