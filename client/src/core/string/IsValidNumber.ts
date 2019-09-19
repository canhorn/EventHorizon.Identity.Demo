import { number } from "prop-types";
import { isObjectNotDefined } from "../object/ObjectCheck";
// Max Number 999 999 999 999 999
const MAX_LENGTH: number = 15;
// test decimal number: 999999999999999.999999999999999
export const isValidDecimalNumber = (numberString: string): boolean => {
    if (isObjectNotDefined(numberString)) {
        return false;
    }
    const decimalParts = numberString.split(".");
    if (isInvalidNumber(removeAnySymbols(decimalParts[0]), MAX_LENGTH)) {
        return false;
    }
    if (
        decimalParts.length > 1 &&
        isInvalidNumber(decimalParts[1], MAX_LENGTH)
    ) {
        return false;
    }
    return /^\d+(\.\d+)?$/.test(removeAnySymbols(numberString));
};
export const isValidIntegerNumber = (numberString: string): boolean => {
    if (isInvalidNumber(numberString, MAX_LENGTH)) {
        return false;
    }
    return /^\d+?$/.test(removeAnySymbols(numberString));
};

const removeAnySymbols = (numberString: string) =>
    numberString[0] === "-" || numberString[0] === "+"
        ? numberString.substring(1)
        : numberString;

const isInvalidNumber = (numberString: string, maxLength: number) =>
    isObjectNotDefined(numberString) ||
    numberString.length === 0 ||
    numberString.length > maxLength;
