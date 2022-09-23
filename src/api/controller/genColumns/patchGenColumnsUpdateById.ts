import request from "@/utils/request2";
import { RDto, DeepRequired, GenColumnsUpdateDto } from "../../interface";

export interface PatchGenColumnsUpdateByIdResult extends RDto {
    data: string;
}

/**
 * 修改代码生成字段表信息
 * /genColumns/update/{id}
 */
export function patchGenColumnsUpdateById(params: PatchGenColumnsUpdateByIdParams, input: GenColumnsUpdateDto) {
    return request.patch<DeepRequired<PatchGenColumnsUpdateByIdResult>>(`/genColumns/update/${params.id}`, input);
}

interface PatchGenColumnsUpdateByIdParams {
    id: number;
}
