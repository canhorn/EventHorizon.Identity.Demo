import defaultJson from "./default.json";
import { II18nMap } from "./model/II18nMap";
import { getI18nState, setI18nState } from "./store/I18nStore";

export const supportedLocaleList = ["en-us"];
export const getResourceBundle = (locale: string) =>
    getResourceBundleByBundleName(`default.${locale}.json`).catch(_ =>
        setResourceBundle(defaultJson)
    );
export const setDefaultResourceBundle = () => setResourceBundle(defaultJson);
const getResourceBundleByBundleName = async (resourceBundleName: string) => {
    const headers = new Headers();
    headers.append("pragma", "no-cache");
    headers.append("cache-control", "no-cache");
    const response = await fetch(`/i18n/${resourceBundleName}`, {
        method: "GET",
        headers,
    });
    return setResourceBundle(await response.json());
};
const setResourceBundle = (resourceBundle: II18nMap) =>
    setI18nState(resourceBundle);

export const translation = (
    key: string,
    ...replaces: Array<string | number>
): string =>
    replaces.reduceRight<string>(
        (current, replace, index) =>
            replaceAtIndex(current, replace.toString(), index),
        getCurrentKeyValue(key)
    );
const getCurrentKeyValue = (key: string) => getI18nState()[key] || `{{${key}}}`;
const replaceAtIndex = (
    keyValue: string,
    replacementValue: string,
    index: number
) => keyValue.replace(`\{${index}\}`, replacementValue);
export type ITranslationResolver = (
    key: string,
    ...replaces: Array<string | number>
) => string;
