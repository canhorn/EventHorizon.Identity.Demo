import { II18nMap } from "../model/II18nMap";

const STATE: II18nMap = {};

export const setI18nState = (i18nMap: II18nMap) =>
    Object.assign(STATE, { ...STATE, ...i18nMap });

export const getI18nState = () => STATE;
