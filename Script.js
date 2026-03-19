// Script todo do hero banner
const hero = document.querySelector('.hero');

let index = 0;

// Hero imagens mudando
const images = [    // lista de imagens que coloquei no hero banner
    "assets/images/academia.jpg",
    "assets/images/academia2.jpg",
    "assets/images/academia3.jpg",
]


function changeImage() {
    hero.style.backgroundImage= `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url(${images[index]})
    `;

    index++;
    if(index >= images.length) {
        index = 0;
    }
}

setInterval(changeImage, 5000);

changeImage();

/*------------------------------------------------------------------- */

// Hero dots (Bolinhas para trocar de imagem)
const dots = document.querySelectorAll('.dot');

function updatedots() {
    dots.forEach(dot => dot.classList.remove('active')); // Essa função mostra qual dot está ativo
    dots[index].classList.add('active');
}

dots.forEach((dot, idx) => {    // Essa função ela adiciona o evento de clickar nos dots
    dot.addEventListener('click', () => { 
        index = idx;
        changeImage();
        updatedots();
    })
});

updatedots();

/*--------------------------------------------------------------------------------- */