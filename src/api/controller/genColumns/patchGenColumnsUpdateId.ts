import request from "@/utils/request2";
import { RDto, DeepRequired, GenColumnsUpdateDto } from "../../interface";

export interface PatchGenColumnsUpdateIdResult extends RDto {
    data: string;
}

/**
 * 修改代码生成字段表信息
 * /genColumns/update/{id}
 */
export function patchGenColumnsUpdateId(params: PatchGenColumnsUpdateIdParams, input: GenColumnsUpdateDto) {
    return request.patch<DeepRequired<PatchGenColumnsUpdateIdResult>>(`/genColumns/update/${params.id}`, input);
}

interface PatchGenColumnsUpdateIdParams {
    id: number;
}
