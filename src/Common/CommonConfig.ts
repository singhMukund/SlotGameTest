interface SymbolWinValues {
    [key: number]: number;
}

interface SymbolWinData {
    [key: number]: SymbolWinValues;
}

export class CommonConfig {
    protected static _the: CommonConfig;
    public static highValueSymbolIds: number[] = [2, 3, 4, 5];
    public static lowValueSymbolIds: number[] = [6, 7, 8, 9];
    public static symbolIds: string[] = ['sym_musicalnotes1', 'sym_wild', 'sym_basculohead', 'sym_slotmachine', 'sym_plane', 'sym_bike', 'sym_gate', 'sym_monitor', 'sym_dirtypan', 'sym_mop'];

    public static symbolsPerReel: number = 5;
    public static totalReel: number = 5;
    public static reelWidth: number = 169;
    public static symbolHeight: number = 166.2;

    public static START_SPIN: string = "START_SPIN";
    public static FG_START_SPIN: string = "FG_START_SPIN";
    public static SET_RESPONSE_AT_REEL: string = "SET_RESPONSE_AT_REEL";
    public static FG_SET_RESPONSE_AT_REEL: string = "FG_SET_RESPONSE_AT_REEL";
    public static PAYTABLE_NAV_BTN_CLICKED: string = "PAYTABLE_NAV_BTN_CLICKED";
    public static PAYTABLE_CROSS_BTN_CLICKED: string = "PAYTABLE_CROSS_BTN_CLICKED";
    public static ENABLE_INFO_BUTTON: string = "ENABLE_INFO_BUTTON";
    public static INFO_BTN_CLICKED: string = "INFO_BTN_CLICKED";
    public static SPIN_STOPPED: string = "SPIN_STOPPED";
    public static FG_SPIN_STOPPED: string = "FG_SPIN_STOPPED";
    public static PLAY_DROP_REEL: string = "PLAY_DROP_REEL";
    public static FG_PLAY_DROP_REEL: string = "FG_PLAY_DROP_REEL";
    public static PLAY_ANIMATED_WIN_SYMBOL: string = "PLAY_ANIMATED_WIN_SYMBOL";
    public static FG_PLAY_ANIMATED_WIN_SYMBOL: string = "FG_PLAY_ANIMATED_WIN_SYMBOL";
    public static UPDATE_VIEW_ON_REEL: string = "UPDATE_VIEW_ON_REEL";
    public static FG_UPDATE_VIEW_ON_REEL: string = "FG_UPDATE_VIEW_ON_REEL";
    public static PLAY_BIG_WIN: string = "PLAY_BIG_WIN";
    public static PLAY_FG_BIG_WIN: string = "PLAY_FG_BIG_WIN";
    public static ON_SHOW_NEXT_WIN_PRESENTAION: string = "ON_SHOW_NEXT_WIN_PRESENTAION";
    public static FG_ON_SHOW_NEXT_WIN_PRESENTAION: string = "FG_ON_SHOW_NEXT_WIN_PRESENTAION";

    public static SHOW_NEXT_RANDOM_WIN_PRESENTAION: string = "SHOW_NEXT_RANDOM_WIN_PRESENTAION";
    public static FG_SHOW_NEXT_RANDOM_WIN_PRESENTAION: string = "FG_SHOW_NEXT_RANDOM_WIN_PRESENTAION";

    public static PLAY_STOP_SPIN: string = "PLAY_STOP_SPIN";
    public static FG_PLAY_STOP_SPIN: string = "FG_PLAY_STOP_SPIN";
    public static PLAY_SHUFFLE_REEL: string = "PLAY_SHUFFLE_REEL";
    public static FG_PLAY_SHUFFLE_REEL: string = "FG_PLAY_SHUFFLE_REEL";
    public static UPDATE_WIN_METER: string = "UPDATE_WIN_METER";
    public static FG_UPDATE_WIN_METER: string = "FG_UPDATE_WIN_METER";
    public static UPDATE_FREEGAME_LEFT_METER: string = "UPDATE_FREEGAME_LEFT_METER";
    public static UPDATE_LINE_WIN_METER: string = "UPDATE_LINE_WIN_METER";
    public static FG_UPDATE_LINE_WIN_METER: string = "FG_UPDATE_LINE_WIN_METER";
    public static UPDATE_AUTOPLAY_METER: string = "UPDATE_AUTOPLAY_METER";
    public static RESET_AUTOPLAY_METER: string = "RESET_AUTOPLAY_METER";
    public static UPDATE_BET_METER: string = "UPDATE_BET_METER";
    public static ENABLE_DISABLE_MINUS_BTN: string = "ENABLE_DISABLE_MINUS_BTN";
    public static ENABLE_DISABLE_PLUS_BTN: string = "ENABLE_DISABLE_PLUS_BTN";
    public static CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN: string = "CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN";
    public static RESET_WIN_METER: string = "RESET_WIN_METER";
    public static FG_RESET_WIN_METER: string = "FG_RESET_WIN_METER";
    public static UPDATE_BALANCE: string = "UPDATE_BALANCE";
    public static UPDATE_BALANCE_TEXT: string = "UPDATE_BALANCE_TEXT";

