const params = new URLSearchParams(window.location.search);
const dotaIndex = params.get('dota');

const dota2 = [
    { 
        name: "АМ", 
        image: "images/dota11.jpg", 
        description: "Мега крип на первой минуте.",
    },
    { 
        name: "Пудж", 
        image: "images/dota22.jpg", 
        description: "Чин чопа чин чопа.",
    },
    { 
        name: "Дазл", 
        image: "images/dota33.jpg", 
        description: "...",
    },
    { 
        name: "Течис", 
        image: "images/dota44.jpg", 
        description: "*пилим*",
    },
    { 
        name: "Энигма", 
        image: "images/dota55.jpg", 
        description: "МЫ АТВИСАЕМ КАК АБИЗЯНЫ В ДЖУНГЛЯХ.",
    },
    { 
        name: "Лион", 
        image: "images/dota66.jpg", 
        description: "*ПЕРВЫЙ СКИЛЛ И ТРЕТИЙ *****",
    },
    { 
        name: "БАУНТИ ХАНТЕР", 
        image: "images/dota77.jpg", 
        description: "БАУНТИИИИ ХААААААНТЕЕЕЕР",
    }
];

if (dotaIndex !== null && dotaIndex >= 0 && dotaIndex < dota2.length) {
    const dota = dota2 [dotaIndex];
    document.getElementById('dotaName').textContent = dota.name;
    document.getElementById('dotaImage').src = dota.image;
    document.getElementById('dotaDescription').textContent = dota.description;

    if (dota.name === "АМ") {
        document.getElementById('dotaCard').classList.add('am-card');
    }
} else {
    document.getElementById('dotaName').textContent = "Попался.";
    alert("Нюдсов нет!");
}

document.querySelectorAll('.dota-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('bubble-notification');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('bubble-notification');
    });
});
