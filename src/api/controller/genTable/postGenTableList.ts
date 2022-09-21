import request from "@/utils/request2";
import { RListDto, GenTableEntity, DeepRequired, GenTableListDto } from "../../interface";

export interface PostGenTableListResult extends RListDto {
    data: GenTableEntity[];
}

/**
 * 代码生成信息表列表（query）
 * /genTable/list
 */
export function postGenTableList(input: GenTableListDto) {
    return request.post<DeepRequired<PostGenTableListResult>>(`/genTable/list`, input);
}
