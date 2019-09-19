export const isValidAlphaNumericPeriod = (text: string) =>
    /^[a-z0-9.]+$/i.test(text);
