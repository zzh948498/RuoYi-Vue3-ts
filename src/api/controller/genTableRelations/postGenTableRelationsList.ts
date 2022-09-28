import request from "@/utils/request2";
import { RListDto, GenTableRelationsEntity, DeepRequired, GenTableRelationsListDto } from "../../interface";

export interface PostGenTableRelationsListResult extends RListDto {
    data: GenTableRelationsEntity[];
}

/**
 * 代码生成关系表列表（query）
 * /genTableRelations/list
 */
export function postGenTableRelationsList(input: GenTableRelationsListDto) {
    return request.post<DeepRequired<PostGenTableRelationsListResult>>(`/genTableRelations/list`, input);
}
