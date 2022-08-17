// array de cartas com todas as cartas
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck com todas as cartas do jogo
const deck = document.getElementById("card-deck");

// declarando a variável de movimentos
let moves = 0;
let counter = document.querySelector(".moves");

// declarando a variável de estrelas
const stars = document.querySelectorAll(".fa-star");

// declarando a variável de matchedCards
let matchedCard = document.getElementsByClassName("match");

 // lista de estrelas
 let starsList = document.querySelectorAll(".stars li");

 // fecha o ícone do modal
 let closeicon = document.querySelector(".close");

 // declara o modal
 let modal = document.getElementById("popup1")

 // array de cartas selecionadas
var openedCards = [];


// @descrição embaralha cartas
// @parametros {array}
// @retorna array-embaralhado
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @descrição que embaralha cardas quando a página for atualizada
document.body.onload = startGame();


// @descrição da função que começa uma nova jogada
function startGame(){
 
    // esvazia o array openCards
    openedCards = [];

    // embaralha deck
    cards = shuffle(cards);
    // remove todas as classes existentes de cartas
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reseta movimentos
    moves = 0;
    counter.innerHTML = moves;
    // reseta classif.
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reseta tempo
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @descrição que seleciona se abre, mostra ou desativa cardas
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @descriçaõ que adiciona cartas selecionadas para OpenedCards e checa se elas combinam ou não
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @descrição quandas as cartas combinarem
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// @descrição de quando as cartas não combinam
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// @descrição de desabilitar cartas temporiariamente
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @descrição de ativar e desativar cartas combinadas
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @descrição de contar o número de mov. do jogador
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //começa timer no primeiro clique
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // define clasif. baseado no número de movimentos
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @descrição de timer do jogo
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @descrição que parabeniza quando todas as cartas forem encontradas, mostra o modal de movimentos, tempo e classif.
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // mostra modal de parabéns
        modal.classList.add("show");

        // declara variável de classif. de estrelas
        var starRating = document.querySelector(".stars").innerHTML;

        // mostra movimentos, classificação e tempo no modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // fecha modal
        closeModal();
    };
}


// @decrição para fechar ícone no modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// @descrição para jogar novamente 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// itera para dicionar event listeners para cada carta
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};