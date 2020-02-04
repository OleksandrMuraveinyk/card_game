    // const suits = ['spade', 'heart', 'diamond', 'club'];
    // const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['diamond', 'club', 'heart'];
    const cards = ['10', 'J', ];
    
    const indexGeneration = cardType => {
        return Math.round(0.5 + Math.random() * cardType.length - 1);
    }; 

    const handsGeneration = (suits, cards, cardQuantity) => {
         
        const hand = [];
    //     const cardSolution = {
    //         diamond: {},
    //         club: {},
    //         spade: {},
    //         heart: {},
    //     };

    //     suits.forEach((suit) => {
    //         while(hand.length < cardQuantity) {

    //         }
    //     })


    // };
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

    const pairDetecting = (hand, className) => {
        const allCardsInHand = [];
        for (let i = 0; i < hand.length; i++) {
            allCardsInHand.push(hand[i].card);
        };
        // console.log(allCardsInHand);
        allCardsInHand.sort();
        console.log(allCardsInHand);

        const isPairArr = [];

        const compare = allCardsInHand => {
            for (let i = 0; i < allCardsInHand.length; i++) {
                if (allCardsInHand[i] == allCardsInHand[i-1]){
                    isPairArr.push(allCardsInHand[i]); 
                    isPairArr.push(allCardsInHand[i-1]);
                    
                }
            }
        }
        compare(allCardsInHand);
        console.log(isPairArr);

    }

    const handsSetGeneration = () => {
        const handOne = handsGeneration(suits, cards, 5);
        const handTwo = handsGeneration(suits, cards, 5);

        console.log(handOne);
        console.log(handTwo);

        pairDetecting(handOne, '.card.pair0');
        pairDetecting(handTwo, '.card.pair1');

        handsRendering(handOne, 'handOne', 'one');
        handsRendering(handTwo, 'handTwo', 'two');

    };

   

    const buttonClick = document.querySelector('.buttons');
    buttonClick.addEventListener('click', handsSetGeneration);
    







