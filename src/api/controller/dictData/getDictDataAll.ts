import request from "@/utils/request2";
import { RListDto, DictDataEntity, DeepRequired } from "../../interface";

export interface GetDictDataAllResult extends RListDto {
    data: DictDataEntity[];
}

/**
 * 字典数据表列表-全部
 * /dictData/all
 */
export function getDictDataAll(params: GetDictDataAllParams) {
    const paramsInput = {
        label: params.label,
        sort: params.sort,
        isDefault: params.isDefault,
        value: params.value,
        status: params.status,
        remark: params.remark,
        dictId: params.dictId,
    };
    return request.get<DeepRequired<GetDictDataAllResult>>(`/dictData/all`, {
        params: paramsInput,
    });
}

interface GetDictDataAllParams {
    /** 字典标签 */
    label?: string;
    /** 字典排序 */
    sort?: number;
    /** 是否默认 */
    isDefault?: boolean;
    /** 字典键值 */
    value?: string;
    /** 状态 */
    status?: 'Normal' | 'Disable';
    /** 备注 */
    remark?: string;
    /** dictId */
    dictId?: number;
}
