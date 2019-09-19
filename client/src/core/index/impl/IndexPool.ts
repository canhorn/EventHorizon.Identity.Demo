import { IIndexPool } from "../IIndexPool";

let CURRENT_INDEX: number = 0;
export class IndexPool implements IIndexPool {
    nextIndex(): number {
        return CURRENT_INDEX++;
    }
}
