const suits = ['spade', 'heart', 'diamond', 'club'];
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const indexGeneration = cardType => {
    return Math.round(0.5 + Math.random() * cardType.length - 1);
};

const handsGeneration = (suits, cards, cardQuantity) => {
    const allHands = [];

    while (allHands.length < cardQuantity) {
        const anyCard = {};
        const suitsIndex = indexGeneration(suits);
        const cardsIndex = indexGeneration(cards);

        anyCard.suit = suits[suitsIndex];
        anyCard.card = cards[cardsIndex];
        anyCard.isInPare = false;
        anyCard.isFirstPair = false;
        anyCard.isSecondPair = false;
        anyCard.url = `http://h3h.net/images/cards/${suits[suitsIndex]}_${cards[cardsIndex]}.svg`;

        if (allHands.length) {
            const hasCard = allHands.some(newCard => newCard.suit === anyCard.suit && newCard.card === anyCard.card);
            if (hasCard) {
                continue;
            } else {
                allHands.push(anyCard);
            }
        } else {
            allHands.push(anyCard);
        }
    }

    cardPropertiesCleaning();

    return allHands;

};

const cardPropertiesCleaning = (anyHand) => {
    if (anyHand) {
        anyHand.hand = [];
        anyHand.pairCombination = [];
        anyHand.isWinner = false;
    }
}

const handDetermination = (allHands, sliceStart, sliceEnd) => {
    const anyHand = {
        hand: [],
        pairCombination: [],
        isWinner: false,
    };
    anyHand.hand = allHands.slice(sliceStart, sliceEnd);

    return anyHand;

};

const pairingDetecting = handForClone => {
    const oneOfHands = { ...handForClone };
    const handsCards = oneOfHands.hand;
    handsCards.sort((a, b) => a.card > b.card ? 1 : -1);

    for (let i = 0; i < handsCards.length; i++) {
        for (let j = i + 1; j < handsCards.length; j++) {
            if (handsCards[i].card === handsCards[j].card) {
                handsCards[i].isInPare = true;
                handsCards[j].isInPare = true;
            }
        }
    };

    for (let i = 0; i < handsCards.length; i++) {
        if (handsCards[i].isInPare) {
            oneOfHands.pairCombination.push(handsCards[i]);
        }
    }

    return oneOfHands;

};

const pairSeparation = anyHand => {
    const { pairCombination } = anyHand;
    let firstPair;
    let secondPair;

    if (pairCombination.length <= 3) {
        firstPair = pairCombination.slice(0, 2).map(elem => elem.isFirstPair = true);
    } else if (pairCombination.length >= 4) {
        firstPair = pairCombination.slice(0, 2).map(elem => elem.isFirstPair = true);
        secondPair = pairCombination.reverse().slice(0, 2).map(elem => elem.isSecondPair = true);
    }

    anyHand.pairCombination.forEach(elem => {
        if (elem.isFirstPair === false && elem.isSecondPair === false) {
            anyHand.pairCombination.pop(elem);
        }
    })

    return anyHand;

};

const winnerDetecting = (handUno, handDue) => {
    if (handUno.pairCombination.length > handDue.pairCombination.length) {
        handUno.isWinner = true;
    } else if (handDue.pairCombination.length > handUno.pairCombination.length) {
        handDue.isWinner = true;
    }
};

const handsRendering = (oneOfHands, handName, identificator) => {
    const divBlock = document.querySelector(`#${identificator}`);
    const playerSection = document.getElementById(handName);

    cardBordClining(divBlock);
    cardRendering(oneOfHands, handName, identificator, playerSection, 'pair0', 'pair1', 'winning');
};

const winningDecorationCleaning = () => {
    const winningClass = document.querySelector('.winning')
    if (winningClass) {
        winningClass.classList.remove('winning');
    }
};

const cardBordClining = (divBlock) => {
    if (divBlock) {
        divBlock.remove()
    }
};

const cardRendering = (oneOfHands, handName, identificator, playerSection, firstPairClassName, secondPairClassName, winningClassName) => {
    const cardHolderPlace = document.createElement('div');
    const handsCards = oneOfHands.hand;

    cardHolderPlace.setAttribute('id', identificator);
    playerSection.insertAdjacentElement('beforeend', cardHolderPlace);

    for (let i = 0; i < handsCards.length; i++) {
        const image = document.createElement('img');
        image.src = handsCards[i].url;

        if (handsCards[i].isFirstPair) {
            image.classList.add(firstPairClassName);
        }

        if (handsCards[i].isSecondPair) {
            image.classList.add(secondPairClassName);
        }

        image.classList.add('card');
        cardHolderPlace.insertAdjacentElement('beforeend', image);
    }

    if (oneOfHands.isWinner) {
        const winingSection = document.getElementById(handName);
        console.log(winingSection);
        console.log(winningClassName);
        winingSection.classList.add(winningClassName);
    }
};

const handsSetGeneration = () => {
    winningDecorationCleaning();

    const allHands = handsGeneration(suits, cards, 10);

    const handOne = handDetermination(allHands, 0, 5);
    const handTwo = handDetermination(allHands, 5);

    const handOneForManipulation = pairingDetecting(handOne);
    const handTwoForManipulation = pairingDetecting(handTwo);

    const handOneSeparatedPairs = pairSeparation(handOneForManipulation);
    const handTwoSeparatedPairs = pairSeparation(handTwoForManipulation);

    winnerDetecting(handOneSeparatedPairs, handTwoSeparatedPairs);

    handsRendering(handOneSeparatedPairs, 'handOne', 'one');
    handsRendering(handTwoSeparatedPairs, 'handTwo', 'two');
};

const buttonClick = document.querySelector('.buttons');
buttonClick.addEventListener('click', handsSetGeneration);


// const pairSeparation = anyHand => {
//     const { pairCombination } = anyHand;
//     let firstPair = [];
//     let secondPair = [];

//     if (pairCombination.length <= 3) {
//         firstPair = pairCombination.slice(0, 2).map(elem => elem.isFirstPair = true);
//     } else if (pairCombination.length >= 4) {
//         firstPair = pairCombination.slice(0, 2).map(elem => elem.isFirstPair = true);
//         secondPair = pairCombination.reverse().slice(0, 2).map(elem => elem.isSecondPair = true);
//     }

//     const cp = pairCombination.filter(pair => {
//         console.log('pair', pair);
//         return pair.isFirstPair && pair.isSecondPair;
//     });

//     return { ...anyHand, pairCombination: cp };
// };