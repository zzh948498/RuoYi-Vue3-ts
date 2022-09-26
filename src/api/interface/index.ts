export * from "./apiTypes/GenColumnsEntity";
export * from "./apiTypes/GenTableEntity";
export * from "./apiTypes/GenColumnsCreateDto";
export * from "./apiTypes/GenColumnsListWhereDto";
export * from "./apiTypes/Limit";
export * from "./apiTypes/GenColumnsListDto";
export * from "./apiTypes/GenColumnsUpdateDto";
export * from "./apiTypes/GenTableCreateDto";
export * from "./apiTypes/GenTableListWhereDto";
export * from "./apiTypes/GenTableListDto";
export * from "./apiTypes/GenTableUpdateDto";
export * from "./apiTypes/BodyIdsDto";
export * from "./apiTypes/RDto";
export * from "./apiTypes/RListDto";

export type Primitive = undefined | null | boolean | string | number | symbol;
export type DeepRequired<T> = T extends Primitive ? T : keyof T extends never ? T : { [K in keyof T]-?: DeepRequired<T[K]> };