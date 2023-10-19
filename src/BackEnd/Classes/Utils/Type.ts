export enum Type {
    INT,
    DOUBLE,
    DATE,
    VARCHAR,
    BOOLEAN,
    NULL,
    TABLE
}
export type ReturnType = {value: any, type: Type}