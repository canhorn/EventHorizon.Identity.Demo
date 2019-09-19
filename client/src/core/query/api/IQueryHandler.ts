import { IQueryResult } from "./IQueryResult";
export abstract class IQueryHandler {
    public abstract type: string;
    public abstract handle: (data: any) => IQueryResult<any>;
}
