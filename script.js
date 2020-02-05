    // const suits = ['spade', 'heart', 'diamond', 'club'];
    // const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['diamond', 'club', 'heart'];
    const cards = ['10', 'J', '2', '3', '4','5', '6',];
    
    const indexGeneration = cardType => {
        return Math.round(0.5 + Math.random() * cardType.length - 1);
    }; 

    const handsGeneration = (suits, cards, cardQuantity) => {
        const allHands = [];
        while (allHands.length < cardQuantity) {
            const suitsIndex = indexGeneration(suits);
            const cardsIndex = indexGeneration(cards);
            const cardSolution = {};
            
            cardSolution.suit = suits[suitsIndex];
            cardSolution.card = cards[cardsIndex];
            cardSolution.url = `http://h3h.net/images/cards/${suits[suitsIndex]}_${cards[cardsIndex]}.svg`;
            cardSolution.isPair = false;
            cardSolution.isFirstPair = false;
            cardSolution.isSecondPair = false;
            cardSolution.isInWinningCombination = false;
            
            if (allHands.length) {
                const hasCard = allHands.some(newCard => newCard.suit === cardSolution.suit && newCard.card === cardSolution.card);
                if (hasCard) {
                    continue;
                } else {
                    allHands.push(cardSolution);
                }
            } else {
                allHands.push(cardSolution);
            }
        } 
        winningDecorationCleaning();

        return allHands;
    };

    const winningDecorationCleaning = () => {
        const winningClass = document.querySelector('.winning')
        if (winningClass){
            winningClass.classList.remove('winning');
        }
    }
 
    const handDetermination = (allHands, sliceStart, sliceEnd) => {
        const hand = allHands.slice(sliceStart, sliceEnd);
        
        return hand;
    };

    const cardBordClining = (divBlock) => {
        if (divBlock) {
            divBlock.remove()
        }
        
        
    };

    const cardRendering = (hand, handName, identificator, playerSection, firstPairClassName, secondPairClassName, winningClassName) => {
        const cardHolderPlace = document.createElement('div');
        cardHolderPlace.setAttribute('id', identificator);
        
        playerSection.insertAdjacentElement('beforeend', cardHolderPlace);

        for (let i = 0; i < hand.length; i++) {
            const image = document.createElement('img');
            image.src = hand[i].url;
            image.setAttribute('data_isPair', `${hand[i].isPair}`);
            if (hand[i].isFirstPair == true){
                image.classList.add(firstPairClassName);
            }

            if (hand[i].isSecondPair == true){
                image.classList.add(secondPairClassName);
            }

            if (hand[i].isInWinningCombination == true){
                const winingSection = document.getElementById(handName);
                winingSection.classList.add(winningClassName);
            }

            image.classList.add('card');
            cardHolderPlace.insertAdjacentElement('beforeend', image);
        };
    };

    const handsRendering = (hand, handName, identificator)=> {
        const divBlock = document.querySelector(`#${identificator}`);
        const playerSection = document.getElementById(handName);
        
        cardBordClining(divBlock);
        cardRendering(hand, handName, identificator, playerSection, 'pair0', 'pair1', 'winning');
    };

    const pairDetecting = (hand) => {
        const pairsArr = [];
        const firstPair = [];
        const secondPair = [];
        hand.handPairs = [];

        hand.sort((a, b) => a.card > b.card ? 1 : -1);
        
        for (let i = 0; i < hand.length; i++) {
            for (let j = i + 1; j < hand.length; j++) {
                if(hand[i].card == hand[j].card) {
                    hand[i].isPair = true;
                    hand[j].isPair = true;
                }
            }
        }
        
        for (let i = 0; i < hand.length; i++) {
            if(hand[i].isPair == true) {
                pairsArr.push(hand[i]); 
            }

        }
        
        // for (let j = 0; j < pairsArr.length; j++){
        //     if(pairsArr.length == 5){
        //         if(pairsArr[1].card == pairsArr[2].card){
        //             if(j <= 2) {
        //                 if(j < 2) {
        //                     pairsArr[j].isFirstPair = true;
        //                     pairsArr[j].isSecondPair = false;
        //                     firstPair.push(pairsArr[j]);
        //                 }
        //             } else{
        //                 pairsArr[j].isFirstPair = false;
        //                 pairsArr[j].isSecondPair = true; 
        //                 secondPair.push(pairsArr[j]);
        //             }
        //         }else{
        //             if(j >= 2) {
        //                 if (j > 2){
        //                     pairsArr[j].isFirstPair = false;
        //                     pairsArr[j].isSecondPair = true;
        //                     secondPair.push(pairsArr[j]);
        //                 }
        //             } else{
        //                 pairsArr[j].isFirstPair = true;
        //                 pairsArr[j].isSecondPair = false; 
        //                 firstPair.push(pairsArr[j]);
        //             }
        //         } 
        //     } else 
            
        //     if(pairsArr.length == 4){
        //         if(j < 2){
        //             pairsArr[j].isFirstPair = true;
        //             pairsArr[j].isSecondPair = false;
        //             firstPair.push(pairsArr[j]);
        //         }else if (j > 1){
        //             pairsArr[j].isFirstPair = false;
        //             pairsArr[j].isSecondPair = true;
        //             secondPair.push(pairsArr[j]);
        //         }
        //     }
        //     else 
            
        //     if(pairsArr.length <= 3) {
        //         if(j < 2){
        //         pairsArr[j].isFirstPair = true;
        //         pairsArr[j].isSecondPair = false;
        //         firstPair.push(pairsArr[j]);
        //     }
        //     } 
        // }
        // if (firstPair.length > 0) {
        //     hand.handPairs.push(firstPair);
        // }
        // if (secondPair.length > 0) {
        //     hand.handPairs.push(secondPair);
        // }

    };

    const loop = hand => {
    for (let i = 0; i < hand.length; i++) {
        hand[i].isInWinningCombination = true;
    }
};

const winnerDetermination = (handOne, handTwo) => {
    const { handPairs: handPairsOne } = handOne;
    const { handPairs: handPairsTwo } = handTwo; 

    (handPairsOne > handPairsTwo) ? (
        loop(handOne)
    ) : (handPairsOne < handPairsTwo) ? (
        loop(handTwo)
    ) : null;
};

    const handsSetGeneration = () => {
        const allHands = handsGeneration(suits, cards, 10);
       
        const handOne = handDetermination(allHands, 0, 5);
        const handTwo = handDetermination(allHands, 5);

        console.log(handOne);
        console.log(handTwo);

        pairDetecting(handOne);
        pairDetecting(handTwo);

        winnerDetermination(handOne, handTwo);

        handsRendering(handOne, 'handOne', 'one');
        handsRendering(handTwo, 'handTwo', 'two');
    };

    const buttonClick = document.querySelector('.buttons');
    buttonClick.addEventListener('click', handsSetGeneration);
    







