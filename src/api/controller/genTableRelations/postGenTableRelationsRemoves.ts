import request from "@/utils/request2";
import { RDto, DeepRequired, BodyIdsDto } from "../../interface";

export interface PostGenTableRelationsRemovesResult extends RDto {
    data: string;
}

/**
 * 删除多个代码生成关系表
 * /genTableRelations/removes
 */
export function postGenTableRelationsRemoves(input: BodyIdsDto) {
    return request.post<DeepRequired<PostGenTableRelationsRemovesResult>>(`/genTableRelations/removes`, input);
}
