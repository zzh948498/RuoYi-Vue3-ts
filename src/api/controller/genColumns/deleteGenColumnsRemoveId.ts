import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteGenColumnsRemoveIdResult extends RDto {
    data: string;
}

/**
 * 删除代码生成字段表
 * /genColumns/remove/{id}
 */
export function deleteGenColumnsRemoveId(params: DeleteGenColumnsRemoveIdParams) {
    return request.delete<DeepRequired<DeleteGenColumnsRemoveIdResult>>(`/genColumns/remove/${params.id}`);
}

interface DeleteGenColumnsRemoveIdParams {
    id: number;
}
