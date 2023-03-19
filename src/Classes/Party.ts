import Player from "./Player";

class Party {
    private _name: string = "";
    private _players: Array<Player> = [];
    private _isQueued: boolean = false;

    constructor(name: string, players: Array<Player>) {
        this._name = name;
        this._players = players;
    }

    public get Name(): string {
        return this._name;
    }

    public get Players(): Array<Player> {
        return this._players;
    }

    public get Rating(): number {
        return this._players.reduce((a: number, b: Player) => a + b.Rating, 0);
    }

    public get Size(): number {
        return this._players.length;
    }

    public get IsQueued(): boolean {
        return this._isQueued;
    }

    public AddPlayer(player: Player): void {     
        this._players.push(player);
    }

    public RemovePlayer(player: Player): void {
        this._players = this._players.filter((p: Player) => p != player);
    }

    public ContainsPlayer(player: Player): boolean {
        return this._players.includes(player);
    }

    public Disband(): void {
        this._players = [];
    }

    public Queue(): void {
        this._isQueued = true;
    }

    public Unqueue(): void {
        this._isQueued = false;
    }
}

export default Party;