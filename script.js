const suits = ['spade', 'heart', 'diamond', 'club'];
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// const suits = ['spade', 'heart'];
// const cards = ['2', '3', '4', '5', '6', '7',];

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
    }; 
    winningDecorationCleaning();
    return allHands;
};

const winningDecorationCleaning = () => {
    const winningClass = document.querySelector('.winning')
    if (winningClass){
        winningClass.classList.remove('winning');
    }
};

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
        if (hand[i].isFirstPair === true){
            image.classList.add(firstPairClassName);
        }

        if (hand[i].isSecondPair === true){
            image.classList.add(secondPairClassName);
        }

        if (hand[i].isInWinningCombination === true){
            const winingSection = document.getElementById(handName);
            winingSection.classList.add(winningClassName);
        }
        image.classList.add('card');
        cardHolderPlace.insertAdjacentElement('beforeend', image);
    }
};

const handsRendering = (hand, handName, identificator) => {
    const divBlock = document.querySelector(`#${identificator}`);
    const playerSection = document.getElementById(handName);
    
    cardBordClining(divBlock);
    cardRendering(hand, handName, identificator, playerSection, 'pair0', 'pair1', 'winning');
};

const pairDetecting = (hand) => {
    const pairsArr = [];
    let firstPair = [];
    let secondPair = [];
    hand.handPairs = [];

    hand.sort((a, b) => a.card > b.card ? 1 : -1);
    
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i].card === hand[j].card && hand[i].suit != hand[j].suit) {
                pairsArr.push(hand[i]);
                pairsArr.push(hand[j]); 
            }
        } 
    };

    if (pairsArr.length < 4 || pairsArr.length === 6) {
        firstPair = pairsArr.slice(0,2);
    } else if (pairsArr.length >= 4) {
        firstPair = pairsArr.slice(0,2);
        secondPair = pairsArr.reverse().slice(0,2);
    } 
    
    if (firstPair.length || secondPair.length) {
        firstPair.forEach(element => element.isFirstPair = true);
        secondPair.forEach(element => element.isSecondPair = true);
        hand.handPairs.push(secondPair);
        hand.handPairs.push(firstPair);
    }
};
    
const loop = hand => {
    hand.forEach(card => card.isInWinningCombination = true);
};

const winnerDetermination = (mutableHandOne, mutableHandTwo) => {
    const { handPairs: handPairsOne } = mutableHandOne;
    const { handPairs: handPairsTwo } = mutableHandTwo; 

    (handPairsOne > handPairsTwo) ? (
        loop(mutableHandOne)
    ) : (handPairsOne < handPairsTwo) ? (
        loop(mutableHandTwo)
    ) : null;
};

const handsSetGeneration = () => {
    const allHands = handsGeneration(suits, cards, 10);
    
    const handOne = handDetermination(allHands, 0, 5);
    const handTwo = handDetermination(allHands, 5);

    console.log(handOne);
    console.log(handTwo);

    const mutableHandOne = handOne.slice();
    const mutableHandTwo = handTwo.slice();

    pairDetecting(mutableHandOne);
    pairDetecting(mutableHandTwo);

    winnerDetermination(mutableHandOne, mutableHandTwo);

    handsRendering(handOne, 'handOne', 'one');
    handsRendering(handTwo, 'handTwo', 'two');
};

const buttonClick = document.querySelector('.buttons');
buttonClick.addEventListener('click', handsSetGeneration);