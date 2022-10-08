import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteDictDataRemoveByIdResult extends RDto {
    data: string;
}

/**
 * 删除字典数据表
 * /dictData/remove/{id}
 */
export function deleteDictDataRemoveById(params: DeleteDictDataRemoveByIdParams) {
    return request.delete<DeepRequired<DeleteDictDataRemoveByIdResult>>(`/dictData/remove/${params.id}`);
}

interface DeleteDictDataRemoveByIdParams {
    id: number;
}
