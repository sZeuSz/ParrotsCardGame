let number_cards; 
let player_name;
let firstChoice;
let secondChoice;
let front_face_firstCard;
let back_face_firstCard;
let front_face_SecondCard;
let back_face_SecondCard;
let op = 1;
let number_moves = 0;
let aceppt = 0;
let Matches = [0, 0];
let cards = [
            "<img class='back-face' src='parrots/bobrossparrot.gif'",
            "<img class='back-face' src='parrots/explodyparrot.gif'",
            "<img class='back-face' src='parrots/fiestaparrot.gif'",
            "<img class='back-face' src='parrots/metalparrot.gif'",
            "<img class='back-face' src='parrots/revertitparrot.gif'",
            "<img class='back-face' src='parrots/tripletsparrot.gif'",
            "<img class='back-face' src='parrots/unicornparrot.gif'"
            ]

cards.sort(comparador); 

function comparador() { 
	return Math.random() - 0.5; 
}

function ChoiceRandomize(number_tuple){

    let tuples_random = [];

    for(let i = 0; i < (number_tuple/2); i++){

        tuples_random.push(cards[i]);
        tuples_random.push(cards[i]);
    }

    tuples_random.sort(comparador);

    return tuples_random;
}

function flip_card(Elemento){
    Elemento.classList.add("disable");

    if((op & 1)){

        firstChoice = Elemento;
        firstChoice.classList.add("disable");
        firstChoice.classList.add("um");

        front_face_firstCard = document.querySelector(".card.um .front-face");
        front_face_firstCard.classList.add("roda-front-face");

        back_face_firstCard = document.querySelector(".card.um .back-face");
        back_face_firstCard.classList.add("desroda-back-face");

        Matches[0] = (document.querySelector(".card.um .desroda-back-face").getAttribute("src"));
        
    }
    else{

        secondChoice = Elemento;
        secondChoice.classList.add("disable");
        secondChoice.classList.add("dois");
        
        front_face_SecondCard = document.querySelector(".card.dois .front-face")
        front_face_SecondCard.classList.add("roda-front-face");

        back_face_SecondCard  = document.querySelector(".card.dois .back-face")
        back_face_SecondCard.classList.add("desroda-back-face");
        
        
        Matches[1] = (document.querySelector(".card.dois .desroda-back-face").getAttribute("src"));
        
        
    }
    
    if((op & 1) === 0){

        firstChoice.classList.remove("um");
        secondChoice.classList.remove("dois");

        if(Matches[0] !== Matches[1] && op % 2 == 0){
            
            firstChoice.classList.remove("disable");

            secondChoice.classList.remove("disable");

            setTimeout(function(){
                front_face_firstCard.classList.remove("roda-front-face");
                back_face_firstCard.classList.remove("desroda-back-face");

                front_face_SecondCard.classList.remove("roda-front-face");
                back_face_SecondCard.classList.remove("desroda-back-face");
            }, 1000);
        }
        else{

            firstChoice.classList.add("disable");

            secondChoice.classList.add("disable");

            previous = aceppt;

            aceppt++;
        }

        setTimeout(function(){
            if(IsFinalGame()){
                alert(`você finalizou o game com ${number_moves} number_moves :D`);
            }
        }, 1000);
    }

    op++;
    number_moves++;
}


function initialize(){
    
    number_cards = prompt("Escolha a quantidade de cartas que você deseja jogar, mi patron")

    while(number_cards < 4 || number_cards % 2 !== 0 || number_cards > 14){

        number_cards = prompt("Escolha a quantidade de cartas que você deseja jogar, VALIDA (4 à 14)! mi patron!")
    }

    const tuples = ChoiceRandomize(number_cards);
    const memo = document.querySelector(".memoizacao");

    memo.classList.remove("suma");

    setTimeout(function(){
        memo.classList.toggle("apareca");
    }, 10);

    for(let i = 0; i < tuples.length; i++){
        memo.innerHTML += `<div class="card" onclick="flip_card(this);">
                                <img class="front-face"  src="parrots/front.png">
                                ${tuples[i]}
                           </div> `
    }

}

function IsFinalGame(){

    return (aceppt === number_cards / 2);
}

initialize();