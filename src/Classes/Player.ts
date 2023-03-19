class Player {
    private _name: string = "";
    private _rating: number = 0;

    constructor(name: string, rating: number) {
        this._name = name;
        this._rating = rating;
    }

    public get Player(): Player {
        return this;
    } 

    public get Name(): string {
        return this._name;
    }

    public get Rating(): number {
        return this._rating;
    }
}

export default Player;