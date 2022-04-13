import React from "react";
import { Player } from "csgogsi-socket";
import Weapon from "./../Weapon/Weapon";
import Avatar from "./Avatar";
import "./observed.scss";
import { ArmorHelmet, ArmorFull, HealthFull, Bullets } from './../../assets/Icons';
import { Veto } from "../../api/interfaces";
import { actions } from "../../App";
import Defuse from "../Indicators/Defuse";
import Bomb from "../Indicators/Bomb";

export default class Observed extends React.Component<{ player: Player | null, veto: Veto | null, round: number }, { showCam: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            showCam: true
        };
    }

    componentDidMount() {
        actions.on('toggleCams', () => {
            console.log(this.state.showCam);
            this.setState({ showCam: !this.state.showCam });
        });
    }

    getAdr = () => {
        const { veto, player } = this.props;
        if (!player || !veto || !veto.rounds) return null;
        const damageInRounds = veto.rounds.map(round => round.players[player.steamid]).filter(data => !!data).map(roundData => roundData.damage);
        return damageInRounds.reduce((a, b) => a + b, 0) / (this.props.round - 1);
    };

    render() {
        if (!this.props.player) return '';
        const { player } = this.props;
        const weapons = Object.values(player.weapons).map(weapon => ({
            ...weapon,
            name: weapon.name.replace("weapon_", "")
        }));
        const currentWeapon = weapons.filter(weapon => weapon.state === "active")[0];
        const grenades = weapons.filter(weapon => weapon.type === "Grenade");
        return (
            <div className={`observed ${player.team.side}`}>
                <div className="main_row">
                    <div className="health_armor_container">
                        <div className="info-group">
                            <div className="health-icon icon">
                                <HealthFull/>
                            </div>
                            <div className="health text">{player.state.health}</div>
                        </div>
                        <div className="info-group">
                            <div className="armor-icon icon">
                                {player.state.helmet ? <ArmorHelmet/> : <ArmorFull/>}
                            </div>
                            <div className="health text">{player.state.armor}</div>
                        </div>
                    </div>
                    <div className="username_container">
                        <div className="username">{player.name}</div>
                        <div className="real_name">{player.realName}</div>
                    </div>
                </div>
                <div className="stats_row">
                    <div className="grenade_container">
                        <Defuse player={player}/>
                        <Bomb player={player}/>
                        {grenades.map(grenade =>
                            <React.Fragment
                                key={`${player.steamid}_${grenade.name}_${grenade.ammo_reserve || 1}`}>
                                <Weapon weapon={grenade.name} active={grenade.state === "active"} isGrenade/>
                                {grenade.ammo_reserve === 2 ?
                                    <Weapon weapon={grenade.name} active={grenade.state === "active"}
                                            isGrenade/> : null}
                            </React.Fragment>
                        )}
                    </div>
                    <Avatar steamid={player.steamid}
                            height={170} width={170}
                            showCam={this.state.showCam}
                            slot={player.observer_slot}/>
                    <div className="ammo">
                        <div className="ammo_icon_container">
                            <Bullets/>
                        </div>
                        <div className="ammo_counter">
                            <div className="ammo_clip">{(currentWeapon && currentWeapon.ammo_clip) || "-"}&nbsp;</div>
                            <div
                                className="ammo_reserve">/&nbsp;{(currentWeapon && currentWeapon.ammo_reserve) || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
