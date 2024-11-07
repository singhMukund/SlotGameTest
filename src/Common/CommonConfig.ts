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
    public static SET_RESPONSE_AT_REEL: string = "SET_RESPONSE_AT_REEL";
    public static PAYTABLE_NAV_BTN_CLICKED: string = "PAYTABLE_NAV_BTN_CLICKED";
    public static PAYTABLE_CROSS_BTN_CLICKED: string = "PAYTABLE_CROSS_BTN_CLICKED";
    public static ENABLE_INFO_BUTTON: string = "ENABLE_INFO_BUTTON";
    public static INFO_BTN_CLICKED: string = "INFO_BTN_CLICKED";
    public static SPIN_STOPPED: string = "SPIN_STOPPED";
    public static PLAY_ANIMATED_WIN_SYMBOL: string = "PLAY_ANIMATED_WIN_SYMBOL";

    public static ON_SHOW_NEXT_WIN_PRESENTAION: string = "ON_SHOW_NEXT_WIN_PRESENTAION";
    public static PLAY_STOP_SPIN: string = "PLAY_STOP_SPIN";
    public static CHECK_WIN : number = 0;
    public static ANIMATE_WIN_SYMBOL : number = 1;
    public static CREATE_AND_UPDATE_CASCADE_VIEW : number = 2;
    public static PLAY_CASCADE_REEL_DROP_ANIMATION :number = 3;
    public static RECHECK_CASCADE_WIN : number = 4;

    public static TOTAL_ANIMATION_LENGTH : number = 5;

    private currentWinAnimationIndex : number = 0;

    private winGrid : Set<string> = new Set([]);

    public SetCurrentWinAnimationIndex(value : number) :void{
        this.currentWinAnimationIndex = value;
    }

    public getCurrentWinAnimationIndex() : number{
        return this.currentWinAnimationIndex;
    }


    private winningSymbolIdFromUser: number = 12;
    private winningSymbolIds: string[][] = [['12'], ['12'], ['12']];
    private view : number[][] = [];

    

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

    public static reels : number[][]= [
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
        const view: number[][] = [];
    
        // Loop through each reel to pick random positions
        for (let reelIndex = 0; reelIndex < CommonConfig.reels.length; reelIndex++) {
            const reel = CommonConfig.reels[reelIndex];
            
            const startPosition = Math.floor(Math.random() * reel.length);
            
            const reelSymbols = [
                reel[startPosition % reel.length],
                reel[(startPosition + 1) % reel.length],
                reel[(startPosition + 2) % reel.length]
            ];
    
             view.push(reelSymbols);
        }
    
        return view;
    }

    public setView(value : number[][]) :void{
        this.view = value
    }

    public getView() : number[][]{
        return this.view;
    }

    public setWinGrid(value : Set<string>) :void{
        this.winGrid = value
    }

    public getWinGrid() : Set<string>{
        return this.winGrid;
    }

    findWinningGroups(view: number[][]): Set<string> {
        const winningSymbols: Set<string> = new Set();
        const rows = view.length;
        const cols = view[0].length;
    
        // Helper function to add a position to winningSymbols
        function addToWinGroup(r: number, c: number) {
            winningSymbols.add(`${r},${c}`);
        }
    
        // Traverse each cell to check horizontal and vertical groups
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const symbol = view[r][c];
                if (symbol === null) continue;
    
                // Check horizontal
                let horGroup = [];
                for (let i = 0; i < 2 && c + i < cols; i++) {
                    if (view[r][c + i] === symbol) horGroup.push(`${r},${c + i}`);
                    else break;
                }
                if (horGroup.length >= 2) horGroup.forEach(pos => winningSymbols.add(pos));
    
                // Check vertical
                let vertGroup = [];
                for (let i = 0; i < 2 && r + i < rows; i++) {
                    if (view[r + i][c] === symbol) vertGroup.push(`${r + i},${c}`);
                    else break;
                }
                if (vertGroup.length >= 2) vertGroup.forEach(pos => winningSymbols.add(pos));
            }
        }
        return winningSymbols;
    }

    cascade(view: number[][], winningSymbols: Set<string>): number[][] {
        // Explode symbols by setting them to null
        winningSymbols.forEach(pos => {
            const [r, c] = pos.split(',').map(Number);
            view[r][c] = NaN;
        });
    
        // Cascade symbols
        for (let col = 0; col < view[0].length; col++) {
            let emptyRow = view.length - 1;
            for (let row = view.length - 1; row >= 0; row--) {
                if (view[row][col] !== null) {
                    view[emptyRow][col] = view[row][col];
                    if (emptyRow !== row) view[row][col] = NaN;
                    emptyRow--;
                }
            }
            // Fill new symbols at the top
            // for (let row = emptyRow; row >= 0; row--) {
            //     view[row][col] = this.getRandomSymbol(col);
            // }
        }
        console.log(view);
        const outputArray = view.map(innerArray => {
            // Filter out null values, then add them to the beginning of the array
            const nonNullValues = innerArray.filter(value => !isNaN(value));
            const nullValues = innerArray.filter(value => isNaN(value));
            return [...nullValues, ...nonNullValues];
        });
        

        console.log(outputArray);
    
        return outputArray;
    }

    getRandomSymbol(reelIndex: number): number {
        const reel = CommonConfig.reels[reelIndex];
        return reel[Math.floor(Math.random() * reel.length)];
    }

    calculateCascadingWins(view: number[][]): number {
        let totalWins = 0;
        let cascadeCount = 0;
    
        while (true) {
            const winningSymbols = this.findWinningGroups(view);
    
            if (winningSymbols.size === 0) break;
    
            console.log(`Cascade ${++cascadeCount} - Winning Symbols:`, winningSymbols);
            totalWins += winningSymbols.size;
    
            // Update the view with cascades
            view = this.cascade(view, winningSymbols);
            console.log(`View after Cascade ${cascadeCount}:`, view);
        }
    
        return totalWins;
    }

    setWinningAnimation(): void {

    }

}