    public static FG_UPDATE_BALANCE: string = "FG_UPDATE_BALANCE";
    public static FG_UPDATE_BALANCE_TEXT: string = "FG_UPDATE_BALANCE_TEXT";

    public static ENABLE_DISABLE_CHEAT_PANEL: string = "ENABLE_DISABLE_CHEAT_PANEL";
    public static START_AUTOPLAY: string = "START_AUTOPLAY";
    public static DISABLE_ALL_BUTTON: string = "DISABLE_ALL_BUTTON";
    public static FG_DISABLE_ALL_BUTTON: string = "FG_DISABLE_ALL_BUTTON";
    public static DISABLE_AUTOPLAY_BUTTON: string = "DISABLE_AUTOPLAY_BUTTON";
    public static ENABLE_ALL_BUTTON: string = "ENABLE_ALL_BUTTON";
    public static FG_ENABLE_ALL_BUTTON: string = "FG_ENABLE_ALL_BUTTON";
    public static ENABLE_AUTOPLAY_BUTTON: string = "ENABLE_AUTOPLAY_BUTTON";
    public static ENABLE_AUTOPLAY_METER_VIEW: string = "ENABLE_AUTOPLAY_METER_VIEW";
    public static UPDATE_PENTAGONAL_METER: string = "UPDATE_PENTAGONAL_METER";
    public static FG_UPDATE_PENTAGONAL_METER: string = "FG_UPDATE_PENTAGONAL_METER";
    public static START_ZWOOM_FEATURE: string = "START_ZWOOM_FEATURE";
    public static SHOW_RANDOM_FEATURE_POPUP: string = "SHOW_RANDOM_FEATURE_POPUP";
    public static FG_SHOW_RANDOM_FEATURE_POPUP: string = "FG_SHOW_RANDOM_FEATURE_POPUP";
    public static SHOW_HIDE_BASEGAME: string = "SHOW_HIDE_BASEGAME";
    public static SET_RESIZE_WITH_REELS: string = "SET_RESIZE_WITH_REELS";
    public static FG_SET_RESIZE_WITH_REELS: string = "FG_SET_RESIZE_WITH_REELS";
    public static INIT_BASEGAME: string = "INIT_BASEGAME";
    public static INIT_FREEGAME: string = "INIT_FREEGAME";
    public static BASE_GAME: string = "basegame";
    public static FREE_Game: string = "freegame";

    //-----------------Win Animation BaseGame----------------
    public static CHECK_AUTOPLAY_COUNT: number = 0;
    public static ANIMATE_WIN_SYMBOL: number = 1;
    public static RECHECK_CASCADE_WIN: number = 2;
    public static CHECK_PLAY_RANDOM_FEATURE: number = 3;
    public static RECHECK_WIN: number = 4;
    public static RECHECK_RANDOM_FEATURE: number = 5;
    public static BIG_WIN: number = 6;
    public static CHECK_AUTOPLAY: number = 7;
    public static ENABLE_BUTTON_PLAY: number = 8;

    //-------------Win Animation Freegame----------------
    public static FG_ANIMATE_WIN_SYMBOL: number = 0;
    public static FG_RECHECK_CASCADE_WIN: number = 1;
    public static FG_CHECK_PLAY_RANDOM_FEATURE: number = 2;
    public static FG_RECHECK_WIN: number = 3;
    public static FG_RECHECK_RANDOM_FEATURE: number = 4;
    public static FG_BIG_WIN: number = 5;
    public static FG_DO_NEXT_SPIN_IF_REQUIRED: number = 6;
    public static FG_HIDE_FREEGAME_VIEW_AND_SHOW_BASEGAME_VIEW: number = 7;
    //---------

    //-----------------Random Feature----------------
    public static RANDOM_FEATURE_ZWOOM: string = "RANDOM_FEATURE_ZWOOM";
    public static RANDOM_FEATURE_CRIPAZIONE: string = "RANDOM_FEATURE_CRIPAZIONE";
    public static RANDOM_FEATURE_PISTOLE: string = "RANDOM_FEATURE_PISTOLE";

    public static RANDOM_FEATURES_LIST: string[] = [CommonConfig.RANDOM_FEATURE_ZWOOM, CommonConfig.RANDOM_FEATURE_CRIPAZIONE, CommonConfig.RANDOM_FEATURE_PISTOLE];


    public static TOTAL_ANIMATION_LENGTH: number = 5;

    private currentWinAnimationIndex: number = 0;
    private currentRandomWinAnimationIndex: number = 0;
    private currentFGWinAnimationIndex: number = 0;
    private incrementForLargeWin: number = 0;

    private bet: number = 1;
    private currentWinAmount: number = 0;
    private freeSpinsLeftValue: number = 10;
    private lineWinAmount: number = 0;
    private currentBetIndex: number = 0;
    private balance: number = 5000;
    private autoplayCount: number = 25;
    private isAutoplay: boolean = false;
    private totalWinSymbolCount: number = 0;
    private currentState: string = "basegame";
    private currentRadomFeatureList: string[] = [];
    private isRandomFeatureState: boolean = false;
    private currentFGRadomFeatureList: string[] = [];
    private isFGRandomFeatureState: boolean = false;

