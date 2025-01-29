export class CommonConfig {
  public static symbolIds: string[] = [
    "sym_dollor",
    "sym_trikonlogo",
    "sym_txe_gold",
    "sym_spin2win",
    "sym_gift",
    "sym_cross"
  ];

  public static symbolsPerReel: number = 3;
  public static totalReel: number = 3;
  public static reelWidth: number = 272;
  public static symbolHeight: number = 210;
  public static START_SPIN: string = "START_SPIN";
  public static STOP_SPIN: string = "STOP_SPIN";
  public static SET_RESPONSE_AT_REEL: string = "SET_RESPONSE_AT_REEL";
  public static SPIN_STOPPED: string = "SPIN_STOPPED";
  public static UPDATE_VIEW_ON_REEL: string = "UPDATE_VIEW_ON_REEL";
  public static ON_SHOW_NEXT_WIN_PRESENTAION: string ="ON_SHOW_NEXT_WIN_PRESENTAION";
  public static SHOW_NEXT_RANDOM_WIN_PRESENTAION: string = "SHOW_NEXT_RANDOM_WIN_PRESENTAION";
  public static DISABLE_ALL_BUTTON: string = "DISABLE_ALL_BUTTON";
  public static ENABLE_ALL_BUTTON: string = "ENABLE_ALL_BUTTON";
  public static SET_RESIZE_WITH_REELS: string = "SET_RESIZE_WITH_REELS";
  public static PLAY_BACKGROUND_SOUND: string = "PLAY_BACKGROUND_SOUND";
  public static STOP_BACKGROUND_SOUND: string = "STOP_BACKGROUND_SOUND";

  public static BASE_GAME: string = "basegame";
  //----------------Sound Event-----------------------------
  public static MUTE_UNMUTE_ALL_SOUND: string = "MUTE_ALL_SOUND";  

  //Button State
  public static BUTTON_STATE_SPIN : string = "BUTTON_STATE_SPIN";
  public static BUTTON_STATE_STOP : string = "BUTTON_STATE_STOP";
  //Event
  public static CHANGE_BUTTON_STATE : string = "CHANGE_BUTTON_STATE";
  private currentState: string = "basegame";
  private _currentButtonState : string = "";

  private view: number[][] = [];

 
  public setCurrentState(value: string): void {
    this.currentState = value;
  }

  public getCurrentState(): string {
    return this.currentState;
  }


  public setCurrentButtonState(value: string): void {
    this._currentButtonState = value;
  }

  public getCurrentButtonState(): string {
    return this._currentButtonState;
  }

  public static reels: number[][] = [
    [
      0, 1, 2, 3, 4, 5, 0, 2, 4, 1, 3, 5, 2, 4, 0, 3, 1, 5, 4, 2, 0, 1, 3, 5, 2,
      4, 0, 1, 5, 3, 2, 4, 1, 0, 3, 5, 2, 4, 0, 3, 1, 5, 2, 0, 4, 1, 3, 5, 0, 2,
      4, 1, 3, 5, 2, 0, 4, 3, 1, 5,
    ],
  
    [
      2, 3, 4, 0, 1, 5, 3, 2, 0, 4, 5, 1, 3, 0, 4, 5, 2, 1, 0, 3, 5, 2, 4, 1, 3,
      0, 5, 4, 1, 2, 3, 0, 4, 5, 2, 1, 0, 3, 5, 4, 1, 2, 3, 0, 4, 5, 2, 1, 0, 3,
      4, 5, 2, 0, 1, 3, 5, 4, 2, 0,
    ],
  
    [
      4, 5, 0, 1, 2, 3, 5, 4, 2, 0, 1, 3, 5, 4, 2, 0, 1, 3, 5, 4, 2, 0, 3, 1, 5,
      4, 2, 0, 1, 3, 5, 4, 2, 0, 1, 3, 5, 4, 2, 0, 1, 3, 5, 4, 0, 2, 1, 3, 5, 4,
      2, 0, 1, 3, 5, 4, 2, 0, 1, 3,
    ],
  ];

  constructor() {
    
  }

  public generateRandomView(): number[][] {
    const view: number[][] = [];
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
        reel[(startPosition + 2) % reel.length]
      ];

      view.push(reelSymbols);
    }
    return view;
  }

  public setView(value: number[][]): void {
    this.view = value;
  }

  public getView(): number[][] {
    return this.view;
  }

  getRandomSymbol(reelIndex: number): number {
    const reel = CommonConfig.reels[reelIndex];
    return reel[Math.floor(Math.random() * reel.length)];
  }

}