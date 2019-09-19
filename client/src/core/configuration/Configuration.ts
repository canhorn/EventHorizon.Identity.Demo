export class Configuration {
    public static setConfig(key: string, value: any) {
        this.values[key] = value;
    }
    public static getConfig<T>(key: string): T {
        return this.values[key] as T;
    }
    private static values: { [key: string]: any } = {};
}