    private symbolWinData: SymbolWinData = {
        0: {
            4: 3, 5: 6, 6: 12, 7: 12, 8: 24, 9: 24, 10: 48, 11: 48, 12: 75, 13: 75, 14: 75, 15: 300
        },
        1: {
            4: 3, 5: 6, 6: 12, 7: 12, 8: 24, 9: 24, 10: 48, 11: 48, 12: 75, 13: 75, 14: 75, 15: 300
        },
        2: {
            4: 3, 5: 6, 6: 12, 7: 12, 8: 24, 9: 24, 10: 48, 11: 48, 12: 75, 13: 75, 14: 75, 15: 300
        },
        3: {
            4: 3, 5: 6, 6: 12, 7: 12, 8: 24, 9: 24, 10: 48, 11: 48, 12: 75, 13: 75, 14: 75, 15: 300
        },
        4: {
            4: 2.25, 5: 4.5, 6: 9, 7: 9, 8: 18, 9: 18, 10: 36, 11: 36, 12: 45, 13: 45, 14: 45, 15: 180
        },
        5: {
            4: 1.5, 5: 3, 6: 6, 7: 6, 8: 12, 9: 12, 10: 24, 11: 24, 12: 30, 13: 30, 14: 30, 15: 120
        },
        6: {
            4: 0.75, 5: 1.5, 6: 3, 7: 3, 8: 6, 9: 6, 10: 12, 11: 12, 12: 15, 13: 15, 14: 15, 15: 60
        },
        7: {
            4: 0.45, 5: 0.75, 6: 1.2, 7: 1.2, 8: 2.4, 9: 2.4, 10: 4.8, 11: 4.8, 12: 6, 13: 6, 14: 6, 15: 15
        },
        8: {
            4: 0.3, 5: 0.6, 6: 0.9, 7: 0.9, 8: 1.8, 9: 1.8, 10: 3.6, 11: 3.6, 12: 4.5, 13: 4.5, 14: 4.5, 15: 12
        },
        9: {
            4: 0.3, 5: 0.45, 6: 0.75, 7: 0.75, 8: 1.35, 9: 1.35, 10: 2.7, 11: 2.7, 12: 3.3, 13: 3.3, 14: 3.3, 15: 9
        },
        10: {
            4: 0.15, 5: 0.3, 6: 0.45, 7: 0.45, 8: 0.9, 9: 0.9, 10: 1.8, 11: 1.8, 12: 2.25, 13: 2.25, 14: 2.25, 15: 6
        },
    }

    public static BET_ARRAY: number[] = [0.10, 0.20, 0.30, 0.40, 0.50, 0.8, 1.0, 1.50, 2.00, 2.50, 3.00, 4.00, 5.00, 6.00, 8.00, 10.00,
        15.00, 20.00, 25.00, 30.00, 40.00, 50.00, 60.00, 80.00, 100.00, 150.00, 200.00, 250.00, 300.00, 400.00, 500.00];

    private winGrid: Map<number, Set<string>> = new Map();

    private winGridFreeGame: Map<number, Set<string>> = new Map();
    private currentFGRandomWinAnimationIndex: number = 0;

    private randomWildGridIds: number[] = [];

    public setCurrentRadomFeatureList(value: string[]): void {
        this.currentRadomFeatureList = value;
    }

    public getCurrentRadomFeatureList(): string[] {
        return this.currentRadomFeatureList;
    }

    public setCurrentFGRadomFeatureList(value: string[]): void {
        this.currentFGRadomFeatureList = value;
    }

    public getCurrentFGRadomFeatureList(): string[] {
        return this.currentFGRadomFeatureList;
    }


    public SetCurrentWinAnimationIndex(value: number): void {
        if (value === 0) {
            console.log("SetCurrentWinAnimationIndex", value);
        }
        this.currentWinAnimationIndex = value;
    }

    public getCurrentWinAnimationIndex(): number {
        return this.currentWinAnimationIndex;
    }

    public setCurrentRandomWinAnimationIndex(value: number): void {
        this.currentRandomWinAnimationIndex = value;
    }

    public getCurrentRandomWinAnimationIndex(): number {
        return this.currentRandomWinAnimationIndex;
    }

    public setCurrentFGRandomWinAnimationIndex(value: number): void {
        this.currentFGRandomWinAnimationIndex = value;
    }

    public getCurrentFGRandomWinAnimationIndex(): number {
        return this.currentFGRandomWinAnimationIndex;
    }

    public setCurrentFGWinAnimationIndex(value: number): void {
        this.currentFGWinAnimationIndex = value;
    }

    public getCurrentFGWinAnimationIndex(): number {
        return this.currentFGWinAnimationIndex;
    }

    public setCurrentState(value: string): void {
        this.currentState = value;
    }

    public getCurrentState(): string {
        return this.currentState;
    }


