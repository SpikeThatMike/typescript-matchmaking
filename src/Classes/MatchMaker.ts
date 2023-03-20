import IMatchMakerOptions from "../Interfaces/IMatchMakerOptions";
import Player from "./Player";
import Party from "./Party";
import { match } from "assert";

class MatchMaker {
    private _title: string = "";
    private _options: IMatchMakerOptions = {} as IMatchMakerOptions;
    private queue: Array<Player | Party> = [];
    
    constructor(title: string, options: IMatchMakerOptions) {
        this._title = title;
        this._options = options;
    }

    public AddToQueue(player: Player | Party): void {
        this.queue.push(player);
        this.FindMatch(this.queue);
    }

    public RemoveFromQueue(player: Player | Party): void {
        this.queue = this.queue.filter((p: Player | Party) => p != player);
        this.FindMatch(this.queue);
    }

    private FindMatch(queue: Array<Player | Party>): void {
        if(!this.CheckQueue(queue))
            return;

        const allGroups: Array<Array<Player | Party>> = this.GroupQueue(queue);

        const playableGroups = allGroups.filter((g: Array<Player | Party>) => g.length == this._options.maxPlayers);
        if(playableGroups.length == 0)
            return;
        
        const matches = playableGroups
            .map((group: Array<Player | Party>) => this.SplitGroup(group))
            .filter((group: Array<Array<Player | Party>> | null) => group != null) as Array<Array<Array<Player | Party>>>;

        if(matches.length == 0)
            return;

        matches.forEach((match: Array<Array<Player | Party>>) => {
            console.log("\nMatch");
            match.forEach((team: Array<Player | Party>, index: number) => {
                console.log("Team: " + (index + 1));
                console.log(`Players: ${team.map((player: Player | Party) => player.Name).join(", ")}`);
                console.log(`Total Rating: ${team.reduce((a: number, b: Player | Party) => a + b.Rating, 0)}\n`);
                team.forEach((player: Player | Party) => {
                    this.queue = this.queue.filter((p: Player | Party) => p != player);
                });
            });
        });
    }

    private CheckQueue(queue: Array<Player | Party>): boolean {
        var PartyNumber = ((queue.filter((p: Player | Party) => p instanceof Party)) as Party[])
            .reduce((a: number, b: Party) => a + b.Size, 0);

        //Check if there are enough players in the queue to make a match
        if((queue.filter((p: Player | Party) => p instanceof Player).length + PartyNumber) < this._options.minPlayers)
            return false;

        return true;
    }

    private GroupQueue(queue: Array<Player | Party>): Array<Array<Player | Party>> {
        const newQueue: Array<Player | Party> = queue.sort((a: Player | Party, b: Player | Party) => a.Rating - b.Rating);

		const groupedQueue: Array<Array<Player | Party>> = [[]];
		let count = 0;

		newQueue.forEach((player: Player | Party) => {
			if (groupedQueue[count].length >= this._options.maxPlayers || (player.Rating - groupedQueue[count][0]?.Rating > this._options.ratingRange)) {
				count++;
				groupedQueue[count] = [];
			}

            groupedQueue[count].push(player);
		});
		return groupedQueue;
	}

    private SplitGroup(group: Array<Player | Party>): Array<Array<Player | Party>> | null {
        const newArray: Array<Player | Party> = [...group];
        let attempts: number[] = [];

        while (true) {
            if(this.AreEqual(newArray, group) && attempts.length > 0)
                break;

            const teamA = newArray.slice(0, newArray.length / this._options.maxTeams);
            const teamB = newArray.slice(newArray.length / this._options.maxTeams, newArray.length);
    
            const difference: number = Math.abs(teamA.reduce((a: number, b: Player | Party) => a + b.Rating, 0) - teamB.reduce((a: number, b: Player | Party) => a + b.Rating, 0));
            attempts.push(difference);
            
            const shiftValue: Player | Party = newArray.shift()!;
            newArray.push(shiftValue);
        }

        const minIndex: number = attempts.indexOf(Math.min(...attempts));
        if(minIndex == -1)
            return null;
        
        const bestArray: Array<Player | Party> = [...group.slice(minIndex, group.length), ...group.slice(0, minIndex)];

        const teamA = bestArray.slice(0, bestArray.length / this._options.maxTeams);
        const teamB = bestArray.slice(bestArray.length / this._options.maxTeams, bestArray.length);

        if(Math.abs(teamA.reduce((a: number, b: Player | Party) => a + b.Rating, 0) - teamB.reduce((a: number, b: Player | Party) => a + b.Rating, 0)) > this._options.ratingTeamRange)
            return null;
            
        return [teamA, teamB];
    }

    private AreEqual(array1: Array<Player | Party>, array2: Array<Player | Party>): boolean {
        if (array1.length != array2.length) 
            return false;
        return array1.every((element, index) => {
            if (element != array2[index])
                return false;
            return true;
        });
    };
}

export default MatchMaker;