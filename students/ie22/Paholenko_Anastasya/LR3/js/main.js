const cats = [
    { name: "Лизка", image: "images/cat1.jpg" },
    { name: "Лёля", image: "images/cat2.jpg" },
    { name: "Котя", image: "images/cat3.jpg" },
    { name: "Мявка", image: "images/cat4.jpg" },
    { name: "Рыська", image: "images/cat5.jpg" },
    { name: "Маша", image: "images/cat6.jpg" },
    { name: "Тамара", image: "images/cat7.jpg" },
    { name: "Жук", image: "images/jyk.jpg" }
];

const catList = document.getElementById('catList');

cats.forEach((cat, index) => {
    const catCard = document.createElement('div');
    catCard.className = 'cat-card flex flex-col h-64 w-full bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg'; // Убедитесь, что карточки занимают всю ширину
    catCard.innerHTML = `
         <a href="cat.html?cat=${index}" class="flex flex-col items-center justify-between h-full">
            <img src="${cat.image || 'images/default-image.jpg'}" alt="${cat.name}" class="w-full h-32 object-cover rounded-md"> 
            
        </a>
    `;
    catList.appendChild(catCard);
});