    private winningSymbolIdFromUser: number = 12;
    private winningSymbolIds: string[][] = [['12'], ['12'], ['12']];
    private view: number[][] = [];
    private viewFreeGame: number[][] = [];
    private oldView: number[][] = [];
    private winReelIds: number[] = [];
    private winReelIdsFreeGame: number[] = [];
    private cheatType: string = "";



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

    public setRandomWildGridIds(value: number[]): void {
        this.randomWildGridIds = value;
    }

    public getRandomWildGridIds(): number[] {
        return this.randomWildGridIds;
    }

    public setIsRandomFeatureState(value: boolean): void {
        this.isRandomFeatureState = value;
    }

    public getIsRandomFeatureState(): boolean {
        return this.isRandomFeatureState;
    }

    public setIsFGRandomFeatureState(value: boolean): void {
        this.isFGRandomFeatureState = value;
    }

    public getIsFGRandomFeatureState(): boolean {
        return this.isFGRandomFeatureState;
    }

    public static NormalWinResponse: number[][] = [
        [4, 5, 4, 6, 3],
        [2, 6, 4, 5, 4],
        [4, 4, 3, 3, 4],
        [6, 3, 3, 4, 0],
        [3, 0, 4, 5, 4]];

    public static NormalWinResponse2: number[][] = [
        [4, 5, 4, 6, 3],
        [2, 6, 4, 4, 4],
        [4, 4, 3, 3, 4],
        [6, 3, 3, 4, 0],
        [3, 0, 4, 3, 4]
    ];

    public static NormalWinResponse3: number[][] = [
        [4, 5, 4, 6, 3],
        [2, 6, 5, 5, 4],
        [4, 3, 3, 3, 4],
        [6, 2, 3, 4, 0],
        [3, 0, 3, 5, 4]
    ];
    public static NormalWinResponse4: number[][] =
        [[4, 5, 4, 6, 3],
        [2, 6, 5, 5, 4],
        [4, 3, 3, 3, 4],
        [6, 2, 3, 4, 0],
        [3, 0, 3, 5, 4]];
    public static NormalWinResponse5: number[][] =
        [[4, 5, 4, 6, 3],
        [2, 6, 5, 5, 4],
        [4, 3, 3, 3, 4],
        [6, 2, 3, 4, 4],
        [3, 0, 3, 4, 4]];

    private winResponses: number[][][] = [CommonConfig.NormalWinResponse, CommonConfig.NormalWinResponse2, CommonConfig.NormalWinResponse3, CommonConfig.NormalWinResponse4, CommonConfig.NormalWinResponse5]

