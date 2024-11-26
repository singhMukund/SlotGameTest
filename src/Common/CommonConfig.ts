interface SymbolWinValues {
    [key: number]: number;
}

interface SymbolWinData {
    [key: number]: SymbolWinValues;
}

export class CommonConfig {
    protected static _the: CommonConfig;
    public static symbolIds: string[] = [
        'sym_bonus', 'sym_Scatter', 'sym_Wild',
        'sym_H1', 'sym_H2', 'sym_H3', 'sym_H4',
        'sym_L1', 'sym_L2', 'sym_L3', 'sym_L4', 'sym_L5',];

    public static symbolsPerReel: number = 5;
    public static totalReel: number = 5;
    public static reelWidth: number = 228.8;
    public static symbolHeight: number = 212.33;

    public static START_SPIN: string = "START_SPIN";
    public static SET_RESPONSE_AT_REEL: string = "SET_RESPONSE_AT_REEL";
    public static PAYTABLE_NAV_BTN_CLICKED: string = "PAYTABLE_NAV_BTN_CLICKED";
    public static PAYTABLE_CROSS_BTN_CLICKED: string = "PAYTABLE_CROSS_BTN_CLICKED";
    public static ENABLE_INFO_BUTTON: string = "ENABLE_INFO_BUTTON";
    public static INFO_BTN_CLICKED: string = "INFO_BTN_CLICKED";
    public static SPIN_STOPPED: string = "SPIN_STOPPED";
    public static PLAY_DROP_REEL: string = "PLAY_DROP_REEL";
    public static PLAY_ANIMATED_WIN_SYMBOL: string = "PLAY_ANIMATED_WIN_SYMBOL";
    public static PLAY_BIG_WIN: string = "PLAY_BIG_WIN";
    public static ON_SHOW_NEXT_WIN_PRESENTAION: string = "ON_SHOW_NEXT_WIN_PRESENTAION";
    public static PLAY_STOP_SPIN: string = "PLAY_STOP_SPIN";
    public static PLAY_SHUFFLE_REEL: string = "PLAY_SHUFFLE_REEL";
    public static UPDATE_WIN_METER: string = "UPDATE_WIN_METER";
    public static UPDATE_LINE_WIN_METER: string = "UPDATE_LINE_WIN_METER";
    public static UPDATE_AUTOPLAY_METER: string = "UPDATE_AUTOPLAY_METER";
    public static RESET_AUTOPLAY_METER: string = "RESET_AUTOPLAY_METER";
    public static UPDATE_BET_METER: string = "UPDATE_BET_METER";
    public static ENABLE_DISABLE_MINUS_BTN: string = "ENABLE_DISABLE_MINUS_BTN";
    public static ENABLE_DISABLE_PLUS_BTN: string = "ENABLE_DISABLE_PLUS_BTN";
    public static CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN: string = "CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN";
    public static RESET_WIN_METER: string = "RESET_WIN_METER";
    public static UPDATE_BALANCE: string = "UPDATE_BALANCE";
    public static UPDATE_BALANCE_TEXT: string = "UPDATE_BALANCE_TEXT";
    public static ENABLE_DISABLE_CHEAT_PANEL: string = "ENABLE_DISABLE_CHEAT_PANEL";
    public static START_AUTOPLAY: string = "START_AUTOPLAY";
    public static DISABLE_ALL_BUTTON: string = "DISABLE_ALL_BUTTON";
    public static DISABLE_AUTOPLAY_BUTTON: string = "DISABLE_AUTOPLAY_BUTTON";
    public static ENABLE_ALL_BUTTON: string = "DISABLE_ALL_BUTTON";
    public static ENABLE_AUTOPLAY_BUTTON: string = "ENABLE_AUTOPLAY_BUTTON";
    public static ENABLE_AUTOPLAY_METER_VIEW: string = "ENABLE_AUTOPLAY_METER_VIEW";
    public static UPDATE_PENTAGONAL_METER: string = "UPDATE_PENTAGONAL_METER";
    public static CHECK_AUTOPLAY_COUNT: number = 0;
    public static CHECK_WIN: number = 1;
    public static ANIMATE_WIN_SYMBOL: number = 2;
    public static RECHECK_CASCADE_WIN: number = 3;
    public static BIG_WIN: number = 4;
    public static CHECK_AUTOPLAY: number = 5;
    public static ENABLE_BUTTON_PLAY: number = 6;

