import React, {useState} from 'react';

type TStepControlPanelProps = {
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

const StepControlPanel: React.FC<TStepControlPanelProps> = ({gameConfig, gameResult,}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPauseClick = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            // запустить эмуляцию
        } else {
            // остановить эмуляцию
        }
    };

    const handleStepBackClick = () => {
        // перейти на предыдущий шаг
    };

    const handleStepForwardClick = () => {
        // перейти на следующий шаг
    };

    const handleRewindToStartClick = () => {
        // перемотать в начало
    };

    const handleRewindToEndClick = () => {
        // перемотать в конец
    };

    return (
        <div>
            <button onClick={handlePlayPauseClick}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={handleStepBackClick}>Step Back</button>
            <button onClick={handleStepForwardClick}>Step Forward</button>
            <button onClick={handleRewindToStartClick}>Rewind to Start</button>
            <button onClick={handleRewindToEndClick}>Rewind to End</button>
        </div>
    );
};

export default StepControlPanel;