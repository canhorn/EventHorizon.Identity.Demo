export interface IQueryResult<T> {
    success: boolean;
    result: T;
    errorCode?: string;
}
