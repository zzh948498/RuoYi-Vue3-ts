import request from "@/utils/request2";
import { RListDto, DeepRequired, BodyIdsDto } from "../../interface";

export interface PostGenCodeResult extends RListDto {
    data: number[];
}

/**
 * 生成代码
 * /genCode
 */
export function postGenCode(input: BodyIdsDto) {
    return request.post<DeepRequired<PostGenCodeResult>>(`/genCode`, input);
}
