export class GameConfig {
    protected static _the: GameConfig;

    private symbolWinData = {
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

    static get the(): GameConfig {
        if (!GameConfig._the) {
            GameConfig._the = new GameConfig();
        }

        return GameConfig._the;
    }


    constructor() {
        if (GameConfig._the == null) GameConfig._the = this;
    }
}