import { ISystemWindow } from "../api/ISystemWindow";

export class SystemWindow extends ISystemWindow {
    constructor(private readonly _window: Window) {
        super();
    }
    public getProp<T>(prop: string): T {
        return (this._window as any)[prop] as T;
    }
    public setProp(prop: string, value: any): void {
        (this._window as any)[prop] = value;
    }
    public setInterval(handler: string | Function, timeout?: number): number {
        return this._window.setInterval(handler, timeout);
    }
    public clearInterval(handle?: number): void {
        this._window.clearInterval(handle);
    }
}
