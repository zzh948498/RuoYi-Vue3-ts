import request from "@/utils/request2";
import { RDto, GenTableRelationsEntity, DeepRequired } from "../../interface";

export interface GetGenTableRelationsDetailsByIdResult extends RDto {
    data: GenTableRelationsEntity;
}

/**
 * 某个代码生成关系表信息
 * /genTableRelations/details/{id}
 */
export function getGenTableRelationsDetailsById(params: GetGenTableRelationsDetailsByIdParams) {
    return request.get<DeepRequired<GetGenTableRelationsDetailsByIdResult>>(`/genTableRelations/details/${params.id}`);
}

interface GetGenTableRelationsDetailsByIdParams {
    id: number;
}
