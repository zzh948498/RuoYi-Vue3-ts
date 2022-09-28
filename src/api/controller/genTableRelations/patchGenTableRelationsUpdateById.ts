import request from "@/utils/request2";
import { RDto, DeepRequired, GenTableRelationsUpdateDto } from "../../interface";

export interface PatchGenTableRelationsUpdateByIdResult extends RDto {
    data: string;
}

/**
 * 修改代码生成关系表信息
 * /genTableRelations/update/{id}
 */
export function patchGenTableRelationsUpdateById(params: PatchGenTableRelationsUpdateByIdParams, input: GenTableRelationsUpdateDto) {
    return request.patch<DeepRequired<PatchGenTableRelationsUpdateByIdResult>>(`/genTableRelations/update/${params.id}`, input);
}

interface PatchGenTableRelationsUpdateByIdParams {
    id: number;
}
