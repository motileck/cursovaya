import React from 'react'
import './WinnerModal.css'

const WinnerModal = ({ gameConfig, gameResult }) => {
  const { isDraw } = gameResult;
  const { userName, opponentName} = gameConfig

  const handleClick = () => {
    const winnerModal = document.querySelector('#winnerModal')
    if (winnerModal) {winnerModal.style.display = 'none'}
  }

  return (
    <div className='winner-modal' id='winnerModal'>
      <div id="winnerModalContent" className="winner-modal-content">
          <span id="winnerModalCloseBtn" className="close-btn" onClick={handleClick}>x</span>
          <div id="winnerModalHeading">
              <h3 className="winner-heading">Результат игры</h3>
              <div className='winner-content'>
                  {isDraw ? 
                  <p className='draw'>
                      Игроки <b>{userName}</b> и <b>{opponentName}</b> сыграли в ничью
                  </p> : 
                  <p>
                      <span className='winner'>Победитель:</span> <b>{userName}</b> <br></br>
                      <span className='loser'>Проигравший:</span> <b>{opponentName}</b>
                  </p>}
              </div>
          </div>
      </div>
    </div>
  )
}

export default WinnerModal
