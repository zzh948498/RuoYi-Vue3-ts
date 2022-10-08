import request from "@/utils/request2";
import { RDto, DeepRequired, DictDataUpdateDto } from "../../interface";

export interface PatchDictDataUpdateByIdResult extends RDto {
    data: string;
}

/**
 * 修改字典数据表信息
 * /dictData/update/{id}
 */
export function patchDictDataUpdateById(params: PatchDictDataUpdateByIdParams, input: DictDataUpdateDto) {
    return request.patch<DeepRequired<PatchDictDataUpdateByIdResult>>(`/dictData/update/${params.id}`, input);
}

interface PatchDictDataUpdateByIdParams {
    id: number;
}
