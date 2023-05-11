import React from 'react';
import './GameRecordTable.css'

type TGameRecordTableProps = {
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

const GameRecordTable: React.FC<TGameRecordTableProps> = ({ gameResult }) => {
    const { player1Id, player2Id, isDraw, gameRecord } = gameResult;

    const renderTableRows = () => {
        return gameRecord.map((record, index) => (
            <tr key={index}>
                <td>{record.step}</td>
                <td>{`(${record.userMove.x}, ${record.userMove.y})`}</td>
                <td>{`(${record.opponentMove.x}, ${record.opponentMove.y})`}</td>
            </tr>
        ));
    };

    return (
        <div>
            <h2>Game Record</h2>
            <table>
                <thead>
                <tr>
                    <th>Step</th>
                    <th>{`Player ${player1Id} Move`}</th>
                    <th>{`Player ${player2Id} Move`}</th>
                </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
            {isDraw && <div>The game is a draw.</div>}
            {!isDraw && (
                <div>{`Player ${player1Id} wins!`}</div>
            )}
        </div>
    );
};

export default GameRecordTable;