    public static TOTAL_ANIMATION_LENGTH: number = 5;

    private currentWinAnimationIndex: number = 0;
    private incrementForLargeWin: number = 0;

    private bet: number = 1;
    private currentWinAmount: number = 0;
    private lineWinAmount: number = 0;
    private currentBetIndex: number = 0;
    private balance: number = 5000;
    private autoplayCount: number = 25;
    private isAutoplay: boolean = false;
    private totalWinSymbolCount: number = 0;

    private symbolWinData: SymbolWinData = {
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

    public SetCurrentWinAnimationIndex(value: number): void {
        this.currentWinAnimationIndex = value;
    }

    public getCurrentWinAnimationIndex(): number {
        return this.currentWinAnimationIndex;
    }


    private winningSymbolIdFromUser: number = 12;
    private winningSymbolIds: string[][] = [['12'], ['12'], ['12']];
    private view: number[][] = [];
    private oldView: number[][] = [];
    private winReelIds: number[] = [];
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
    public static NormalWinResponse: number[][] = [
        [4, 5, 4, 6, 3],
        [2, 6, 4, 8, 4],
        [4, 4, 3, 3, 4],
        [6, 3, 3, 4, 0],
        [3, 0, 4, 9, 4]];

    public static NormalWinResponse2: number[][] = [
        [4, 5, 4, 6, 3],
        [2, 6, 4, 8, 4],
        [4, 4, 3, 3, 4],
        [6, 3, 3, 4, 0],
        [3, 0, 4, 9, 4]
    ];

    public static NormalWinResponse3: number[][] = [
        [4, 5, 3, 6, 3],
        [2, 6, 3, 8, 4],
        [3, 3, 3, 3, 3],
        [6, 3, 3, 4, 0],
        [3, 0, 3, 9, 4]
    ];
    public static NormalWinResponse4: number[][] =
        [[4, 5, 4, 6, 3],
        [2, 6, 5, 8, 4],
        [4, 3, 3, 3, 4],
        [6, 2, 3, 4, 0],
        [3, 0, 3, 9, 4]];
    public static NormalWinResponse5: number[][] =
        [[4, 5, 4, 6, 3],
        [2, 6, 5, 8, 4],
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
            // winresponse = CommonConfig.NormalWinResponse5;
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

    public setOldView(value: number[][]): void {
        this.oldView = value
    }

    public getOldView(): number[][] {
        return this.oldView;
    }

    public setView(value: number[][]): void {
        this.view = value
    }

    public getView(): number[][] {
        return this.view;
    }

    public setWinGrid(value: Map<number, Set<string>>): void {
        this.winGrid = value
    }

    public getWinGrid(): Map<number, Set<string>> {
        return this.winGrid;
    }

    findWinningGroups(view: number[][]): Map<number, Set<string>> {
        const winningGroups: Map<number, Set<string>> = new Map();
        const rows = view.length;
        const cols = view[0].length;
        const visited = new Set<string>();

        // DFS to explore all connected cells with the same symbol
        function dfs(r: number, c: number, symbol: number, group: Set<string>) {
            const posKey = `${r},${c}`;
            if (
                r < 0 || r >= rows || c < 0 || c >= cols || // Out of bounds
                view[r][c] !== symbol ||                   // Different symbol
                visited.has(posKey)                        // Already visited
            ) return;

            // Mark as visited and add to current group
            visited.add(posKey);
            group.add(posKey);

            // Explore neighbors in all 4 directions
            dfs(r + 1, c, symbol, group);
            dfs(r - 1, c, symbol, group);
            dfs(r, c + 1, symbol, group);
            dfs(r, c - 1, symbol, group);
        }

        // Traverse each cell to find connected groups of 4 or more
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const symbol = view[r][c];
                if (symbol === null || visited.has(`${r},${c}`)) continue;

                // Initialize a new group to collect connected symbols
                const currentGroup: Set<string> = new Set();
                dfs(r, c, symbol, currentGroup);

                // If group has 4 or more connected symbols, add to winningGroups map
                if (currentGroup.size >= 4) {
                    if (!winningGroups.has(symbol)) {
                        winningGroups.set(symbol, new Set());
                    }
                    // Add the positions of the current group to the symbol's set in the map
                    const symbolGroup = winningGroups.get(symbol)!;
                    currentGroup.forEach(pos => symbolGroup.add(pos));
                }
            }
        }

        return winningGroups;
    }


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