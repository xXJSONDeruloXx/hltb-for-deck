import { DialogButtonPrimary, Navigation, ServerAPI } from 'decky-frontend-lib';
import useHltb from '../../hooks/useHltb';
import { usePreference, useStyle } from '../../hooks/useStyle';
import style from './style';

type GameStatsProps = {
    serverApi: ServerAPI;
    game: string;
    appId: number;
    id: string;
};

export const GameStats = ({ serverApi, game, appId, id }: GameStatsProps) => {
    const { mainStat, mainPlusStat, completeStat, allStylesStat, platforms, gameId } =
        useHltb(appId, game, serverApi);
    const hltbStyle = useStyle();
    const hideDetails = usePreference();
    const baseClass = hltbStyle === null ? 'hltb-info-absolute' : 'hltb-info';
    // Hide if there are no stats
    const hide =
        mainStat === mainPlusStat &&
        mainPlusStat === completeStat &&
        completeStat === allStylesStat &&
        allStylesStat === '--'; &&
        platforms === '--';
    let hltbInfoStyle = '';
    switch (hltbStyle) {
        case 'clean':
        case 'clean-left':
            hltbInfoStyle = 'hltb-info-clean';
            break;
        case 'clean-default':
            hltbInfoStyle = 'hltb-info-clean-default';
            break;
    }
    const hltbInfoPosition =
        hltbStyle === 'clean-left' ? 'hltb-info-clean-left' : '';
    const btnStyle =
        hltbStyle === 'default' || hltbStyle === 'clean-default'
            ? ''
            : 'hltb-details-btn-clean';

    return (
        <div id={id} style={{ display: hide ? 'none' : 'block' }}>
            {style}
            <div
                className={`${baseClass} ${hltbInfoStyle} ${hltbInfoPosition}`}
            >
                <ul>
                    <li>
                        <p className="hltb-gametime">{mainStat} hours</p>
                        <p className="hltb-label">Main Story</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{mainPlusStat} hours</p>
                        <p className="hltb-label">Main + Extras</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{completeStat} hours</p>
                        <p className="hltb-label">Completionist</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{allStylesStat} hours</p>
                        <p className="hltb-label">All Styles</p>
                    </li>
                    <li>
                        <p className="hltb-gametime">{platforms} Platforms</p>
                        <p className="hltb-label">Platforms</p>
                    </li>
                    {gameId && !hideDetails && (
                        <li>
                            <DialogButtonPrimary
                                className={`hltb-details-btn ${btnStyle}`}
                                onClick={() =>
                                    Navigation.NavigateToExternalWeb(
                                        `https://howlongtobeat.com/game/${gameId}`
                                    )
                                }
                            >
                                View Details
                            </DialogButtonPrimary>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
