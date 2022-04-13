import React from 'react';
import './SeriesIndicator.scss';

interface IProps {
    matchType: "bo1" | "bo2" | "bo3" | "bo5",
    side: "CT" | "T",
    team: {
        id: string | null;
        wins: number;
    };
}

export default class SeriesIndicator extends React.Component<IProps> {
    matchCells() {
        const { matchType } = this.props;
        switch (matchType) {
            case "bo1":
                return 1;
            case "bo2":
                return 1;
            case "bo3":
                return 2;
            case "bo5":
                return 3;
            default:
                return 1;
        }
    }

    render() {
        const { matchType, team, side } = this.props;
        if (matchType === "bo1") return null;
        return (
            <div className="series_container">
                {new Array(this.matchCells()).fill(0).map((_, i) => (
                    <div className={`match_cell ${i < team.wins ? 'active' : ''} ${side}`}/>
                ))}
            </div>
        );
    }
}