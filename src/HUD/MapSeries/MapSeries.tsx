import React from "react";
import * as I from "csgogsi-socket";
import { Match, Veto } from '../../api/interfaces';
import TeamLogo from "../MatchBar/TeamLogo";
import "./mapseries.scss";

import de_ancient from '../../assets/series_bg/de_ancient.jpg';
import de_dust2 from '../../assets/series_bg/de_dust2.jpg';
import de_inferno from '../../assets/series_bg/de_inferno.jpg';
import de_mirage from '../../assets/series_bg/de_mirage.jpg';
import de_nuke from '../../assets/series_bg/de_nuke.jpg';
import de_overpass from '../../assets/series_bg/de_overpass.jpg';
import de_vertigo from '../../assets/series_bg/de_vertigo.jpg';

interface IProps {
    match: Match | null;
    teams: I.Team[];
    isFreezetime: boolean;
    map: I.Map;
}

interface IVetoProps {
    veto: Veto;
    teams: I.Team[];
    active: boolean;
}

class VetoEntry extends React.Component<IVetoProps> {
    render() {
        const { veto, teams, active } = this.props;
        return <div className={`veto_container ${active ? 'active' : ''}`}>
            <div className="veto_map_name">
                {veto.mapName}
            </div>
            <div className="veto_picker">
                <TeamLogo team={teams.filter(team => team.id === veto.teamId)[0]}/>
            </div>
            <div className="veto_winner">
                <TeamLogo team={teams.filter(team => team.id === veto.winner)[0]}/>
            </div>
            <div className="veto_score">
                {Object.values((veto.score || ['-', '-'])).sort().join(":")}
            </div>
            <div className="active_container">
                <div className="active">Currently playing</div>
            </div>
        </div>;
    }
}


export default class MapSeries extends React.Component<IProps> {
    render() {

        const { match, teams, isFreezetime } = this.props;
        if (!match || !match.vetos.length) return null;
        /*        return (
                       <div className={`map_series_container ${isFreezetime ? 'show' : 'hide'}`}>
                           <div className="title_bar">
                               <div className="picked">Picked</div>
                               <div className="winner">Winner</div>
                               <div className="score">Score</div>
                           </div>
                           {match.vetos.filter(veto => veto.type !== "ban").map(veto => {
                               if (!veto.mapName) return null;
                               return <VetoEntry
                                   key={`${match.id}${veto.mapName}${veto.teamId}${veto.side}`}
                                   veto={veto}
                                   teams={teams}
                                   active={map.name.includes(veto.mapName)}
                               />;
                           })}
                       </div>
                   );*/

        const maps = [
            { name: 'de_nuke', file: de_nuke },
            { name: 'de_ancient', file: de_ancient },
            { name: 'de_dust2', file: de_dust2 },
            { name: 'de_mirage', file: de_mirage },
            { name: 'de_inferno', file: de_inferno },
            { name: 'de_overpass', file: de_overpass },
            { name: 'de_vertigo', file: de_vertigo }
        ];

        return (
            <div className={`map_series_container ${isFreezetime ? 'show' : 'hide'}`}>
                <div className="title_bar">
                    <div className="col1">Map</div>
                    <div className="col2">Picked</div>
                    <div className="col3">Score</div>
                </div>
                {match.vetos.filter(veto => veto.type !== "ban").map(veto => {
                    if (!veto.mapName) return null;

                    const img = maps.find(map => map.name === veto.mapName);
                    const style: React.CSSProperties = { backgroundImage: `url(${img ? img.file : ''})` };
                    const [, cleanMapName] = veto.mapName.split('_');

                    const col3 = () => {
                        if (veto.mapEnd) {
                            return (
                                <div className={'col3__score'}>
                                    <TeamLogo team={teams.find(team => team.id !== veto.winner)}/>
                                    <span>{Object.values((veto.score || ['-', '-'])).sort((a, b) => a - b).join(" : ")}</span>
                                    <TeamLogo team={teams.find(team => team.id === veto.winner)}/>
                                </div>
                            );
                        } else {
                            return (<div className={'col3__inProgress'}>PLAYING NOW</div>);
                        }
                    };

                    return ( /*<VetoEntry
                        key={`${match.id}${veto.mapName}${veto.teamId}${veto.side}`}
                        veto={veto}
                        teams={teams}
                        active={map.name.includes(veto.mapName)}/>;*/

                        <div
                            className={`veto_container ${veto.mapEnd || veto.type === "decider" ? '' : 'veto_container__active'}`}
                            key={`${match.id}${veto.mapName}${veto.teamId}${veto.side}`} style={style}>
                            <div className="col1">{cleanMapName}</div>
                            <div className="col2">
                                {
                                    veto.type === "decider"
                                        ? <div className={'decider-label'}>decider</div>
                                        : <TeamLogo team={teams.filter(team => team.id === veto.teamId)[0]}/>
                                }
                            </div>
                            <div className="col3">
                                {
                                    veto.type === "decider"
                                        ? ''
                                        : col3()
                                }
                            </div>
                        </div>
                    );
                })}
                {/*<div className={`veto_container veto_container__active`} style={style}>
                    <div className="col1">1</div>
                    <div className="col2">2</div>
                    <div className="col3">3</div>
                </div>
                <div className={`veto_container`} style={style}>
                    <div className="col1">1</div>
                    <div className="col2">2</div>
                    <div className="col3">3</div>
                </div>*/}
            </div>
        );
    }
}
