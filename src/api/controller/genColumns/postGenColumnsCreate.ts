import request from "@/utils/request2";
import { RDto, GenColumnsEntity, DeepRequired, GenColumnsCreateDto } from "../../interface";

export interface PostGenColumnsCreateResult extends RDto {
    data: GenColumnsEntity;
}

/**
 * 新增代码生成字段表
 * /genColumns/create
 */
export function postGenColumnsCreate(input: GenColumnsCreateDto) {
    return request.post<DeepRequired<PostGenColumnsCreateResult>>(`/genColumns/create`, input);
}
