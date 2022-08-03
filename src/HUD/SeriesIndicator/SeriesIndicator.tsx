import React from 'react';
import './SeriesIndicator.scss';
import * as I from "csgogsi-socket";
import { Match } from "../../api/interfaces";

interface IProps {
    match: Match,
    side: "CT" | "T",
    team: I.Team
}

export default class SeriesIndicator extends React.Component<IProps> {
    render() {
        const { team, side, match } = this.props;
        const amountOfMaps = (match && Math.floor(Number(match.matchType.substr(-1)) / 2) + 1) || 0;
        if (!match || match.matchType === "bo1") return null;
        return (
            <div className="series_container">
                {new Array(amountOfMaps).fill(0).map((_, i) => (
                    <div key={i} className={`match_cell ${i < team.matches_won_this_series ? 'active' : ''} ${side}`}/>
                ))}
            </div>
        );
    }
}
