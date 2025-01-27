export class GameConfig {
    protected static _the: GameConfig;

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