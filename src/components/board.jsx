import React, { useEffect, useState } from 'react';
import { imgs } from '../data';
import { Card } from './Card';
import { Modal } from './Modal';
// A function was created with the for loop that will move the cards in a different order

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; //positions are reversed
    }
    return array;//the array is returnen completely shuffled
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
        createBoard(); //It is called the Function
    }, []);

    //we have a stament that is used for the click of the current card that is being used,The function takes an id parameter, which represents the unique identifier of the clicked card.The filter method is used to find the card corresponding to the id in the cards array. The found card is stored in the currentCard variable, 


    const handleCardClick = id => {
        if (isDisabled) return;

        const [currentCard] = cards.filter(card => card.id === id);

        if (!currentCard.flipped && !currentCard.matched) {
            currentCard.flipped = true;

            const newFlippedCards = [...flippedCards, currentCard];
            setFlippedCards(newFlippedCards);

            if (newFlippedCards.length === 2) {
                setIsDisabled(true);
                const [firstCard, secondCard] = newFlippedCards;

                if (firstCard.img === secondCard.img) {
                    firstCard.matched = true;
                    secondCard.matched = true;
                    setIsDisabled(false);
                } else {
                    setTimeout(() => {
                        firstCard.flipped = false;
                        secondCard.flipped = false;
                        setCards(cards);
                        setIsDisabled(false);
                    }, 1000);
                }

                setFlippedCards([]);
                setMoves(moves + 1);
            }

            setCards(cards);
        }

        if (cards.every(card => card.matched)) {
            setGameOver(true);
            setIsDisabled(true);
        }
    };

    //reset the states,

    const handleNewGame = () => {
        setCards([]);// all cards will be emptied and it will be an empty array
        createBoard();// The function is reused when you click the button
        setMoves(0); // game move counter
        setGameOver(false);// When the game ends it will be true but it will change to false
        setIsDisabled(false);//Finally, it will be its default state (false)
    };

    //the game has a button that will use the previous options to start the new game (New cats Game)...
    //at the beginning of the return they have a conditional that says (if it is gameOver it will use the div that is in the conditional)
    // Modal is imported outside the card game that will only be shown if the game is finished, the modal has some properties:
    // gameOver={gameOver} (then end of the game)
    //setGameOver={setGameOver} (changes the game state)
    // moves={moves} summary of moves
    // handleNewGame={handleNewGame} to start a new game



    return (
        <>
            {gameOver && (
                <div className='fixed inset-0 bg-black opacity-50 z-10'></div>
            )}

            <div className='relative h-screen flex items-center'>
                <div className='mx-auto flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-4xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl'>
                        Memory Card Cat Game
                    </h1>
                    <div className='grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3'>
                        {cards.map(card => (
                            <Card
                                card={card}
                                key={card.id}
                                handleCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                    <button
                        className='bg-black font-semibold text-white rounded-md px-5 py-1 hover:bg-yellow-500 hover:text-black transition-all mb-3'
                        onClick={handleNewGame}
                    >
                        New cats game
                    </button>
                </div>

                <Modal
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    moves={moves}
                    handleNewGame={handleNewGame}
                />
            </div>
        </>
    );
};
