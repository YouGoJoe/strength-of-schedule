import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';

import { updateGame } from '../state/actions';

const mapStateToProps = ({ teams }) => ({ teams });

const mapDispatchToProps = {
    updateGame
};

const MainContainer = styled.div`
    display: flex;
`;

const SplitContainer = styled.div`
    flex-basis: 50%;
`;

const LeaderboardRow = styled.div`
    display: flex;
    justify-content: space-around;

    border: 1px solid black;
    margin: 4px 0;
    padding: 6px 0;
`;

const TeamPrediction = styled.span`
    ${props =>
        props.winner &&
        css`
            background-color: #96fbc4;
        `};
    ${props =>
        props.loser &&
        css`
            background-color: #f68084;
        `};
`;

const teamNames = {
    cloud9: 'Cloud 9',
    tsm: 'TSM',
    clg: 'CLG',
    optic: 'Optic Gaming',
    fox: 'Echo Fox',
    golden: 'Golden Guardians',
    thieves: '100 Thieves',
    liquid: 'Team Liquid',
    clutch: 'Clutch Gaming',
    fly: 'Flyquest'
};

const { cloud9, tsm, clg, optic, fox, golden, thieves, liquid, clutch, fly } = teamNames;

class Teams extends Component {
    getTeam = name => this.props.teams.find(team => team.name === name);

    weekOne = () => {
        this.props.updateGame({ winner: this.getTeam(liquid), loser: this.getTeam(tsm) });
        this.props.updateGame({ winner: this.getTeam(thieves), loser: this.getTeam(optic) });
        this.props.updateGame({ winner: this.getTeam(clutch), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(fly) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(clg) });
        this.props.updateGame({ winner: this.getTeam(liquid), loser: this.getTeam(optic) });
        this.props.updateGame({ winner: this.getTeam(fly), loser: this.getTeam(tsm) });
        this.props.updateGame({ winner: this.getTeam(thieves), loser: this.getTeam(clg) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(clutch) });
    };

    weekTwo = () => {
        this.props.updateGame({ winner: this.getTeam(clutch), loser: this.getTeam(clg) });
        this.props.updateGame({ winner: this.getTeam(tsm), loser: this.getTeam(optic) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(cloud9) });
        this.props.updateGame({ winner: this.getTeam(thieves), loser: this.getTeam(liquid) });
        this.props.updateGame({ winner: this.getTeam(fly), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(tsm) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(thieves) });
        this.props.updateGame({ winner: this.getTeam(optic), loser: this.getTeam(fly) });
        this.props.updateGame({ winner: this.getTeam(clg), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(liquid), loser: this.getTeam(clutch) });
    };

    weekThree = () => {
        this.props.updateGame({ winner: this.getTeam(clg), loser: this.getTeam(fox) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(optic) });
        this.props.updateGame({ winner: this.getTeam(thieves), loser: this.getTeam(clutch) });
        this.props.updateGame({ winner: this.getTeam(liquid), loser: this.getTeam(fly) });
        this.props.updateGame({ winner: this.getTeam(tsm), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(optic) });
        this.props.updateGame({ winner: this.getTeam(tsm), loser: this.getTeam(thieves) });
        this.props.updateGame({ winner: this.getTeam(liquid), loser: this.getTeam(golden) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(clutch) });
        this.props.updateGame({ winner: this.getTeam(clg), loser: this.getTeam(fly) });
    };

    initScores = () => {
        this.weekOne();
        this.weekTwo();
        this.weekThree();

        // week 4
        this.props.updateGame({ winner: this.getTeam(clutch), loser: this.getTeam(tsm) });
        this.props.updateGame({ winner: this.getTeam(cloud9), loser: this.getTeam(liquid) });
        this.props.updateGame({ winner: this.getTeam(optic), loser: this.getTeam(clg) });
        this.props.updateGame({ winner: this.getTeam(fly), loser: this.getTeam(thieves) });
        this.props.updateGame({ winner: this.getTeam(fox), loser: this.getTeam(golden) });
    };

    getUpcomingGames = () => {
        const games = [];
        games.push({ teamOne: this.getTeam(fly), teamTwo: this.getTeam(cloud9) });
        games.push({ teamOne: this.getTeam(golden), teamTwo: this.getTeam(thieves) });
        games.push({ teamOne: this.getTeam(tsm), teamTwo: this.getTeam(clg) });
        games.push({ teamOne: this.getTeam(liquid), teamTwo: this.getTeam(fox) });
        games.push({ teamOne: this.getTeam(optic), teamTwo: this.getTeam(clutch) });
        return games;
    };

    render() {
        const sortedTeams = sortBy(this.props.teams, 'points');
        const games = this.getUpcomingGames();
        return (
            <Fragment>
                <button onClick={this.initScores}>Click me</button>
                <MainContainer>
                    <SplitContainer>
                        {sortedTeams.reverse().map((team, index) => (
                            <LeaderboardRow key={index}>
                                <span>{team.name}</span> <span>{team.points}</span>
                            </LeaderboardRow>
                        ))}
                    </SplitContainer>
                    <SplitContainer>
                        {games.map(({ teamOne, teamTwo }, index) => (
                            <LeaderboardRow key={index}>
                                <TeamPrediction
                                    winner={teamOne.points > teamTwo.points}
                                    loser={teamOne.points < teamTwo.points}
                                >
                                    {teamOne.name}
                                </TeamPrediction>
                                <span>Vs.</span>
                                <TeamPrediction
                                    winner={teamTwo.points > teamOne.points}
                                    loser={teamTwo.points < teamOne.points}
                                >
                                    {teamTwo.name}
                                </TeamPrediction>
                            </LeaderboardRow>
                        ))}
                    </SplitContainer>
                </MainContainer>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
