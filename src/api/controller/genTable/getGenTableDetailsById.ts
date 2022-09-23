import request from "@/utils/request2";
import { RDto, GenTableEntity, DeepRequired } from "../../interface";

export interface GetGenTableDetailsByIdResult extends RDto {
    data: GenTableEntity;
}

/**
 * 某个代码生成信息表信息
 * /genTable/details/{id}
 */
export function getGenTableDetailsById(params: GetGenTableDetailsByIdParams) {
    return request.get<DeepRequired<GetGenTableDetailsByIdResult>>(`/genTable/details/${params.id}`);
}

interface GetGenTableDetailsByIdParams {
    id: number;
}
