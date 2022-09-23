import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteGenTableRemoveByIdResult extends RDto {
    data: string;
}

/**
 * 删除代码生成信息表
 * /genTable/remove/{id}
 */
export function deleteGenTableRemoveById(params: DeleteGenTableRemoveByIdParams) {
    return request.delete<DeepRequired<DeleteGenTableRemoveByIdResult>>(`/genTable/remove/${params.id}`);
}

interface DeleteGenTableRemoveByIdParams {
    id: number;
}
