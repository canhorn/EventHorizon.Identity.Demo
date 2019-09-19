import { UUID } from "../../uuid/UUID";
import { IGuid } from "../IGuid";

export class GuidImpl implements IGuid {
    public guid(): string {
        return UUID.uuid();
    }
    // abstract guidFast(): string;
    // abstract guidCompact(): string;
}
