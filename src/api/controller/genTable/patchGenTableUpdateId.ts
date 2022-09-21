import request from "@/utils/request2";
import { RDto, DeepRequired, GenTableUpdateDto } from "../../interface";

export interface PatchGenTableUpdateIdResult extends RDto {
    data: string;
}

/**
 * 修改代码生成信息表信息
 * /genTable/update/{id}
 */
export function patchGenTableUpdateId(params: PatchGenTableUpdateIdParams, input: GenTableUpdateDto) {
    return request.patch<DeepRequired<PatchGenTableUpdateIdResult>>(`/genTable/update/${params.id}`, input);
}

interface PatchGenTableUpdateIdParams {
    id: number;
}
