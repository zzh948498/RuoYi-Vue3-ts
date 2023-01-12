import request from "@/utils/request2";
import { RListDto, DeepRequired } from "../../interface";

export interface GetGenCodeTemplatesResult extends RListDto {
    data: string[];
}

/**
 * 模板列表
 * /genCode/templates
 */
export function getGenCodeTemplates() {
    return request.get<DeepRequired<GetGenCodeTemplatesResult>>(`/genCode/templates`);
}