    public static reels: number[][] = [
        [6, 7, 2, 3, 1, 8, 9, 4, 5, 0, 6, 3, 7, 2, 8, 5, 9, 1, 4, 7, 6, 3, 8, 4, 2, 9, 7, 1, 6, 5,
            3, 9, 8, 0, 4, 2, 1, 7, 6, 5, 3, 4, 9, 2, 8, 5, 1, 0, 6, 7, 3, 8, 2, 9, 4, 1, 7, 6, 5, 0],

        [3, 8, 9, 1, 2, 7, 6, 4, 0, 5, 2, 9, 1, 8, 3, 6, 7, 4, 5, 6, 3, 0, 9, 1, 7, 8, 5, 2, 4, 6,
            9, 3, 7, 1, 4, 8, 0, 2, 5, 6, 3, 9, 8, 1, 4, 7, 0, 5, 2, 6, 3, 8, 4, 9, 5, 1, 7, 2, 6, 0],

        [5, 6, 3, 2, 1, 8, 9, 0, 4, 7, 5, 2, 8, 3, 6, 9, 1, 7, 4, 6, 5, 3, 9, 1, 8, 4, 2, 7, 0, 5,
            9, 3, 6, 1, 4, 8, 7, 2, 5, 6, 3, 0, 7, 9, 4, 2, 8, 1, 6, 5, 3, 4, 9, 8, 1, 7, 2, 6, 5, 0],

        [7, 4, 6, 1, 5, 8, 3, 0, 2, 9, 6, 4, 7, 1, 8, 3, 9, 2, 5, 6, 7, 4, 0, 9, 3, 1, 6, 5, 2, 8,
            4, 7, 0, 3, 9, 1, 6, 2, 8, 5, 4, 7, 9, 3, 1, 0, 6, 5, 2, 4, 8, 3, 7, 1, 9, 6, 2, 5, 4, 0],

        [2, 5, 9, 1, 4, 7, 8, 3, 0, 6, 5, 3, 2, 8, 4, 7, 1, 9, 6, 5, 2, 3, 0, 8, 9, 4, 1, 7, 6, 5,
            4, 9, 3, 1, 8, 6, 0, 7, 5, 2, 4, 8, 9, 3, 6, 0, 1, 7, 4, 5, 8, 2, 9, 6, 0, 3, 7, 1, 5, 4]
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

    public generateRandomView(): number[][] {
        this.incrementForLargeWin = 0;
        const view: number[][] = [];
        if (this.getCheatType().length && this.getCheatType() === "normal") {
            let winresponse = this.winResponses[Math.floor(Math.random() * this.winResponses.length)];
            // winresponse = CommonConfig.NormalWinResponse4;
            return this.returnCloneArray(winresponse);
        } else if (this.getCheatType().length && this.getCheatType() === "large") {
            let winresponse = CommonConfig.NormalWinResponse3;
            return this.returnCloneArray(winresponse);
        }
        this.setCheatType("");
        // Loop through each reel to pick random positions
        for (let reelIndex = 0; reelIndex < CommonConfig.reels.length; reelIndex++) {
            const reel = CommonConfig.reels[reelIndex];

            const startPosition = Math.floor(Math.random() * reel.length);

            const reelSymbols = [
                reel[startPosition % reel.length],
                reel[(startPosition + 1) % reel.length],
                reel[(startPosition + 2) % reel.length],
                reel[(startPosition + 3) % reel.length],
                reel[(startPosition + 4) % reel.length]
            ];

            view.push(reelSymbols);
        }
        // console.log(view);
        return view;
    }

    public setBet(value: number): void {
        this.bet = value;
    }

    public getBet(): number {
        return this.bet;
    }

    public setLineWinAmount(value: number): void {
        this.lineWinAmount = value;
    }

    public getLineWinAmount(): number {
        return this.lineWinAmount;
    }

    public setAutoplayCount(value: number): void {
        this.autoplayCount = value;
    }

    public getAutoplayCount(): number {
        return this.autoplayCount;
    }

    public setBalance(value: number): void {
        this.balance = value;
    }

    public getBalance(): number {
        return this.balance;
    }

    public setIsAutoplay(value: boolean): void {
        this.isAutoplay = value;
    }

    public getIsAutoplay(): boolean {
        return this.isAutoplay;
    }

    public setTotalWinSymbolCount(value: number): void {
        this.totalWinSymbolCount = value;
    }

    public getTotalWinSymbolCount(): number {
        return this.totalWinSymbolCount;
    }

    public setCurrentBetIndex(value: number): void {
        this.currentBetIndex = value;
    }

    public getCurrentBetIndex(): number {
        return this.currentBetIndex;
    }

    public setCurrentWinAmount(value: number): void {
        this.currentWinAmount = value;
    }

    public getCurrentWinAmount(): number {
        return this.currentWinAmount;
    }

    public setFreeSpinsLeftValue(value: number): void {
        if (value === 0) {
            console.log("G");
        }
        this.freeSpinsLeftValue = value;
    }

    public getFreeSpinsLeftValue(): number {
        return this.freeSpinsLeftValue;
    }

    public getWinAmount(id: number, winDataLength: number): number {
        let win: number = 0;
        if (this.symbolWinData[id]) {
            if (this.symbolWinData[id][winDataLength]) {
                win = this.symbolWinData[id][winDataLength] * this.getBet();
            }
        }
        return win;
    }

    public setCheatType(value: string): void {
        this.cheatType = value;
    }

    public getCheatType(): string {
        return this.cheatType;
    }

    public setWinReelIds(value: number[]): void {
        this.winReelIds = value
    }

    public getWinReelIds(): number[] {
        return this.winReelIds;
    }

    public setWinReelIdsFreeGame(value: number[]): void {
        this.winReelIdsFreeGame = value
    }

    public getWinReelIdsFreeGame(): number[] {
        return this.winReelIdsFreeGame;
    }

    public setOldView(value: number[][]): void {
        this.oldView = value
    }

    public getOldView(): number[][] {
        return this.oldView;
    }
    findWinningGroups(reel: number[][]): Map<number, Set<string>> {
        const rows = reel.length;
        const cols = reel[0].length;
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const directions = [
            [0, 1],  // Right
            [1, 0],  // Down
            [0, -1], // Left
            [-1, 0], // Up
        ];

        const result: Map<number, Set<string>> = new Map();

        function dfs(x: number, y: number, target: number, group: Set<string>) {
            if (x < 0 || y < 0 || x >= rows || y >= cols || visited[x][y]) return;
            if (reel[x][y] !== target && reel[x][y] !== 0) return;

            visited[x][y] = true;
            group.add(`${x},${y}`);

            for (const [dx, dy] of directions) {
                dfs(x + dx, y + dy, target, group);
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!visited[i][j] && reel[i][j] !== 1) {
                    const group: Set<string> = new Set();
                    dfs(i, j, reel[i][j], group);

                    if (group.size >= 4) {
                        if (!result.has(reel[i][j])) {
                            result.set(reel[i][j], new Set());
                        }
                        for (const pos of group) {
                            result.get(reel[i][j])?.add(pos);
                        }
                    }
                }
            }
        }

        return result;
    }

