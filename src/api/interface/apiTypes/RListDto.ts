export interface RListDto {
    /** 通用状态码[200:正常, 400: 客户端参数错误, 500: 服务器内部错误] */
    code: number;
    /** 业务状态码(0为标准状态,其它见方法提示) */
    status: number;
    /** 业务详细信息(可为空) */
    msg: string;
    data: any;
    total: number;
}
