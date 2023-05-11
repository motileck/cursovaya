import React from 'react';
import './Labyrinth.css'

type TLabyrinthProps = {
    gameConfig: {
        userId: number,
        userName: string,
        opponentId: number,
        opponentName: string,
        gridSize: number,
        userStartPos: { x: number, y: number },
        opponentStartPos: { x: number, y: number },
        gridWalls: Array<{ x: number, y: number }>,
    },
    gameResult: {
        player1Id: number,
        player2Id: number,
        isDraw: number,
        gameRecord: Array<{
            step: number,
            userMove: { x: number, y: number },
            opponentMove: { x: number, y: number },
        }>,
    },
};

const Labyrinth: React.FC<TLabyrinthProps> = ({ gameConfig, gameResult }) => {
    const { gridSize, userStartPos, opponentStartPos, gridWalls } = gameConfig;

    const renderGridWalls = () => {
        return gridWalls.map((wall, index) => {
            const left = `${wall.x * 15 + 25}px`;
            const top = `${wall.y * 15 + 25}px`;
            return (
                <div
                    key={index}
                    className="wall"
                    style={{ left: left, top: top }}
                ></div>
            );
        });
    };

    const renderUserPlayer = () => {
        const left = `${userStartPos.x * 50}px`;
        const top = `${userStartPos.y * 50}px`;
        return (
            <div className="player user" style={{ left: left, top: top }}></div>
        );
    };

    const renderOpponentPlayer = () => {
        const left = `${opponentStartPos.x * 15 + 25}px`;
        const top = `${opponentStartPos.y * 15 + 25}px`;
        return (
            <div
                className="player opponent"
                style={{ left: left, top: top }}
            ></div>
        );
    };

    return (
        <div className="labyrinth">
            {[...Array(gridSize)].map((_, row) => (
                <div key={row} className="row">
                    {[...Array(gridSize)].map((_, col) => (
                        <div key={`${row}-${col}`} className="cell"></div>
                    ))}
                </div>
            ))}
            {renderGridWalls()}
            {renderUserPlayer()}
            {renderOpponentPlayer()}
        </div>
    );
};

export default Labyrinth;