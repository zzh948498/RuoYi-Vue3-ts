import request from "@/utils/request2";
import { DeepRequired } from "../../interface";

/**
 * /
 */
export function get() {
    return request.get<DeepRequired<string>>(`/`);
}
