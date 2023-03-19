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
    ratingTeamRange: 100,
});

const players: Player[] = [
    new Player("SpikeThatMike1", 150),
    new Player("SpikeThatMike2", 120),
    new Player("SpikeThatMike3", 130),
    new Player("SpikeThatMike4", 121),
    new Player("SpikeThatMike5", 145),
    new Player("SpikeThatMike6", 100),
    new Player("SpikeThatMike7", 50),
    new Player("SpikeThatMike8", 150),
    new Player("SpikeThatMike9", 150),
    new Player("SpikeThatMike10", 50),
    new Player("SpikeThatMike11", 300),
    new Player("SpikeThatMike12", 300),
    new Player("SpikeThatMike13", 300),
    new Player("SpikeThatMike14", 300),
    new Player("SpikeThatMike15", 300),
    new Player("SpikeThatMike16", 350),
    new Player("SpikeThatMike17", 400),
    new Player("SpikeThatMike18", 350),
    new Player("SpikeThatMike19", 330),
    new Player("SpikeThatMike20", 370),
];

players.forEach((player) => {
    matchmaker.AddToQueue(player);  
});