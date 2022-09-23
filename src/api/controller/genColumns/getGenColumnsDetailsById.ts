import request from "@/utils/request2";
import { RDto, GenColumnsEntity, DeepRequired } from "../../interface";

export interface GetGenColumnsDetailsByIdResult extends RDto {
    data: GenColumnsEntity;
}

/**
 * 某个代码生成字段表信息
 * /genColumns/details/{id}
 */
export function getGenColumnsDetailsById(params: GetGenColumnsDetailsByIdParams) {
    return request.get<DeepRequired<GetGenColumnsDetailsByIdResult>>(`/genColumns/details/${params.id}`);
}

interface GetGenColumnsDetailsByIdParams {
    id: number;
}
