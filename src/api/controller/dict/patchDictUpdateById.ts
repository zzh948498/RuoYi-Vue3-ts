import request from "@/utils/request2";
import { RDto, DeepRequired, DictUpdateDto } from "../../interface";

export interface PatchDictUpdateByIdResult extends RDto {
    data: string;
}

/**
 * 修改字典表信息
 * /dict/update/{id}
 */
export function patchDictUpdateById(params: PatchDictUpdateByIdParams, input: DictUpdateDto) {
    return request.patch<DeepRequired<PatchDictUpdateByIdResult>>(`/dict/update/${params.id}`, input);
}

interface PatchDictUpdateByIdParams {
    id: number;
}
