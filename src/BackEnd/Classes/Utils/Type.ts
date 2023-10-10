export enum Type {
    INT,
    DOUBLE,
    DATE,
    VARCHAR,
    BOOLEAN,
    NULL
}
export type ReturnType = {value: any, type: Type}