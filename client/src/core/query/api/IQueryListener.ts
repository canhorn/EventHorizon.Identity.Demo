import { IQueryResult } from "./IQueryResult";
export abstract class IQueryListener {
    public abstract function: (data?: any) => IQueryResult<any>;
    public abstract context: object;
}
