export interface MXGlobalObject {
    remoteUrl: string;
    data: {
        create: ({
            entity,
            callback,
            error
        }:{
            entity: string;
            callback: (obj)=> void;
            error: (e) => void;
        }) => void;
        commit: ({
            mxobj,
            mxobjs,
            callback,
            error
        }:{
            mxobj: any;
            mxobjs?: [];
            callback: (obj)=> void;
            error: (error) => void;
        }) => void;
    }
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
