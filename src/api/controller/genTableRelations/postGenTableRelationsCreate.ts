import request from "@/utils/request2";
import { RDto, GenTableRelationsEntity, DeepRequired, GenTableRelationsCreateDto } from "../../interface";

export interface PostGenTableRelationsCreateResult extends RDto {
    data: GenTableRelationsEntity;
}

/**
 * 新增代码生成关系表
 * /genTableRelations/create
 */
export function postGenTableRelationsCreate(input: GenTableRelationsCreateDto) {
    return request.post<DeepRequired<PostGenTableRelationsCreateResult>>(`/genTableRelations/create`, input);
}
