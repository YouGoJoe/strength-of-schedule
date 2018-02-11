import produce from 'immer';
import types from '../actions/types';

export const initialState = {
    teams: [
        {
            name: 'Cloud 9',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'TSM',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'CLG',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Optic Gaming',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Echo Fox',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Golden Guardians',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: '100 Thieves',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Team Liquid',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Clutch Gaming',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        },
        {
            name: 'Flyquest',
            wins: 0,
            losses: 0,
            games: function games() {
                return this.wins + this.losses;
            },
            points: 0
        }
    ]
};

export default function reducer(state = initialState, action) {
    return produce(state, draft => {
        const { payload, type } = action;
        switch (type) {
            case types.UPDATE_GAME: {
                const { winner, loser } = payload.game;
                let loserRecord = (loser.wins / loser.games()).toFixed(3) * 1000;
                if (loserRecord !== loserRecord) {
                    // NaN check
                    loserRecord = 500;
                }
                console.log(`${winner.name} gains ${loserRecord} points for beating ${loser.name} who is at ${loser.wins} - ${loser.losses}`);
                
                winner.wins++;
                winner.points += loserRecord;
                loser.losses++;

                draft.teams = state.teams.map(team => {
                    if (team.name === winner.name) {
                        return winner;
                    }
                    if (team.name === loser.name) {
                        return loser;
                    }
                    return team;
                });
            }
        }
    });
}
