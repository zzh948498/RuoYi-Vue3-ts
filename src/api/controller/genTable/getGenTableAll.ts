import request from "@/utils/request2";
import { RListDto, GenTableEntity, DeepRequired } from "../../interface";

export interface GetGenTableAllResult extends RListDto {
    data: GenTableEntity[];
}

/**
 * 代码生成信息表列表-全部
 * /genTable/all
 */
export function getGenTableAll(params: GetGenTableAllParams) {
    const paramsInput = {
        name: params.name,
        desc: params.desc,
        remark: params.remark,
        tplCategory: params.tplCategory,
    };
    return request.get<DeepRequired<GetGenTableAllResult>>(`/genTable/all`, {
        params: paramsInput,
    });
}

interface GetGenTableAllParams {
    /** 表名称 */
    name?: string;
    /** 表描述 */
    desc?: string;
    /** 备注 */
    remark?: string;
    /** 生成模板类型 */
    tplCategory?: 'crud' | 'tree';
}
