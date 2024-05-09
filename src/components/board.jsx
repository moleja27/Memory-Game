import React, { useState } from 'react';

export const = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <div className='relative h-screem flex items-center'>
            <h1 className='font-bold text-4x1'>Memory Game</h1>

        </div>
    );
 
};