import request from "@/utils/request2";
import { RDto, DictEntity, DeepRequired } from "../../interface";

export interface GetDictDetailsByIdResult extends RDto {
    data: DictEntity;
}

/**
 * 某个字典表信息
 * /dict/details/{id}
 */
export function getDictDetailsById(params: GetDictDetailsByIdParams) {
    return request.get<DeepRequired<GetDictDetailsByIdResult>>(`/dict/details/${params.id}`);
}

interface GetDictDetailsByIdParams {
    id: number;
}
