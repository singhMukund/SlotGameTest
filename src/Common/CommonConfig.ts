export class CommonConfig {
    protected static _the: CommonConfig;
    public static symbolIds: string[] = [
        'sym_bonus', 'sym_Scatter', 'sym_Wild',
        'sym_H1', 'sym_H2', 'sym_H3', 'sym_H4',
        'sym_L1', 'sym_L2', 'sym_L3', 'sym_L4', 'sym_L5',];

    public static symbolsPerReel: number = 3;
    public static totalReel: number = 5;
    public static reelWidth: number = 228.8;
    public static symbolHeight: number = 212.33;

    public static START_SPIN: string = "START_SPIN";
    public static PAYTABLE_NAV_BTN_CLICKED: string = "PAYTABLE_NAV_BTN_CLICKED";
    public static PAYTABLE_CROSS_BTN_CLICKED: string = "PAYTABLE_CROSS_BTN_CLICKED";
    public static ENABLE_INFO_BUTTON: string = "ENABLE_INFO_BUTTON";
    public static INFO_BTN_CLICKED: string = "INFO_BTN_CLICKED";
    public static SPIN_STOPPED: string = "SPIN_STOPPED";
    private winningSymbolIdFromUser: number = 12;
    private winningSymbolIds: string[][] = [['12'], ['12'], ['12']];

    public setwinningSymbolIds(value: number): void {
        this.winningSymbolIds = [[`${value}`], [`${value}`], [`${value}`]];
    }

    public getwinningSymbolIds(): string[][] {
        return this.winningSymbolIds;
    }



    public setwinningSymbolIdFromUser(value: number): void {
        this.winningSymbolIdFromUser = value;
    }

    public getwinningSymbolIdFromUser(): number {
        return this.winningSymbolIdFromUser;
    }
    // ["12", "12", "12"],
    // ["12", "12", "12"],
    // ["12", "12", "12"],
    // ["12", "12", "12"],
    // ["12", "12", "12"],
    public static RESPONSE_SAME_SYM_ALL_REEL: string[][] = [
        ["12", "12", "12"],
        ["12", "12", "12"],
        ["12", "12", "12"],
        ["12", "12", "12"],
        ["12", "12", "12"],
    ];

    public static RESPONSE_01: string[][] = [
        ["12", "10", "5"],
        ["12", "5", "8"],
        ["12", "11", "6"],
        ["11", "8", "10"],
        ["5", "5", "8"],
    ];
    public static RESPONSE_02: string[][] = [
        ["10", "3", "7"],
        ["8", "6", "6"],
        ["4", "5", "9"],
        ["4", "2", "3"],
        ["12", "11", "6"],
    ]
    public static RESPONSE_03: string[][] = [
        ["10", "3", "7"],
        ["8", "6", "6"],
        ["4", "5", "9"],
        ["4", "2", "3"],
        ["5", "5", "8"],
    ];
    public static RESPONSE_04: string[][] = [
        ["10", "3", "7"],
        ["8", "6", "6"],
        ["4", "5", "9"],
        ["4", "2", "3"],
        ["12", "11", "6"],
    ];
    public static RESPONSE_05: string[][] = [
        ["8", "6", "6"],
        ["4", "5", "9"],
        ["4", "2", "3"],
        ["11", "8", "10"],
        ["5", "5", "8"],
    ];
    static get the(): CommonConfig {
        if (!CommonConfig._the) {
            CommonConfig._the = new CommonConfig();
        }

        return CommonConfig._the;
    }

    constructor() {
        if (CommonConfig._the == null) CommonConfig._the = this;
    }

    setWinningAnimation(): void {

    }

}