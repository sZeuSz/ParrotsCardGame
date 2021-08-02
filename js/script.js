let number_cards; 
let player_name;
let firstChoice;
let secondChoice;
let front_face_firstCard;
let back_face_firstCard;
let front_face_SecondCard;
let back_face_SecondCard;
let timer_and_score_id;
let op = 1;
let multiplicador = 1;
let number_moves = 0;
let aceppt = 0;
let pontos = 1;
let seconds = 0;
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

let users = [{name: "Leandrão", time: 45, cards: 14, score: 10000}, {name: "Hacker", time: 30, cards: 14, score: 10500}];


cards.sort(comparador); 

function comparador() { 
	return Math.random() - 0.5; 
}

function save(){
    const user = {
        name: player_name,
        time: seconds,
        cards: number_cards,
        score: Number(pontos)
    }

    users.push(user);

    users.sort(function(x, y){
        
        if(x.score > y.score){
            return -1;
        }
        else if(x.score < y.score){
            return 1;
        }
        
        return 0;
    })

    console.log(users);

}

function sreset(){
    const memoizacao = document.querySelector(".memoizacao");
    const ranking = document.querySelector(".ranking");

    memoizacao.innerHTML = "";

    ranking.innerHTML = "";

    memoizacao.classList.toggle("suma");

    op = 1;
    aceppt = 0;
    number_moves = 0;
    seconds = 0;

    cards.sort(comparador); 
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

function showranking(){
    const ranking = document.querySelector(".ranking");

    document.querySelector(".memoizacao").classList.toggle("apareca");

    setTimeout(function(){ 
        ranking.classList.toggle("esmaecer");
    }, 3000);

    setTimeout(function(){
        document.querySelector(".ranking").classList.toggle("esmaecer");        
    }, 8500);

    ranking.innerHTML += `<p class="name title-of-game">Ranking</p>`
    
    console.log(users);
    console.log(users.length)
    for(let i = 0; i < users.length; i++){

        ranking.innerHTML += ` <div class='linha-ranking'>
                                    <div><ion-icon name='person-sharp'></ion-icon>: ${users[i].name}</div> <div><ion-icon name='copy-sharp'></ion-icon>: ${users[i].cards} cartas</div> <div><ion-icon name='hourglass-sharp'></ion-icon>: ${users[i].time} segundos</div> <div><ion-icon name="logo-npm"></ion-icon>: ${users[i].score}</div>
                               </div>
                             `
    }
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

            multiplicador = 1 - 0.2;
            seconds += 15;
        }
        else{

            firstChoice.classList.add("disable");

            secondChoice.classList.add("disable");

            aceppt++;
            multiplicador++;
        }

        setTimeout(function(){
            if(IsFinalGame()){
                clearInterval(timer_and_score_id);

                alert(`você finalizou o game com ${number_moves} movimentos em ${seconds} segundos, sua pontuação: ${pontos} pontos :D`);

                save();

                showranking();

                setTimeout(function(){
                    sreset();
                }, 10500);

                setTimeout(function(){

                let continuar = prompt("Você deseja jogar novamente? [Sim/Não] ");

                while(continuar[0] !== "S" && continuar[0] !== "N" && continuar[0] !== "s" && continuar[0] !== "n" ){
                    
                    continuar = prompt("Você deseja jogar novamente? [Sim/Não] ");
                }

                if(continuar[0] === 'S' || continuar[0] === 's'){
                    
                    initialize();
                }
                }, 10600);
            }
        }, 1000);
    }

    op++;
    number_moves++;
}


function initialize(){
    
    player_name = prompt("Insira seu nome para aparecer no ranking: ");

    number_cards = prompt("Escolha a quantidade de cartas que você deseja jogar, mi patron")

    while(number_cards < 4 || number_cards % 2 !== 0 || number_cards > 14){

        number_cards = prompt("Escolha a quantidade de cartas VALIDA! (4 à 14) que você deseja jogar, mi patron")
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

    timer_and_score_id = setInterval(function () { 
        cronominos();
        score_counting()
    }, 1000);
}

function IsFinalGame(){

    return (aceppt === number_cards / 2);
}

function cronominos(){
    const Game_time = document.querySelector(".cronometro");
    seconds++;
    Game_time.innerHTML = format_time(seconds)
}

function format_time(time){

    return time >= 10 ? `Time:${time}` : `Time: 0${time}`;
}

function score_counting(){
    
    pontos = (((((number_cards + (4/seconds) ) * number_cards)) * multiplicador)).toFixed(0);  
    const score  = document.querySelector(".score");

    score.innerHTML = `Score: ${pontos}`;
}

initialize();