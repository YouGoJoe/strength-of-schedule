import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateGame } from '../state/actions';

const mapStateToProps = ({ teams }) => ({ teams });

const mapDispatchToProps = {
    updateGame
};

const TeamName = styled.div`
    border: 1px solid black;
    margin: 4px 0;
    padding: 6px 0;
`;

class Teams extends Component {
    updateGame = () => {
        const game = {
            winner: this.props.teams[Math.floor(Math.random() * 10)],
            loser: this.props.teams[Math.floor(Math.random() * 10)]
        };
        this.props.updateGame(game);
    };

    render() {
        return (
            <Fragment>
                <button onClick={this.updateGame}>Click me</button>
                {this.props.teams.map((team, index) => (
                    <TeamName key={index}>{team.name}</TeamName>
                ))}
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
