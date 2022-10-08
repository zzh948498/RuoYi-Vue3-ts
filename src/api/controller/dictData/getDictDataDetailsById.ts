import request from "@/utils/request2";
import { RDto, DictDataEntity, DeepRequired } from "../../interface";

export interface GetDictDataDetailsByIdResult extends RDto {
    data: DictDataEntity;
}

/**
 * 某个字典数据表信息
 * /dictData/details/{id}
 */
export function getDictDataDetailsById(params: GetDictDataDetailsByIdParams) {
    return request.get<DeepRequired<GetDictDataDetailsByIdResult>>(`/dictData/details/${params.id}`);
}

interface GetDictDataDetailsByIdParams {
    id: number;
}
