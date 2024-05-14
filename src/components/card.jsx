import React from 'react'

export const card = ({ card, handleCardClick }) => { //this function gets called when clicking on a card. 
                                                    //It tells the game which card was picked.
    return (
        <div>
            className={`drop-shadow-md flex items-center ${
                card.flipped ? '[transform: rotateY(10deg)]' : 'bg-white'//This logic changes the appearance of the 
                                                                        //card if the card is flipped (card.flipped). 
                                                                        //If it is flipped it will rotate (‘transform: rotate’). 
                                                                        //If it is not flipped it will have a 
                                                                        //white background (‘bg-white’)
			} justify-center cursor-pointer h-16 w-16 hover:scale-105 rounded-xl transition-all duration-1000`} 
			onClick={() => handleCardClick(card.id)}

            <div>
				<img //refers to the image that the specific card holds
					src={card.img}
					alt={card.alt}
					className={`h-16 scale-110 ${
						!card.flipped
							? '[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000'
							: ''
                            //Another logic expression that changes the appearance of the card whether it is flipped or not. 
                            //If the card is flipped ('card.flipped'=true), the card will rotate 
                            //and hide the back of the card (=making the image visible). 
                            //If the card is not flipped ('card.flipped'=not true), no change in styles will be applied and the 
                            //card will remain in it's original state.  
					}`}
				/>
			</div>
		</div>
    )
}

export default card
