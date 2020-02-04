    const suits = ['spade', 'heart', 'diamond', 'club'];
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    // const suits = ['diamond', 'club', 'heart'];
    // const cards = ['10', 'J', ];
    
    const indexGeneration = cardType => {
        return Math.round(0.5 + Math.random() * cardType.length - 1);
    }; 

    const handsGeneration = (suits, cards, cardQuantity) => {
         
        const hand = [];
        while (hand.length < cardQuantity) {
                    const suitsIndex = indexGeneration(suits);
                    const cardsIndex = indexGeneration(cards);
                    const cardSolution = {};
                    
                    cardSolution.suit = suits[suitsIndex];
                    cardSolution.card = cards[cardsIndex];
                    cardSolution.url = `http://h3h.net/images/cards/${suits[suitsIndex]}_${cards[cardsIndex]}.svg`;
                    cardSolution.isPair = false;
                    
                    if (hand.length) {
                        const hasCard = hand.some(newCard => newCard.suit === cardSolution.suit && newCard.card === cardSolution.card);
                        if (hasCard) {
                            continue;
                        } else {
                            hand.push(cardSolution);
                        }
                    } else {
                        hand.push(cardSolution);
                    }
        } 
        return hand;
    }
    
    const cardBordClining = (divBlock) => {
        if (divBlock) {
            divBlock.remove()
        }
    };

    const cardRendering = (hand, identificator, playerSection) => {
       
        const cardHolderPlace = document.createElement('div');
        cardHolderPlace.setAttribute('id', identificator);
        playerSection.insertAdjacentElement('beforeend', cardHolderPlace);

        for (let i = 0; i < hand.length; i++) {
            const image = document.createElement('img');
            image.src = hand[i].url;
            image.classList.add('card');
            cardHolderPlace.insertAdjacentElement('beforeend', image);
        };
    };

    const handsRendering = (hand, handName, identificator)=> {
        const divBlock = document.querySelector(`#${identificator}`);
        const playerSection = document.getElementById(handName);
        
        cardBordClining(divBlock);
        cardRendering(hand, identificator, playerSection);
    };

    const pairDetecting = (hand, classNameFirstPair, classNameSecondPair) => {
        const pairsArr = [];
        hand.sort((a, b) => a.card > b.card ? 1 : -1);
        
        console.log(hand);

        for (let i = 0; i < hand.length; i++) {
            for (let j = i + 1; j < hand.length; j++) {
                if(hand[i].card == hand[j].card) {
                    hand[i].isPair = true;
                    hand[j].isPair = true;
                }
            }
        }

        console.log(hand);

        for (let i = 0; i < hand.length; i++) {
            if(hand[i].isPair == true) {
                pairsArr.push(hand[i]);  
            }
        }
        console.log(pairsArr);
////////////////////////////////////////////////////////////
        if (pairsArr.length <=3) {
            const needMarkingElem = 
        }
    }

    const handsSetGeneration = () => {
        const handOne = handsGeneration(suits, cards, 5);
        const handTwo = handsGeneration(suits, cards, 5);

        console.log(handOne);
        console.log(handTwo);

        pairDetecting(handOne, '.card.pair0', '.card.pair1');
        pairDetecting(handTwo, '.card.pair0', '.card.pair1');

        handsRendering(handOne, 'handOne', 'one');
        handsRendering(handTwo, 'handTwo', 'two');

        
    };

   

    const buttonClick = document.querySelector('.buttons');
    buttonClick.addEventListener('click', handsSetGeneration);
    







