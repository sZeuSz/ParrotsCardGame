let op = 1;
let cartas = [0, 0];

function vira(Elemento){

    let firstChoice;
    let secondChoice;
    let a, b, c ,d;
    console.log(op);

    if(op % 2 !== 0){
        Elemento.classList.add("um");
        a = document.querySelector(".card.um .front-face").classList.add("roda-front-face");
        b = document.querySelector(".card.um .back-face").classList.add("desroda-back-face");
        // console.log(a.classList.add("roda-front-face"));
        // console.log(b.classList.add("desroda-back-face"));
        cartas[0] = (document.querySelector(".desroda-back-face").getAttribute("src"));
    }
    else{
        Elemento.classList.add("dois");
        c = document.querySelector(".card.dois .front-face").classList.add("roda-front-face");
        d = document.querySelector(".card.dois .back-face").classList.add("desroda-back-face");
        // console.log(c.classList.add("roda-front-face"));
        // console.log(d.classList.add("desroda-back-face"));
        cartas[1] = (document.querySelector(".card.dois .desroda-back-face").getAttribute("src"));
        console.log(cartas[0] === cartas[1]);
        if(cartas[0] !== cartas[1] && op % 2 == 0){
            console.log("erôu!1")
            let myGreeting = setTimeout(function() {
                a.classList.remove("roda-front-face");
                b.classList.remove("desroda-back-face");
            }, 1000)
        }
        else{
            console.log("certôô!")
        }
    }
    console.log(cartas);
    console.log(cartas);
    op++;
}

