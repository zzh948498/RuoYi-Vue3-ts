import request from "@/utils/request2";
import { RListDto, DictEntity, DeepRequired, DictListDto } from "../../interface";

export interface PostDictListResult extends RListDto {
    data: DictEntity[];
}

/**
 * 字典表列表（query）
 * /dict/list
 */
export function postDictList(input: DictListDto) {
    return request.post<DeepRequired<PostDictListResult>>(`/dict/list`, input);
}
