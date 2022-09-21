import request from "@/utils/request2";
import { RDto, GenTableEntity, DeepRequired } from "../../interface";

export interface GetGenTableDetailsIdResult extends RDto {
    data: GenTableEntity;
}

/**
 * 某个代码生成信息表信息
 * /genTable/details/{id}
 */
export function getGenTableDetailsId(params: GetGenTableDetailsIdParams) {
    return request.get<DeepRequired<GetGenTableDetailsIdResult>>(`/genTable/details/${params.id}`);
}

interface GetGenTableDetailsIdParams {
    id: number;
}
