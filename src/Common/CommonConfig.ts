import MobileDetect from "mobile-detect";

export class CommonConfig {

    protected static _the: CommonConfig;
   



    static get the(): CommonConfig {
        if (!CommonConfig._the) {
            CommonConfig._the = new CommonConfig();
        }

        return CommonConfig._the;
    }

    isDesktop(): boolean {
        const md = new MobileDetect(window.navigator.userAgent);
        return !md.mobile();  // Returns true if it's not a mobile device
    }

    isPortraitmobile(): boolean {
        return window.innerHeight > window.innerWidth;
    }


    constructor() {
        if (CommonConfig._the == null) CommonConfig._the = this;
    }

    




}