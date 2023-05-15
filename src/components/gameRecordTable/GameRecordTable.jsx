import React from 'react';
import './GameRecordTable.css'

/*type TGameRecordTableProps = {
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

const GameRecordTable = ({ gameConfig, gameResult }) => {
    const { player1Id, player2Id, isDraw, gameRecord } = gameResult;
    const { userName, opponentName} = gameConfig

    /*const renderTableRows = () => {
        return gameRecord.map((record, index) => (
            <tr key={index}>
                <td>{record.step}</td>
                <td>{`(${record.userMove.x}, ${record.userMove.y})`}</td>
                <td>{`(${record.opponentMove.x}, ${record.opponentMove.y})`}</td>
            </tr>
        ));
    };*/

    return (
        <div>
            <h2 className='game-record-heading'>Ходы игроков</h2>
            <table className='game-record-table'>
                <thead className='table-head'>
                <tr>
                    <th className='step-heading'>Ход</th>
                    <th className='player-heading'>{`Игрок ${userName}`}</th>
                    <th className='opponent-heading'>{`Оппонент ${opponentName}`}</th>
                </tr>
                </thead>
                <tbody className='table-body' id='tableBody'></tbody>
            </table>
        </div>
    );
};

export default GameRecordTable;