import request from "@/utils/request2";
import { RListDto, DictEntity, DeepRequired } from "../../interface";

export interface GetDictAllResult extends RListDto {
    data: DictEntity[];
}

/**
 * 字典表列表-全部
 * /dict/all
 */
export function getDictAll(params: GetDictAllParams) {
    const paramsInput = {
        title: params.title,
        status: params.status,
        remark: params.remark,
        type: params.type,
    };
    return request.get<DeepRequired<GetDictAllResult>>(`/dict/all`, {
        params: paramsInput,
    });
}

interface GetDictAllParams {
    /** 字典名称 */
    title?: string;
    /** 状态 */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** 字典类型 */
    type?: string;
}
