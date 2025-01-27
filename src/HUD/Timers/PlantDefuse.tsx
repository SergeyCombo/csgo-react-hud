import React from "react";

import { Timer } from "../MatchBar/MatchBar";
import { Player } from "csgogsi";
import * as I from "./../../assets/Icons";

interface IProps {
    timer: Timer | null;
    side: "right" | "left";
}

export default class Bomb extends React.Component<IProps> {
    getSide = (player: Player | null) => {
        if (player) return player.team.side;
        return '';
    };
    getCaption = (type: "defusing" | "planting", player: Player | null) => {
        if (!player) return null;
        if (type === "defusing") return <I.Defuse height={22} width={22} fill="var(--white-full)"/>;
        return <I.SmallBomb height={22} width={22} fill="var(--white-full)"/>;
    };


    render() {
        const { side, timer } = this.props;
        return (
            <div className={`defuse_plant_container ${timer ? this.getSide(timer.player) : ''} ${side} ${timer && timer.active ? 'show' : 'hide'}`}>
                {
                    timer
                        ? <div className={`defuse_plant_caption`}>{this.getCaption(timer.type, timer.player)}</div>
                        : null
                }
                <div className="defuse_plant_bar" style={{ width: `${(timer && timer.width) || 0}%` }}/>
            </div>
        );
    }
}
