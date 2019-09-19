import { Configuration } from "../configuration/Configuration";

export const debugEnabled = () =>
    Configuration.getConfig<boolean>("DEBUG_ENABLED") || false;
export const traceEnabled = () =>
    Configuration.getConfig<boolean>("TRACE_ENABLED") || false;
