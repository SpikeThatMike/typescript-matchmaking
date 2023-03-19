import Player from "./Player";
import Party from "./Party";

class Team {
    private _name: string = "";
    private _players: Array<Player | Party> = [];

    constructor(name: string, players: Array<Player | Party>) {
        this._name = name;
        this._players = players;
    }

    public get Name(): string {
        return this._name;
    }

    public get Players(): Array<Player | Party> {
        return this._players;
    }

    public get Rating(): number {
        return this._players.reduce((a: number, b: Player | Party) => a + b.Rating, 0);
    }

    public get Size(): number {
        return this._players.length;
    }
}

export default Party;