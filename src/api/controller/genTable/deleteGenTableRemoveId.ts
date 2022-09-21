import request from "@/utils/request2";
import { RDto, DeepRequired } from "../../interface";

export interface DeleteGenTableRemoveIdResult extends RDto {
    data: string;
}

/**
 * 删除代码生成信息表
 * /genTable/remove/{id}
 */
export function deleteGenTableRemoveId(params: DeleteGenTableRemoveIdParams) {
    return request.delete<DeepRequired<DeleteGenTableRemoveIdResult>>(`/genTable/remove/${params.id}`);
}

interface DeleteGenTableRemoveIdParams {
    id: number;
}
