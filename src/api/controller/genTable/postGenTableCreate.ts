import request from "@/utils/request2";
import { RDto, GenTableEntity, DeepRequired, GenTableCreateDto } from "../../interface";

export interface PostGenTableCreateResult extends RDto {
    data: GenTableEntity;
}

/**
 * 新增代码生成信息表
 * /genTable/create
 */
export function postGenTableCreate(input: GenTableCreateDto) {
    return request.post<DeepRequired<PostGenTableCreateResult>>(`/genTable/create`, input);
}
