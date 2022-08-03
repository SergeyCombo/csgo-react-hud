import React from "react";
import './Logo.scss';
import tournament_logo from './../../assets/images/tournament_logo.svg'

export default class TournamentLogo extends React.Component {

    render() {
        return <div className="tournament_logo">
            <img src={tournament_logo} alt=""/>
        </div>;
    }
}
