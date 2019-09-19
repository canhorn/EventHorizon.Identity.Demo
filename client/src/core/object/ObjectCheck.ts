export class ObjectCheck {
    public static isDefined(obj: any) {
        return isObjectDefined(obj);
    }
}

export const isObjectDefined = <T>(obj: any): obj is {} =>
    obj !== undefined && obj !== null;

export const isObjectNotDefined = (obj: any): obj is undefined =>
    !isObjectDefined(obj);

export const returnIfDefined = (value: any, defaultValue: any) =>
    isObjectDefined(value) ? value : defaultValue;
