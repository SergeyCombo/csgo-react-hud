import React from "react";
import { Player, WeaponRaw } from "csgogsi-socket";
import Weapon from "./../Weapon/Weapon";
import Avatar from "./Avatar";
import Armor from "./../Indicators/Armor";
import Bomb from "./../Indicators/Bomb";
import Defuse from "./../Indicators/Defuse";

import { Scope } from "../../assets/Icons";

interface IProps {
    player: Player,
    isObserved: boolean,
    isFreezetime: boolean,
}

export default class PlayerBox extends React.Component<IProps> {
    render() {
        const { player } = this.props;
        const weapons: WeaponRaw[] = Object.values(player.weapons).map(weapon => ({
            ...weapon,
            name: weapon.name.replace("weapon_", "")
        }));
        const primary = weapons.filter(weapon => !['C4', 'Pistol', 'Knife', 'Grenade', undefined].includes(weapon.type))[0] || null;
        const secondary = weapons.filter(weapon => weapon.type === "Pistol")[0] || null;
        const grenades = weapons.filter(weapon => weapon.type === "Grenade");

        return (
            <div
                className={`player ${player.state.health === 0 ? "dead" : ""} ${this.props.isObserved ? 'active' : ''}`}>
                <div className="player_data">
                    <Avatar steamid={player.steamid} height={57} width={57} showSkull={false} showCam={false}
                            sidePlayer={true}/>
                    <div className="player_stats">
                        <div className="row">
                            <div className="hp_wrapper">
                                <div className={`hp_bar`} style={{ width: `${player.state.health}%` }}/>
                                <div className={`hp_bar hp_bar__recent`} style={{ width: `${player.state.health}%` }}/>
                            </div>
                            <div className="username">
                                <div>{player.name}</div>
                            </div>
                            <div className="health">
                                <Armor player={player}/>
                                <span>{player.state.health}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row__inner">
                                <div className="money">$ {player.state.money.toLocaleString()}</div>
                                {
                                    player.state.round_kills ?
                                        <div className="roundkills-container">
                                            <Scope width={20} height={20}/>
                                            <span>{player.state.round_kills}</span>
                                        </div>
                                        : null
                                }
                                <div className="weapon-container">
                                    {primary || secondary ?
                                        <Weapon weapon={primary ? primary.name : secondary.name} active={true}/> : ""
                                    }
                                </div>
                            </div>
                            <div className="row__inner">
                                <div className="observer_slot">{player.observer_slot}</div>
                                <div className="stats-block">
                                    <div className="stats-block--item">
                                        <span>K</span><span>{player.stats.kills}</span>
                                    </div>
                                    <div className="stats-block--item">
                                        <span>A</span><span>{player.stats.assists}</span>
                                    </div>
                                    <div className="stats-block--item">
                                        <span>D</span><span>{player.stats.deaths}</span>
                                    </div>
                                </div>
                                <div className="utils_container">
                                    <Defuse player={player}/>
                                    <Bomb player={player}/>
                                </div>
                                <div className="grenades">
                                    {grenades.map(grenade => (
                                        [
                                            <Weapon key={`${grenade.name}-${grenade.state}`} weapon={grenade.name}
                                                    active={grenade.state === "active"} isGrenade/>,
                                            grenade.ammo_reserve === 2 ?
                                                <Weapon key={`${grenade.name}-${grenade.state}-double`}
                                                        weapon={grenade.name} active={grenade.state === "active"}
                                                        isGrenade/> : null,
                                        ]
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
