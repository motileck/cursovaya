import React, { useState } from 'react';
import './Game.css'
import StepControlPanel from "../stepControlPanel/StepControlPanel";
import Labyrinth from "../labyrinth/Labyrinth";
import GameRecordTable from "../gameRecordTable/GameRecordTable";
import WinnerModal from '../winnerModal/WinnerModal';

/*type TGameConfig = {
    userId: number,
    userName: string,
    opponentId: number,
    opponentName: string,
    gridSize: number,
    userStartPos: { x: number, y: number },
    opponentStartPos: { x: number, y: number },
    gridWalls: Array<{ x: number, y: number }>,
};

type TGameResult = {
    player1Id: number,
    player2Id: number,
    isDraw: number,
    gameRecord: Array<TGameRecordItem>,
};

type TGameRecordItem = {
    step: number,
    userMove: { x: number, y: number },
    opponentMove: { x: number, y: number },
};*/

const Game = () => {
    const [gameConfig, setGameConfig] = useState(null);
    const [gameResult, setGameResult] = useState(null);

    // функция для чтения входных данных из объекта окна браузера
    const readInputData = () => {
        //@ts-ignore
        const config = window.gameConfig;
        //@ts-ignore
        const result = window.gameResult;
        setGameConfig(config);
        setGameResult(result);
    };

    // вызов функции при монтировании компонента
    React.useEffect(() => {
        readInputData();
    }, []);

    return (
        <div>
            {gameConfig && gameResult && (
                <>
                    <StepControlPanel gameConfig={gameConfig} gameResult={gameResult} />
                    <Labyrinth gameConfig={gameConfig} gameResult={gameResult} />
                    <GameRecordTable gameConfig={gameConfig} gameResult={gameResult} />
                    <WinnerModal gameConfig={gameConfig} gameResult={gameResult} />
                </>
            )}
        </div>
    );
};

export default Game;