    // findWinningGroups(view: number[][]): Map<number, Set<string>> {
    //     const winningGroups: Map<number, Set<string>> = new Map();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // DFS to explore all connected cells with the same symbol or Wild symbol (0)
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>, wildUsed: boolean) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             visited.has(posKey)                          // Already visited
    //         ) return;

    //         const currentSymbol = view[r][c];

    //         // If it's the Wild symbol (0), allow it to replace a missing symbol
    //         if (currentSymbol === 0 && !wildUsed) {
    //             group.add(posKey); // Add wild to the group
    //             wildUsed = true;  // Mark the Wild symbol as used
    //         } else if (currentSymbol === symbol || currentSymbol === 0) {
    //             // If the symbol matches or it's a Wild symbol (0), proceed
    //             visited.add(posKey);
    //             group.add(posKey);

    //             // Explore neighbors in all 4 directions
    //             dfs(r + 1, c, symbol, group, wildUsed);
    //             dfs(r - 1, c, symbol, group, wildUsed);
    //             dfs(r, c + 1, symbol, group, wildUsed);
    //             dfs(r, c - 1, symbol, group, wildUsed);
    //         }
    //     }

    //     // Helper function to check a line (horizontal or vertical) for potential Wild symbol replacement
    //     function checkLineForWildSymbols(r: number, c: number, dx: number, dy: number, symbol: number): Set<string> {
    //         const linePositions = new Set<string>();
    //         let wildUsed = false;
    //         let symbolCount = 0;
    //         let checkR = r;
    //         let checkC = c;

    //         // Check in both directions
    //         while (checkR >= 0 && checkR < rows && checkC >= 0 && checkC < cols && symbolCount < 4) {
    //             const currentSymbol = view[checkR][checkC];
    //             if (currentSymbol === symbol || currentSymbol === 0) {
    //                 linePositions.add(`${checkR},${checkC}`);
    //                 if (currentSymbol === symbol) symbolCount++;
    //             } else if (currentSymbol === 0 && !wildUsed) {
    //                 wildUsed = true;
    //                 linePositions.add(`${checkR},${checkC}`);
    //                 symbolCount++;
    //             } else {
    //                 break;
    //             }
    //             checkR += dx;
    //             checkC += dy;
    //         }

    //         return symbolCount >= 4 ? linePositions : new Set<string>(); // Return only if valid line
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             let wildUsed = false;

    //             dfs(r, c, symbol, currentGroup, wildUsed);

    //             // If group has 4 or more connected symbols, add to winningGroups map
    //             if (currentGroup.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 const symbolGroup = winningGroups.get(symbol)!;
    //                 currentGroup.forEach(pos => symbolGroup.add(pos));
    //             }

    //             // Check horizontally and vertically for Wild symbol extension
    //             const horizontalLine = checkLineForWildSymbols(r, c, 1, 0, symbol); // Check horizontally (dx=1, dy=0)
    //             const verticalLine = checkLineForWildSymbols(r, c, 0, 1, symbol);   // Check vertically (dx=0, dy=1)

    //             // If we found a valid line with Wild symbol, add it to winningGroups
    //             if (horizontalLine.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 const symbolGroup = winningGroups.get(symbol)!;
    //                 horizontalLine.forEach(pos => symbolGroup.add(pos));
    //             }
    //             if (verticalLine.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 const symbolGroup = winningGroups.get(symbol)!;
    //                 verticalLine.forEach(pos => symbolGroup.add(pos));
    //             }
    //         }
    //     }

    //     return winningGroups;
    // }

    public setView(value: number[][]): void {
        this.view = value
    }

    public getView(): number[][] {
        return this.view;
    }

    public setViewFreeGame(value: number[][]): void {
        this.viewFreeGame = value
    }

    public getViewFreeGame(): number[][] {
        return this.viewFreeGame;
    }

    // findWinningGroups(view: number[][]): Map<number, Set<string>> {
    //     const winningGroups: Map<number, Set<string>> = new Map();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // DFS to explore all connected cells with the same symbol or Wild symbol (0)
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>, isWildUsed: boolean) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             visited.has(posKey)                          // Already visited
    //         ) return;

    //         const currentSymbol = view[r][c];

    //         // If it's the Wild symbol (0), mark it as used but allow it to replace other symbols
    //         if (currentSymbol === 0 && !isWildUsed) {
    //             group.add(posKey); // Add wild to the group
    //             isWildUsed = true;  // Mark the Wild symbol as used
    //         } else if (currentSymbol === symbol || currentSymbol === 0) {
    //             // If the symbol matches or it's a Wild symbol (0), proceed
    //             visited.add(posKey);
    //             group.add(posKey);

    //             // Explore neighbors in all 4 directions
    //             dfs(r + 1, c, symbol, group, isWildUsed);
    //             dfs(r - 1, c, symbol, group, isWildUsed);
    //             dfs(r, c + 1, symbol, group, isWildUsed);
    //             dfs(r, c - 1, symbol, group, isWildUsed);
    //         }
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             let isWildUsed = false;

    //             dfs(r, c, symbol, currentGroup, isWildUsed);

    //             // If group has 4 or more connected symbols, add to winningGroups map
    //             if (currentGroup.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 const symbolGroup = winningGroups.get(symbol)!;
    //                 currentGroup.forEach(pos => symbolGroup.add(pos));
    //             }

    //             // Special logic for checking 3 identical symbols + 1 Wild symbol
    //             if (currentGroup.size === 3) {
    //                 // Check horizontally and vertically for wild symbol extension
    //                 const potentialWins = [
    //                     { dx: 1, dy: 0 }, // Horizontal check
    //                     { dx: 0, dy: 1 }  // Vertical check
    //                 ];

    //                 for (const { dx, dy } of potentialWins) {
    //                     const wildPositions: Set<string> = new Set();

    //                     // Check in the forward direction (dx, dy)
    //                     let count = 0;
    //                     let wildFound = false;
    //                     let checkR = r;
    //                     let checkC = c;

    //                     while (count < 3 && checkR >= 0 && checkR < rows && checkC >= 0 && checkC < cols) {
    //                         const currentPos = `${checkR},${checkC}`;
    //                         if (view[checkR][checkC] === 0) {
    //                             wildFound = true;
    //                             wildPositions.add(currentPos);
    //                         } else if (view[checkR][checkC] === symbol) {
    //                             count++;
    //                         }
    //                         checkR += dx;
    //                         checkC += dy;
    //                     }

    //                     // Check if the 3 symbols + 1 Wild (ID 0) form a valid group
    //                     if (count === 3 && wildFound) {
    //                         currentGroup.forEach(pos => wildPositions.add(pos)); // Add 3 symbols with the Wild
    //                         if (!winningGroups.has(symbol)) {
    //                             winningGroups.set(symbol, new Set());
    //                         }
    //                         const symbolGroup = winningGroups.get(symbol)!;
    //                         wildPositions.forEach(pos => symbolGroup.add(pos));
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     return winningGroups;
    // }


    public setWinGrid(value: Map<number, Set<string>>): void {
        this.winGrid = value
    }

    public getWinGrid(): Map<number, Set<string>> {
        return this.winGrid;
    }

    public setWinGridFreeGame(value: Map<number, Set<string>>): void {
        this.winGridFreeGame = value
    }

    public getWinGridFreeGame(): Map<number, Set<string>> {
        return this.winGridFreeGame;
    }

    replaceZerosWithPriority(response: number[][]): number[][] {
        const rows = response.length;
        const cols = response[0].length;

        // Helper function to get valid neighbors and prioritize their values
        function getPrioritizedNeighborValues(row: number, col: number): number[] {
            const neighbors: number[] = [];

            const directions = [
                [-1, 0], // up
                [1, 0],  // down
                [0, -1], // left
                [0, 1],  // right
            ];

            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;

                // Check if neighbor is within bounds and not a 0
                if (
                    newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    response[newRow][newCol] !== 0
                ) {
                    neighbors.push(response[newRow][newCol]);
                }
            }

            // Sort neighbors to prioritize lower values
            neighbors.sort((a, b) => a - b);
            return neighbors;
        }

        // Keep replacing zeros until no zeros are left
        let hasZero = true;
        while (hasZero) {
            hasZero = false;
            const result = response.map(row => [...row]);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (response[row][col] === 0) {
                        const prioritizedNeighbors = getPrioritizedNeighborValues(row, col);
                        if (prioritizedNeighbors.length > 0) {
                            // Replace 0 with the smallest prioritized neighbor value
                            result[row][col] = prioritizedNeighbors[0];
                            hasZero = true;
                        }
                    }
                }
            }

            response = result;
        }

        return response;
    }

    // findWinningGroups(view: number[][]): Map<number, Set<string>> {
    //     const winningGroups: Map<number, Set<string>> = new Map();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // DFS to explore all connected cells with the same symbol
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             view[r][c] !== symbol ||                // Different symbol
    //             visited.has(posKey)                        // Already visited
    //         ) return;

    //         // Mark as visited and add to current group
    //         visited.add(posKey);
    //         group.add(posKey);

    //         // Explore neighbors in all 4 directions
    //         dfs(r + 1, c, symbol, group);
    //         dfs(r - 1, c, symbol, group);
    //         dfs(r, c + 1, symbol, group);
    //         dfs(r, c - 1, symbol, group);
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             dfs(r, c, symbol, currentGroup);

    //             // If group has 4 or more connected symbols, add to winningGroups map
    //             if (currentGroup.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 // Add the positions of the current group to the symbol's set in the map
    //                 const symbolGroup = winningGroups.get(symbol)!;
    //                 currentGroup.forEach(pos => symbolGroup.add(pos));
    //             }
    //         }
    //     }

    //     return winningGroups;
    // }


    // findWinningGroups(view: number[][]): Map<number, Set<string[]>> {
    //     const winningGroups: Map<number, Set<string[]>> = new Map();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // DFS to explore all connected cells with the same symbol
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             view[r][c] !== symbol ||                   // Different symbol
    //             visited.has(posKey)                        // Already visited
    //         ) return;

    //         // Mark as visited and add to current group
    //         visited.add(posKey);
    //         group.add(posKey);

    //         // Explore neighbors in all 4 directions
    //         dfs(r + 1, c, symbol, group);
    //         dfs(r - 1, c, symbol, group);
    //         dfs(r, c + 1, symbol, group);
    //         dfs(r, c - 1, symbol, group);
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             dfs(r, c, symbol, currentGroup);

    //             // If group has 4 or more connected symbols, add it to winningGroups map
    //             if (currentGroup.size >= 4) {
    //                 if (!winningGroups.has(symbol)) {
    //                     winningGroups.set(symbol, new Set());
    //                 }
    //                 winningGroups.get(symbol)!.add([...currentGroup]);
    //             }
    //         }
    //     }

    //     return winningGroups;
    // }


    // findWinningGroups(view: number[][]): Set<string[]> {
    //     const winningGroups: Set<string[]> = new Set();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // DFS to explore all connected cells with the same symbol
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             view[r][c] !== symbol ||                   // Different symbol
    //             visited.has(posKey)                        // Already visited
    //         ) return;

    //         // Mark as visited and add to current group
    //         visited.add(posKey);
    //         group.add(posKey);

    //         // Explore neighbors in all 4 directions
    //         dfs(r + 1, c, symbol, group);
    //         dfs(r - 1, c, symbol, group);
    //         dfs(r, c + 1, symbol, group);
    //         dfs(r, c - 1, symbol, group);
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             dfs(r, c, symbol, currentGroup);

    //             // If group has 4 or more connected symbols, add it to winningGroups
    //             if (currentGroup.size >= 4) {
    //                 winningGroups.add([...currentGroup]); // Convert the set to an array and add it to winningGroups
    //             }
    //         }
    //     }

    //     return winningGroups;
    // }


    // findWinningGroups(view: number[][]): Set<string> {
    //     const winningSymbols: Set<string> = new Set();
    //     const rows = view.length;
    //     const cols = view[0].length;
    //     const visited = new Set<string>();

    //     // Helper function to add a position to winningSymbols
    //     function addToWinGroup(r: number, c: number) {
    //         winningSymbols.add(`${r},${c}`);
    //     }

    //     // DFS to explore all connected cells with the same symbol
    //     function dfs(r: number, c: number, symbol: number, group: Set<string>) {
    //         const posKey = `${r},${c}`;
    //         if (
    //             r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
    //             view[r][c] !== symbol ||                   // Different symbol
    //             visited.has(posKey)                        // Already visited
    //         ) return;

    //         // Mark as visited and add to current group
    //         visited.add(posKey);
    //         group.add(posKey);

    //         // Explore neighbors in all 4 directions
    //         dfs(r + 1, c, symbol, group);
    //         dfs(r - 1, c, symbol, group);
    //         dfs(r, c + 1, symbol, group);
    //         dfs(r, c - 1, symbol, group);
    //     }

    //     // Traverse each cell to find connected groups of 4 or more
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < cols; c++) {
    //             const symbol = view[r][c];
    //             if (symbol === null || visited.has(`${r},${c}`)) continue;

    //             // Initialize a new group to collect connected symbols
    //             const currentGroup: Set<string> = new Set();
    //             dfs(r, c, symbol, currentGroup);

    //             // If group has 4 or more connected symbols, add to winningSymbols
    //             if (currentGroup.size >= 4) {
    //                 currentGroup.forEach(pos => winningSymbols.add(pos));
    //             }
    //         }
    //     }

    //     return winningSymbols;
    // }


    cascade(view: number[][], winningSymbols: Set<string>): number[][] {
        // Explode symbols by setting them to null
        winningSymbols.forEach(pos => {
            const [r, c] = pos.split(',').map(Number);
            view[r][c] = NaN;
        });
        // console.log(view);
        const outputArray = view.map(innerArray => {
            // Filter out null values, then add them to the beginning of the array
            const nonNullValues = innerArray.filter(value => !isNaN(value));
            const nullValues = innerArray.filter(value => isNaN(value));
            return [...nullValues, ...nonNullValues];
        });
        // this.setOldView(outputArray);
        // console.log(outputArray);
        for (let i: number = 0; i < outputArray.length; i++) {
            for (let j: number = 0; j < outputArray[i].length; j++) {
                if (isNaN(outputArray[i][j])) {
                    outputArray[i][j] = this.getRandomSymbol(i);
                }
            }
        }
        // console.log(outputArray);
        this.incrementForLargeWin++;
        return outputArray;
    }

    private returnCloneArray(value: number[][]): number[][] {
        const newArray: number[][] = [];
        for (let i: number = 0; i < value.length; i++) {
            let subArray: number[] = [];
            for (let j: number = 0; j < value[i].length; j++) {
                subArray.push(value[i][j]);
            }
            newArray.push(subArray);
        }
        return newArray;
    }

    getRandomSymbol(reelIndex: number): number {
        if (this.getCheatType().length && this.getCheatType() === "large" && this.incrementForLargeWin < 1) {
            return 3;
        }
        const reel = CommonConfig.reels[reelIndex];
        return reel[Math.floor(Math.random() * reel.length)];
    }

    calculateCascadingWins(view: number[][]): number {
        let totalWins = 0;
        let cascadeCount = 0;

        while (true) {
            const winningSymbols = this.findWinningGroups(view);

            if (winningSymbols.size === 0) break;

            // console.log(`Cascade ${++cascadeCount} - Winning Symbols:`, winningSymbols);
            totalWins += winningSymbols.size;

            // Update the view with cascades
            // view = this.cascade(view, winningSymbols);
            // console.log(`View after Cascade ${cascadeCount}:`, view);
        }

        return totalWins;
    }

    setWinningAnimation(): void {

    }

}