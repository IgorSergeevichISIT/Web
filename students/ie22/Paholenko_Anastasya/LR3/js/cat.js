const params = new URLSearchParams(window.location.search);
const catIndex = params.get('cat');

const cats = [
    { 
        name: "Лизка", 
        image: "images/cat11.jpg", 
        description: "Дружелюбная и игривая кошечка.",
    },
    { 
        name: "Лёля", 
        image: "images/cat22.jpg", 
        description: "Лёля с подружкой.",
    },
    { 
        name: "Котя", 
        image: "images/cat33.jpg", 
        description: "У Коти 1000 ммр в доте2.",
    },
    { 
        name: "Мявка", 
        image: "images/cat44.jpg", 
        description: "Любит показывать свои лапки.",
    },
    { 
        name: "Рыська", 
        image: "images/cat55.jpg", 
        description: "Любит покушать.",
    },
    { 
        name: "Маша", 
        image: "images/cat66.jpg", 
        description: "*подмигивает",
    },
    { 
        name: "Тамара", 
        image: "images/cat77.jpg", 
        description: "а она не любит фоткаться",
    }
];

if (catIndex !== null && catIndex >= 0 && catIndex < cats.length) {
    const cat = cats[catIndex];
    document.getElementById('catName').textContent = cat.name;
    document.getElementById('catImage').src = cat.image;
    document.getElementById('catDescription').textContent = cat.description;

    if (cat.name === "Лизка") {
        document.getElementById('catCard').classList.add('lizka-card');
    }
} else {
    document.getElementById('catName').textContent = "Такая кошка не найдена. Потому что это не кошка.";
    alert("Ошибка: Это не кошка!");
}

document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('bubble-notification');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('bubble-notification');
    });
});
