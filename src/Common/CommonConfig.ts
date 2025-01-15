import { ISingleWinDetails } from "@/app/Interface/GameInterface";

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
  public static symbolIds: string[] = [
    "sym_musicalnotes1",
    "sym_wild",
    "sym_basculohead",
    "sym_slotmachine",
    "sym_plane",
    "sym_bike",
    "sym_gate",
    "sym_monitor",
    "sym_dirtypan",
    "sym_mop",
    "sym_3x3Wild"
  ];

  public static symbolsPerReel: number = 5;
  public static totalReel: number = 5;
  public static reelWidth: number = 169;
  public static symbolHeight: number = 166.2;

  // hh
  public static SHOW_INTRO_PAGE: string = "SHOW_INTRO_PAGE";
  public static HIDE_INTRO_PAGE_SHOW_BASEGAME: string = "HIDE_INTRO_PAGE_SHOW_BASEGAME";
  public static HIDE_LOADING_SCREEN: string = "HIDE_LOADING_SCREEN";
  public static START_SPIN: string = "START_SPIN";
  public static FG_START_SPIN: string = "FG_START_SPIN";
  public static SET_RESPONSE_AT_REEL: string = "SET_RESPONSE_AT_REEL";
  public static FG_SET_RESPONSE_AT_REEL: string = "FG_SET_RESPONSE_AT_REEL";
  public static PAYTABLE_NAV_BTN_CLICKED: string = "PAYTABLE_NAV_BTN_CLICKED";
  public static PAYTABLE_CROSS_BTN_CLICKED: string =
    "PAYTABLE_CROSS_BTN_CLICKED";
  public static ENABLE_INFO_BUTTON: string = "ENABLE_INFO_BUTTON";
  public static INFO_BTN_CLICKED: string = "INFO_BTN_CLICKED";
  public static SPIN_STOPPED: string = "SPIN_STOPPED";
  public static FG_SPIN_STOPPED: string = "FG_SPIN_STOPPED";
  public static PLAY_DROP_REEL: string = "PLAY_DROP_REEL";
  public static FG_PLAY_DROP_REEL: string = "FG_PLAY_DROP_REEL";
  public static PLAY_ANIMATED_WIN_SYMBOL: string = "PLAY_ANIMATED_WIN_SYMBOL";
  public static FG_PLAY_ANIMATED_WIN_SYMBOL: string =
    "FG_PLAY_ANIMATED_WIN_SYMBOL";
  public static PLAY_CASCADE_DROP_ANIMATION: string =
    "PLAY_CASCADE_DROP_ANIMATION";
  public static UPDATE_VIEW_ON_REEL: string = "UPDATE_VIEW_ON_REEL";
  public static FG_UPDATE_VIEW_ON_REEL: string = "FG_UPDATE_VIEW_ON_REEL";
  public static PLAY_BIG_WIN: string = "PLAY_BIG_WIN";
  public static PLAY_FG_BIG_WIN: string = "PLAY_FG_BIG_WIN";
  public static ON_SHOW_NEXT_WIN_PRESENTAION: string =
    "ON_SHOW_NEXT_WIN_PRESENTAION";
  public static FG_ON_SHOW_NEXT_WIN_PRESENTAION: string =
    "FG_ON_SHOW_NEXT_WIN_PRESENTAION";

  public static SHOW_NEXT_RANDOM_WIN_PRESENTAION: string =
    "SHOW_NEXT_RANDOM_WIN_PRESENTAION";
  public static FG_SHOW_NEXT_RANDOM_WIN_PRESENTAION: string =
    "FG_SHOW_NEXT_RANDOM_WIN_PRESENTAION";

  public static PLAY_STOP_SPIN: string = "PLAY_STOP_SPIN";
  public static FG_PLAY_STOP_SPIN: string = "FG_PLAY_STOP_SPIN";
  public static PLAY_SHUFFLE_REEL: string = "PLAY_SHUFFLE_REEL";
  public static FG_PLAY_SHUFFLE_REEL: string = "FG_PLAY_SHUFFLE_REEL";
  public static UPDATE_WIN_METER: string = "UPDATE_WIN_METER";
  public static FG_UPDATE_WIN_METER: string = "FG_UPDATE_WIN_METER";
  public static UPDATE_FREEGAME_LEFT_METER: string =
    "UPDATE_FREEGAME_LEFT_METER";
  public static UPDATE_LINE_WIN_METER: string = "UPDATE_LINE_WIN_METER";
  public static FG_UPDATE_LINE_WIN_METER: string = "FG_UPDATE_LINE_WIN_METER";
  public static UPDATE_AUTOPLAY_METER: string = "UPDATE_AUTOPLAY_METER";
  public static RESET_AUTOPLAY_METER: string = "RESET_AUTOPLAY_METER";
  public static UPDATE_BET_METER: string = "UPDATE_BET_METER";
  public static ENABLE_DISABLE_MINUS_BTN: string = "ENABLE_DISABLE_MINUS_BTN";
  public static ENABLE_DISABLE_PLUS_BTN: string = "ENABLE_DISABLE_PLUS_BTN";
  public static CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN: string =
    "CHECK_ENABLE_DISABLE_PLUS_MINUS_BTN";
  public static RESET_WIN_METER: string = "RESET_WIN_METER";
  public static FG_RESET_WIN_METER: string = "FG_RESET_WIN_METER";
  public static UPDATE_BALANCE: string = "UPDATE_BALANCE";
  public static UPDATE_BALANCE_TEXT: string = "UPDATE_BALANCE_TEXT";

  public static FG_UPDATE_BALANCE: string = "FG_UPDATE_BALANCE";
  public static FG_UPDATE_BALANCE_TEXT: string = "FG_UPDATE_BALANCE_TEXT";

  public static ENABLE_DISABLE_CHEAT_PANEL: string =
    "ENABLE_DISABLE_CHEAT_PANEL";
  public static RESET_CHEAT_PANEL: string = "RESET_CHEAT_PANEL";
  public static START_AUTOPLAY: string = "START_AUTOPLAY";
  public static DISABLE_ALL_BUTTON: string = "DISABLE_ALL_BUTTON";
  public static FG_DISABLE_ALL_BUTTON: string = "FG_DISABLE_ALL_BUTTON";
  public static DISABLE_AUTOPLAY_BUTTON: string = "DISABLE_AUTOPLAY_BUTTON";
  public static ENABLE_ALL_BUTTON: string = "ENABLE_ALL_BUTTON";
  public static FG_ENABLE_ALL_BUTTON: string = "FG_ENABLE_ALL_BUTTON";
  public static ENABLE_AUTOPLAY_BUTTON: string = "ENABLE_AUTOPLAY_BUTTON";
  public static ENABLE_AUTOPLAY_METER_VIEW: string =
    "ENABLE_AUTOPLAY_METER_VIEW";
  public static UPDATE_PENTAGONAL_METER: string = "UPDATE_PENTAGONAL_METER";
  public static FG_UPDATE_PENTAGONAL_METER: string =
    "FG_UPDATE_PENTAGONAL_METER";
  public static START_ZWOOM_FEATURE: string = "START_ZWOOM_FEATURE";
  public static SHOW_RANDOM_FEATURE_POPUP: string = "SHOW_RANDOM_FEATURE_POPUP";
  public static FG_SHOW_RANDOM_FEATURE_POPUP: string =
    "FG_SHOW_RANDOM_FEATURE_POPUP";
  public static SHOW_HIDE_BASEGAME: string = "SHOW_HIDE_BASEGAME";
  public static SET_RESIZE_WITH_REELS: string = "SET_RESIZE_WITH_REELS";
  public static FG_SET_RESIZE_WITH_REELS: string = "FG_SET_RESIZE_WITH_REELS";
  public static HIDE_WINFRAME_ANIMATION: string = "HIDE_WINFRAME_ANIMATION";
  public static FG_HIDE_WINFRAME_ANIMATION: string = "FG_HIDE_WINFRAME_ANIMATION";
  public static OPEN_CLOSE_SETTING_PAGE: string = "OPEN_CLOSE_SETTING_PAGE";
  public static START_BONUS: string = "START_BONUS";
  public static HIDE_BONUS: string = "HIDE_BONUS";
  public static INIT_BASEGAME: string = "INIT_BASEGAME";
  public static INIT_FREEGAME: string = "INIT_FREEGAME";
  public static BASE_GAME: string = "basegame";
  public static FREE_Game: string = "freegame";

  //----------------Sound Event-----------------------------
  public static PLAY_BG_SOUND: string = "PLAY_BG_SOUND";
  public static STOP_BG_SOUND: string = "STOP_BG_SOUND";
  public static MUTE_UNMUTE_ALL_SOUND: string = "MUTE_ALL_SOUND";

  //-----------------Win Animation BaseGame----------------
  public static CHECK_AUTOPLAY_COUNT: number = 0;
  public static ANIMATE_WIN_SYMBOL: number = 1;
  // public static CASCADE_DROP_ANIMATION: number = 2;
  public static RECHECK_CASCADE_WIN: number = 2;
  public static CHECK_PLAY_RANDOM_FEATURE: number = 3;
  public static RECHECK_WIN: number = 4;
  public static RECHECK_RANDOM_FEATURE: number = 5;
  public static CHECK_AND_START_BONUS: number = 6;
  public static BIG_WIN: number = 7;
  public static CHECK_AUTOPLAY: number = 8;
  public static ENABLE_BUTTON_PLAY: number = 9;

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

  public static RANDOM_FEATURES_LIST: string[] = [
    CommonConfig.RANDOM_FEATURE_ZWOOM,
    CommonConfig.RANDOM_FEATURE_CRIPAZIONE,
    CommonConfig.RANDOM_FEATURE_PISTOLE,
  ];

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
  private isBonusRewarded: boolean = false;
  private _3x3WildGridIds : number[][] = [];
  private _initial3x3WildGridId : number[] = [];

  private symbolWinData: SymbolWinData = {
    0: {
      4: 3,
      5: 6,
      6: 12,
      7: 12,
      8: 24,
      9: 24,
      10: 48,
      11: 48,
      12: 75,
      13: 75,
      14: 75,
      15: 300,
    },
    1: {
      4: 3,
      5: 6,
      6: 12,
      7: 12,
      8: 24,
      9: 24,
      10: 48,
      11: 48,
      12: 75,
      13: 75,
      14: 75,
      15: 300,
    },
    2: {
      4: 3,
      5: 6,
      6: 12,
      7: 12,
      8: 24,
      9: 24,
      10: 48,
      11: 48,
      12: 75,
      13: 75,
      14: 75,
      15: 300,
    },
    3: {
      4: 3,
      5: 6,
      6: 12,
      7: 12,
      8: 24,
      9: 24,
      10: 48,
      11: 48,
      12: 75,
      13: 75,
      14: 75,
      15: 300,
    },
    4: {
      4: 2.25,
      5: 4.5,
      6: 9,
      7: 9,
      8: 18,
      9: 18,
      10: 36,
      11: 36,
      12: 45,
      13: 45,
      14: 45,
      15: 180,
    },
    5: {
      4: 1.5,
      5: 3,
      6: 6,
      7: 6,
      8: 12,
      9: 12,
      10: 24,
      11: 24,
      12: 30,
      13: 30,
      14: 30,
      15: 120,
    },
    6: {
      4: 0.75,
      5: 1.5,
      6: 3,
      7: 3,
      8: 6,
      9: 6,
      10: 12,
      11: 12,
      12: 15,
      13: 15,
      14: 15,
      15: 60,
    },
    7: {
      4: 0.45,
      5: 0.75,
      6: 1.2,
      7: 1.2,
      8: 2.4,
      9: 2.4,
      10: 4.8,
      11: 4.8,
      12: 6,
      13: 6,
      14: 6,
      15: 15,
    },
    8: {
      4: 0.3,
      5: 0.6,
      6: 0.9,
      7: 0.9,
      8: 1.8,
      9: 1.8,
      10: 3.6,
      11: 3.6,
      12: 4.5,
      13: 4.5,
      14: 4.5,
      15: 12,
    },
    9: {
      4: 0.3,
      5: 0.45,
      6: 0.75,
      7: 0.75,
      8: 1.35,
      9: 1.35,
      10: 2.7,
      11: 2.7,
      12: 3.3,
      13: 3.3,
      14: 3.3,
      15: 9,
    },
    10: {
      4: 0.15,
      5: 0.3,
      6: 0.45,
      7: 0.45,
      8: 0.9,
      9: 0.9,
      10: 1.8,
      11: 1.8,
      12: 2.25,
      13: 2.25,
      14: 2.25,
      15: 6,
    },
  };

  public static BET_ARRAY: number[] = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0,
    10.0, 15.0, 20.0, 25.0, 30.0, 40.0, 50.0, 60.0, 80.0, 100.0, 150.0, 200.0,
    250.0, 300.0, 400.0, 500.0,
  ];

  private winGrid: Map<number, ISingleWinDetails> = new Map();

  private winGridFreeGame: Map<number, ISingleWinDetails> = new Map();
  private currentFGRandomWinAnimationIndex: number = 0;

  private randomWildGridIds: number[] = [];

  public set3x3WildGridIds(value : number[][]) :void{
    this._3x3WildGridIds = value;
  }

  public get3x3WildGridIds() :number[][]{
    return this._3x3WildGridIds;
  }

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

  public setIsBonusRewarded(value: boolean): void {
    this.isBonusRewarded = value;
  }

  public getIsBonusRewarded(): boolean {
    return this.isBonusRewarded;
  }

  public setInitial3x3WildGridId(value : number[]) :void{
    this._initial3x3WildGridId = value;
  }

  public getInitial3x3WildGridId() : number[]{
    return this._initial3x3WildGridId;
  }

  public setCurrentState(value: string): void {
    this.currentState = value;
  }

  public getCurrentState(): string {
    return this.currentState;
  }

  private winningSymbolIdFromUser: number = 12;
  private winningSymbolIds: string[][] = [["12"], ["12"], ["12"]];
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
    [6, 3, 3, 4, 1],
    [3, 1, 4, 5, 4],
  ];

  public static NormalWinResponse2: number[][] = [
    [4, 5, 4, 6, 3],
    [2, 6, 4, 4, 4],
    [4, 4, 3, 3, 4],
    [6, 3, 3, 4, 1],
    [3, 1, 4, 3, 4],
  ];

  public static NormalWinResponse3: number[][] = [
    [4, 5, 4, 6, 3],
    [2, 6, 5, 5, 4],
    [4, 3, 3, 3, 4],
    [6, 2, 3, 4, 1],
    [3, 1, 3, 5, 4],
  ];
  public static NormalWinResponse4: number[][] = [
    [4, 5, 4, 6, 3],
    [2, 6, 5, 5, 4],
    [4, 3, 3, 3, 4],
    [6, 2, 3, 4, 1],
    [3, 1, 3, 5, 4],
  ];
  public static NormalWinResponse5: number[][] = [
    [4, 5, 4, 6, 3],
    [2, 6, 5, 5, 4],
    [4, 3, 3, 3, 4],
    [6, 2, 3, 4, 4],
    [3, 1, 3, 4, 4],
  ];

  public static noWinRespone: number[][] = [
    [4, 5, 4, 6, 3],
    [2, 6, 5, 5, 6],
    [4, 3, 6, 3, 7],
    [6, 2, 4, 4, 8],
    [3, 1, 3, 2, 9],
  ];

  public static expandingWildFeature: number[][] = [
    [4, 5, 1, 1, 1],
    [2, 6, 1, 1, 1],
    [4, 3, 1, 1, 1],
    [6, 2, 4, 4, 8],
    [3, 1, 3, 2, 9],
  ];

  private winResponses: number[][][] = [
    CommonConfig.NormalWinResponse,
    CommonConfig.NormalWinResponse2,
    CommonConfig.NormalWinResponse3,
    CommonConfig.NormalWinResponse4,
    CommonConfig.NormalWinResponse5,
  ];

  public static reels: number[][] = [
    [
      6, 7, 2, 3, 3, 8, 9, 4, 5, 1, 6, 3, 7, 2, 8, 5, 9, 4, 4, 7, 6, 3, 8, 4, 2,
      9, 7, 5, 6, 5, 3, 9, 8, 1, 4, 2, 7, 7, 6, 5, 3, 4, 9, 2, 8, 5, 6, 1, 6, 7,
      3, 8, 2, 9, 4, 8, 7, 6, 5, 1,
    ],

    [
      3, 8, 9, 2, 2, 7, 6, 4, 1, 5, 2, 9, 1, 8, 3, 6, 7, 4, 5, 6, 3, 1, 9, 1, 7,
      8, 5, 2, 4, 6, 9, 3, 7, 1, 4, 8, 1, 2, 5, 6, 3, 9, 8, 1, 4, 7, 1, 5, 2, 6,
      3, 8, 4, 9, 5, 1, 7, 2, 6, 1,
    ],

    [
      5, 6, 3, 2, 5, 8, 9, 1, 4, 7, 5, 2, 8, 3, 6, 9, 5, 7, 4, 6, 5, 3, 9, 1, 8,
      4, 2, 7, 1, 5, 9, 3, 6, 5, 4, 8, 7, 2, 5, 6, 3, 1, 7, 9, 4, 2, 8, 6, 6, 5,
      3, 4, 9, 8, 7, 7, 2, 6, 5, 1,
    ],

    [
      7, 4, 6, 3, 5, 8, 3, 1, 2, 9, 6, 4, 7, 4, 8, 3, 9, 2, 5, 6, 7, 4, 1, 9, 3,
      8, 6, 5, 2, 8, 4, 7, 1, 3, 9, 4, 6, 2, 8, 5, 4, 7, 9, 3, 6, 1, 6, 5, 2, 4,
      8, 3, 7, 9, 9, 6, 2, 5, 4, 1,
    ],

    [
      2, 5, 9, 3, 4, 7, 8, 3, 1, 6, 5, 3, 2, 8, 4, 7, 7, 9, 6, 5, 2, 3, 1, 8, 9,
      4, 9, 7, 6, 5, 4, 9, 3, 4, 8, 6, 1, 7, 5, 2, 4, 8, 9, 3, 6, 1, 2, 7, 4, 5,
      8, 2, 9, 6, 1, 3, 7, 1, 5, 4,
    ],
  ];

  public static reelsFreegame: number[][] = [
    [
      6, 7, 2, 3, 1, 8, 9, 4, 5, 0, 6, 3, 7, 2, 8, 5, 9, 1, 4, 7, 6, 3, 8, 4, 2,
      9, 7, 1, 6, 5, 3, 9, 8, 0, 4, 2, 1, 7, 6, 5, 3, 4, 9, 2, 8, 5, 1, 0, 6, 7,
      3, 8, 2, 9, 4, 1, 7, 6, 5, 0,
    ],

    [
      3, 8, 9, 1, 2, 7, 6, 4, 0, 5, 2, 9, 1, 8, 3, 6, 7, 4, 5, 6, 3, 0, 9, 1, 7,
      8, 5, 2, 4, 6, 9, 3, 7, 1, 4, 8, 0, 2, 5, 6, 3, 9, 8, 1, 4, 7, 0, 5, 2, 6,
      3, 8, 4, 9, 5, 1, 7, 2, 6, 0,
    ],

    [
      5, 6, 3, 2, 1, 8, 9, 0, 4, 7, 5, 2, 8, 3, 6, 9, 1, 7, 4, 6, 5, 3, 9, 1, 8,
      4, 2, 7, 0, 5, 9, 3, 6, 1, 4, 8, 7, 2, 5, 6, 3, 0, 7, 9, 4, 2, 8, 1, 6, 5,
      3, 4, 9, 8, 1, 7, 2, 6, 5, 0,
    ],

    [
      7, 4, 6, 1, 5, 8, 3, 0, 2, 9, 6, 4, 7, 1, 8, 3, 9, 2, 5, 6, 7, 4, 0, 9, 3,
      1, 6, 5, 2, 8, 4, 7, 0, 3, 9, 1, 6, 2, 8, 5, 4, 7, 9, 3, 1, 0, 6, 5, 2, 4,
      8, 3, 7, 1, 9, 6, 2, 5, 4, 0,
    ],

    [
      2, 5, 9, 1, 4, 7, 8, 3, 0, 6, 5, 3, 2, 8, 4, 7, 1, 9, 6, 5, 2, 3, 0, 8, 9,
      4, 1, 7, 6, 5, 4, 9, 3, 1, 8, 6, 0, 7, 5, 2, 4, 8, 9, 3, 6, 0, 1, 7, 4, 5,
      8, 2, 9, 6, 0, 3, 7, 1, 5, 4,
    ],
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
    // return CommonConfig.noWinRespone;
    if (CommonConfig.the.getCurrentState() === CommonConfig.BASE_GAME) {
      if (this.getCheatType().length && this.getCheatType() === "normal") {
        let winresponse =
          this.winResponses[
            Math.floor(Math.random() * this.winResponses.length)
          ];
        // winresponse = CommonConfig.NormalWinResponse4;
        return this.returnCloneArray(winresponse);
      } else if (
        this.getCheatType().length &&
        this.getCheatType() === "large"
      ) {
        let winresponse = CommonConfig.NormalWinResponse3;
        return this.returnCloneArray(winresponse);
      } else if (
        this.getCheatType().length &&
        this.getCheatType() === "bonus"
      ) {
        let winresponse = CommonConfig.NormalWinResponse3;
        return this.returnCloneArray(winresponse);
      }
    }
    this.setCheatType("");
    // Loop through each reel to pick random positions
    for (
      let reelIndex = 0;
      reelIndex < CommonConfig.reels.length;
      reelIndex++
    ) {
      const reel = CommonConfig.reels[reelIndex];

      const startPosition = Math.floor(Math.random() * reel.length);

      const reelSymbols = [
        reel[startPosition % reel.length],
        reel[(startPosition + 1) % reel.length],
        reel[(startPosition + 2) % reel.length],
        reel[(startPosition + 3) % reel.length],
        reel[(startPosition + 4) % reel.length],
      ];

      view.push(reelSymbols);
    }
    // console.log(view);
    if(CommonConfig.the.getCurrentState() === CommonConfig.FREE_Game){
      return this.createRandom3x3WildGridView(view);
    }
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
    this.winReelIds = value;
  }

  public getWinReelIds(): number[] {
    return this.winReelIds;
  }

  public setWinReelIdsFreeGame(value: number[]): void {
    this.winReelIdsFreeGame = value;
  }

  public getWinReelIdsFreeGame(): number[] {
    return this.winReelIdsFreeGame;
  }

  public setOldView(value: number[][]): void {
    this.oldView = value;
  }

  public getOldView(): number[][] {
    return this.oldView;
  }

  public setView(value: number[][]): void {
    this.view = value;
  }

  public getView(): number[][] {
    return this.view;
  }

  public setViewFreeGame(value: number[][]): void {
    this.viewFreeGame = value;
  }

  public getViewFreeGame(): number[][] {
    return this.viewFreeGame;
  }

  public setWinGrid(value: Map<number, ISingleWinDetails>): void {
    this.winGrid = value;
  }

  public getWinGrid(): Map<number, ISingleWinDetails> {
    return this.winGrid;
  }

  public setWinGridFreeGame(value: Map<number, ISingleWinDetails>): void {
    this.winGridFreeGame = value;
  }

  public getWinGridFreeGame(): Map<number, ISingleWinDetails> {
    return this.winGridFreeGame;
  }

  cascade(view: number[][], winningSymbols: Set<string>): number[][] {
    // Explode symbols by setting them to null
    winningSymbols.forEach((pos) => {
      const [r, c] = pos.split(",").map(Number);
      view[r][c] = NaN;
    });
    // console.log(view);
    const outputArray = view.map((innerArray) => {
      // Filter out null values, then add them to the beginning of the array
      const nonNullValues = innerArray.filter((value) => !isNaN(value));
      const nullValues = innerArray.filter((value) => isNaN(value));
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
    if (CommonConfig.the.getCurrentState() === CommonConfig.BASE_GAME) {
      if (
        this.getCheatType().length &&
        this.getCheatType() === "large" &&
        this.incrementForLargeWin < 1
      ) {
        return 3;
      } else if (
        this.getCheatType().length &&
        this.getCheatType() === "bonus" &&
        this.incrementForLargeWin < 4
      ) {
        return 3;
      }
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

  clone2DArray(array: number[][]): number[][] {
    return array.map((innerArray) => [...innerArray]);
  }

  findWinningGroups(reel: number[][]): Map<number, ISingleWinDetails> {
    let winArrayMap: Map<number, ISingleWinDetails> = new Map();
    let a_visited: number[][] = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    for (let i: number = 0; i < reel.length; i++) {
      for (let j: number = 0; j < reel[i].length; j++) {
        let index_array: string[] = [];
        resetZeroIndex();
        if (reel[i][j] !== 1) {
          dfs(i, j, reel[i][j], index_array);
        }
        if (index_array.length >= 4) {
          let obj: ISingleWinDetails = {
            id : reel[i][j],
            index_set : new Set(index_array)
          };
        //   obj.id = reel[i][j];
        //   obj.index_set = new Set(index_array);
          winArrayMap.set(reel[i][j], obj);
        }
      }
    }

    function resetZeroIndex() {
      for (let i: number = 0; i < reel.length; i++) {
        for (let j: number = 0; j < reel[i].length; j++) {
          if (reel[i][j] === 1) {
            a_visited[i][j] = 0;
          }
        }
      }
    }

    function dfs(
      i: number,
      j: number,
      symbolId: number,
      index_array: string[]
    ): void {
      if (a_visited[i][j] === 1) {
        return;
      }
      a_visited[i][j] = 1;
      let reseult = `${i},${j}`;
      index_array.push(reseult);
      i >= 1 &&
        (reel[i - 1][j] === 1 || symbolId === reel[i - 1][j]) &&
        dfs(i - 1, j, symbolId, index_array);
      j >= 1 &&
        (reel[i][j - 1] === 1 || symbolId === reel[i][j - 1]) &&
        dfs(i, j - 1, symbolId, index_array);
      i <= 3 &&
        (reel[i + 1][j] === 1 || symbolId === reel[i + 1][j]) &&
        dfs(i + 1, j, symbolId, index_array);
      j <= 3 &&
        (reel[i][j + 1] === 1 || symbolId === reel[i][j + 1]) &&
        dfs(i, j + 1, symbolId, index_array);
    }

    return winArrayMap;
  }

  createRandom3x3WildGridView(view : number[][]) : number[][]{
    const initialReelRowIds : number[] = [0,1,2];
    const randomInitialReelId : number = initialReelRowIds[Math.floor(Math.random() * 3)];
    const randomInitialRowId : number = initialReelRowIds[Math.floor(Math.random() * 3)];
    const random3x3WildGridIds :number[][] = [];
    for(let i : number = randomInitialReelId;i<randomInitialReelId+3;i++){
      for(let j:number=randomInitialRowId;j<randomInitialRowId+3;j++){
        random3x3WildGridIds.push([i,j]);
      }
    }

    for(let i:number=0;i<random3x3WildGridIds.length;i++){
      view[random3x3WildGridIds[i][0]][random3x3WildGridIds[i][1]] = 1;
    }

    this.set3x3WildGridIds(random3x3WildGridIds);
    this.setInitial3x3WildGridId([randomInitialReelId,randomInitialRowId]);
    return view;
  }  

}