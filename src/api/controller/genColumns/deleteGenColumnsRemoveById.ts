import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteGenColumnsRemoveByIdResult extends RDto {
    data: string;
}

/**
 * 删除代码生成字段表
 * /genColumns/remove/{id}
 */
export function deleteGenColumnsRemoveById(params: DeleteGenColumnsRemoveByIdParams) {
    return request.delete<DeepRequired<DeleteGenColumnsRemoveByIdResult>>(`/genColumns/remove/${params.id}`);
}

interface DeleteGenColumnsRemoveByIdParams {
    id: number;
}
