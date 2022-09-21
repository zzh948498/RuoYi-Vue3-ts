import request from "@/utils/request2";
import { RDto, GenColumnsEntity, DeepRequired } from "../../interface";

export interface GetGenColumnsDetailsIdResult extends RDto {
    data: GenColumnsEntity;
}

/**
 * 某个代码生成字段表信息
 * /genColumns/details/{id}
 */
export function getGenColumnsDetailsId(params: GetGenColumnsDetailsIdParams) {
    return request.get<DeepRequired<GetGenColumnsDetailsIdResult>>(`/genColumns/details/${params.id}`);
}

interface GetGenColumnsDetailsIdParams {
    id: number;
}
