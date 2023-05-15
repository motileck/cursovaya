import React from 'react';
import './Labyrinth.css'

/*type TLabyrinthProps = {
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
};*/

const Labyrinth = ({ gameConfig, gameResult }) => {
    const { gridSize, userStartPos, opponentStartPos, gridWalls } = gameConfig;
    const cellSize = 30

    const renderUserPlayer = () => {
        const left = `${userStartPos.x * cellSize}px`;
        const top = `${userStartPos.y * cellSize}px`;
        return (
            <div 
                className="player user"
                style={{ left: left, top: top }}
                id='player'
            ></div>
        );
    };

    const renderOpponentPlayer = () => {
        const left = `${opponentStartPos.x * cellSize}px`;
        const top = `${opponentStartPos.y * cellSize}px`;
        return (
            <div
                className="player opponent"
                style={{ left: left, top: top }}
                id='opponent'
            ></div>
        );
    };

    const isWall = (x, y) => {
        return gridWalls.some((wall) => {
            return wall.x === x && wall.y === y
        })
    }

    return (
        <div className="labyrinth">
            {[...Array(gridSize)].map((_, row) => (
                <div key={row} className="row">
                    {[...Array(gridSize)].map((_, col) => (
                        <div key={`${row}-${col}`} className={`cell${isWall(col,row) ? ' wall': ''}`}></div>
                    ))}
                </div>
            ))}
            {renderUserPlayer()}
            {renderOpponentPlayer()}
        </div>
    );
};

export default Labyrinth;