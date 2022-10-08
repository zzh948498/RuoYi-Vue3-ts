import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteDictRemoveByIdResult extends RDto {
    data: string;
}

/**
 * 删除字典表
 * /dict/remove/{id}
 */
export function deleteDictRemoveById(params: DeleteDictRemoveByIdParams) {
    return request.delete<DeepRequired<DeleteDictRemoveByIdResult>>(`/dict/remove/${params.id}`);
}

interface DeleteDictRemoveByIdParams {
    id: number;
}
