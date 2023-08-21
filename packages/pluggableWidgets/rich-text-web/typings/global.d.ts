
interface session {
    getConfig(value: string): string;
}

interface mxUI {
    showProgress(message: string, dialog: boolean): number;
    hideProgress(pid: number): void;
}
export interface MXGlobalObject {
    remoteUrl: string;
    session: session;
    ui: mxUI;
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
