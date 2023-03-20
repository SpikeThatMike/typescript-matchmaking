import Matchmaker from "./Classes/MatchMaker";
import Player from "./Classes/Player";

const matchmaker = new Matchmaker("Valorant 5v5", { 
    minPlayers: 10,
    maxPlayers: 10,
    minTeams: 2,
    maxTeams: 2,
    minTeamSize: 5,
    maxTeamSize: 5,
    ratingRange: 100,
    ratingTeamRange: 300,
});

const players: Player[] = [
    new Player("Player1", 17),
    new Player("Player2", 88),
    new Player("Player3", 93),
    new Player("Player4", 68),
    new Player("Player5", 99),
    new Player("Player6", 44),
    new Player("Player7", 23),
    new Player("Player8", 37),
    new Player("Player9", 5),
    new Player("Player10", 63),
    // new Player("SpikeThatMike11", 300),
    // new Player("SpikeThatMike12", 300),
    // new Player("SpikeThatMike13", 300),
    // new Player("SpikeThatMike14", 300),
    // new Player("SpikeThatMike15", 300),
    // new Player("SpikeThatMike16", 350),
    // new Player("SpikeThatMike17", 400),
    // new Player("SpikeThatMike18", 350),
    // new Player("SpikeThatMike19", 330),
    // new Player("SpikeThatMike20", 370),
];

players.forEach((player) => {
    matchmaker.AddToQueue(player);  
});