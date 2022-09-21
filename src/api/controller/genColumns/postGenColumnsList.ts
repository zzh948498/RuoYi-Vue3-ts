import request from "@/utils/request2";
import { RListDto, GenColumnsEntity, DeepRequired, GenColumnsListDto } from "../../interface";

export interface PostGenColumnsListResult extends RListDto {
    data: GenColumnsEntity[];
}

/**
 * 代码生成字段表列表（query）
 * /genColumns/list
 */
export function postGenColumnsList(input: GenColumnsListDto) {
    return request.post<DeepRequired<PostGenColumnsListResult>>(`/genColumns/list`, input);
}
