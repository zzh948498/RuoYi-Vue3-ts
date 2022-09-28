import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteGenTableRelationsRemoveByIdResult extends RDto {
    data: string;
}

/**
 * 删除代码生成关系表
 * /genTableRelations/remove/{id}
 */
export function deleteGenTableRelationsRemoveById(params: DeleteGenTableRelationsRemoveByIdParams) {
    return request.delete<DeepRequired<DeleteGenTableRelationsRemoveByIdResult>>(`/genTableRelations/remove/${params.id}`);
}

interface DeleteGenTableRelationsRemoveByIdParams {
    id: number;
}
