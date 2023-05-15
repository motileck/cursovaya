import React, {useEffect, useState} from 'react';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import './StepControlPanel.css'

const StepControlPanel = ({gameConfig, gameResult,}) => {
    const player = 1
    const opponent = 2
    const timerDelay = 1000
    let timerId
    let currentStep = -1
    const lastStep = gameResult.gameRecord.length - 1

    const openWinnerModal = () => {
        const winnerModal = document.querySelector('#winnerModal')
        if (winnerModal) {winnerModal.style.display = 'block'}
    }

    const setButtonsDisability = () => {
        const prev = document.querySelector('#prev')
        const next = document.querySelector('#next')
        const rewind = document.querySelector('#rewind')
        const forward = document.querySelector('#forward')
        const play = document.querySelector('#play')

        if (currentStep === 0) {
            prev.disabled = true
            rewind.disabled = true
        }
        else {
            prev.disabled = false
            rewind.disabled = false
        }

        if (currentStep === lastStep){
            next.disabled = true
            forward.disabled = true
        }
        else {
            next.disabled = false
            forward.disabled = false
        }

        if (play.dataset.state === 'pause') {
            prev.disabled = true
            rewind.disabled = true
            next.disabled = true
            forward.disabled = true
        }
    }

    const setTableRecord = (step = 0) => {
        const tableBody = document.querySelector('#tableBody')
        tableBody.innerHTML = ''
        for (let i = 0; i <= step; i++){
            const stepInfo = window.gameResult.gameRecord[i]
            const userMove = stepInfo.userMove
            const opponentMove = stepInfo.opponentMove
            const tableRowHTML = `
                <tr>
                    <td>${stepInfo.step}</td>
                    <td>(${userMove.x}, ${userMove.y})</td>
                    <td>(${opponentMove.x}, ${opponentMove.y})</td>
                </tr>
            `
            tableBody.insertAdjacentHTML('beforeend', tableRowHTML)
        }
    }

    const setGameStep = () => {
        movePlayer(player, currentStep)
        movePlayer(opponent, currentStep)
        setTableRecord(currentStep)
        setButtonsDisability()
    }

    const movePlayer = (playerNum = 1, step = 0) => {
        const cellSize = 30
        const stepInfo = gameResult.gameRecord[step]
        let playerId, playerCoords
        if (playerNum === 1){
            playerId = 'player'
            playerCoords = stepInfo.userMove
        }
        if (playerNum === 2){
            playerId = 'opponent'
            playerCoords = stepInfo.opponentMove
        }
        const player = document.querySelector(`#${playerId}`)
        if (!player) return
        player.style.left = `${playerCoords.x * cellSize}px`
        player.style.top = `${playerCoords.y * cellSize}px`
    }

    const setButtonState = (state) => {
        const btn = document.querySelector('#play')
        const tooltipTextPlay = document.querySelector('#tooltipTextPlay')
        const tooltipTextPause = document.querySelector('#tooltipTextPause')
        const tooltipTextRestart = document.querySelector('#tooltipTextRestart')
        btn.dataset.state = state
        switch(state){
            case 'play':
                btn.innerHTML = `
                    <svg style="width:24px; height:24px;" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
                    </svg>
                `
                tooltipTextPause.style.display = 'none'
                tooltipTextPlay.style.display = 'inline-block'
                tooltipTextRestart.style.display = 'none'
                break
            case 'pause':
                btn.innerHTML = `
                    <svg style="width:24px; height:24px;" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
                    </svg>
                `
                tooltipTextPause.style.display = 'inline-block'
                tooltipTextPlay.style.display = 'none'
                tooltipTextRestart.style.display = 'none'
                break
            case 'restart':
                btn.innerHTML = `
                    <svg style="width:24px; height:24px;" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"></path>
                    </svg>
                `
                tooltipTextPause.style.display = 'none'
                tooltipTextPlay.style.display = 'none'
                tooltipTextRestart.style.display = 'inline-block'
                break
        }
    }

    const handlePlayClick = (event) => {
        const playButton = event.target.closest('#play')
        if (!playButton) return
        switch (playButton.dataset.state){
            case 'play':
                play()
                break
            case 'pause':
                pause()
                break
            case 'restart':
                restart()
                break
        }
    };

    const play = () => {
        timerId = setInterval(() => {
            if (currentStep === lastStep){
                clearInterval(timerId)
                openWinnerModal()
                setButtonState('restart')
                setButtonsDisability()
                return
            }
            currentStep++
            setGameStep()
        }, timerDelay)
        currentStep = currentStep !== -1 ? currentStep : 0
        setButtonState('pause')
        setGameStep()
    }

    const pause = () => {
        clearInterval(timerId)
        timerId = null
        setButtonState('play')
        setButtonsDisability()
    }

    const restart = () => {
        currentStep = 0
        play()
    }

    const handlePrevClick = () => {
        let prev = document.querySelector('#prev')
        if (prev.disabled) return
        if (currentStep > 0) {
            currentStep--
            setGameStep()
        }
    };

    const handleNextClick = () => {
        if (document.querySelector('#next').disabled) return
        if (currentStep < lastStep) {
            currentStep++
            setGameStep()
            if (currentStep === lastStep){
                openWinnerModal()
                setButtonState('restart')
            }
        }
    };

    const handleRewindClick = () => {
        let rewind = document.querySelector('#rewind')
        if (rewind.disabled || currentStep <= 0) return
        currentStep = 0
        setGameStep()
    }

    const handleForwardClick = () => {
        if (document.querySelector('#forward').disabled) return
        currentStep = lastStep
        setGameStep()
        setButtonState('restart')
        openWinnerModal()
    };

    return (
        <div className='button-container'>
            <div className="tooltip">
                <button className='button' onClick={handleRewindClick} id='rewind'>
                    <ButtonIcon iconType='rewind'/>
                </button>
                <span className="tooltip-text">Перемотать в начало</span>
            </div>
            <div className="tooltip">
                <button className='button' onClick={handlePrevClick} id='prev'>
                    <ButtonIcon iconType='prev'/>
                </button>
                <span className="tooltip-text">Шаг назад</span>
            </div>
            <div className="tooltip">
                <button className='button' onClick={handlePlayClick} id='play' data-state='play'>
                    <ButtonIcon iconType='play'/>
                </button>
                <span 
                    id="tooltipTextRestart"
                    className="tooltip-text"
                    style={{display: 'none'}}>
                    Рестарт
                </span>
                <span 
                    id="tooltipTextPlay"
                    className="tooltip-text"
                    style={{display: 'inline-block'}}>
                    Запустить
                </span>
                <span 
                    id="tooltipTextPause"
                    className="tooltip-text"
                    style={{display: 'none'}}>
                    Пауза
                </span>
            </div>
            <div className="tooltip">
                <button className='button' onClick={handleNextClick} id='next'>
                    <ButtonIcon iconType='next'/>
                </button>
                <span className="tooltip-text">Шаг вперед</span>
            </div>
            <div className="tooltip">
                <button className='button' onClick={handleForwardClick} id='forward'>
                    <ButtonIcon iconType='forward'/>
                </button>
                <span className="tooltip-text">Перемотать в конец</span>
            </div>
        </div>
    );
};

export default StepControlPanel
