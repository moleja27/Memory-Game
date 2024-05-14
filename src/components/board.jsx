import React, { useState } from 'react';

// A function was created with the for loop that will move the cards in a different order

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  //positions are reversed
    }
    return array; //the array is returnen completely shuffled
};

export const Board = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    //A new function is created (createBoard) where the images are imported from the data.js array, a flatMap is used to create a duplicate array to match the same images, we have an array with 10 elements then it will be duplicated to 20 elements, and each element will be modified with the ID, two pairs of images but with different IDs

    const createBoard = () => {
        const duplicatecards = imgs.flatMap((img, i) => {
            const duplicate = {
                ...img,
                id: img.id + imgs.length,
            };
            return [img, duplicate];
        });

        const newCards = shuffleArray(duplicatecards);
        const cards = newCards.map(card => {
            return {
                ...card,
                flipped: false,
                matched: false,
            };
        });
        setCards(cards);
    };

    useEffect(() => {
        createBoard();  //It is called the Function
    }, []);



    return (
        <div className='relative h-screen flex items-center'>
            <h1 className='font-bold text-4x1'>Memory Game</h1>
        </div>
    )







}

