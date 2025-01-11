const dota2 = [
    { name: "АМ", image: "images/dota1.jpg" },
    { name: "Пудж", image: "images/dota2.jpg" },
    { name: "Дазл", image: "images/dota3.jpg" },
    { name: "Течис", image: "images/dota4.jpg" },
    { name: "Энигма", image: "images/dota5.jpg" },
    { name: "Лион", image: "images/dota6.jpg" },
    { name: "Баунти", image: "images/dota7.jpg" },
    { name: "нюдсы", image: "images/poop.jpg" }
];

const dotaList = document.getElementById('dotaList');

dota2.forEach((dota, index) => {
    const dotaCard = document.createElement('div');
    dotaCard.className = 'dota-card flex flex-col h-64 w-full bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg'; // Убедитесь, что карточки занимают всю ширину
    dotaCard.innerHTML = `
         <a href="dota.html?dota=${index}" class="flex flex-col items-center justify-between h-full">
            <img src="${dota.image || 'images/default-image.jpg'}" alt="${dota.name}" class="w-full h-32 object-cover rounded-md"> 
            
        </a>
    `;
    dotaList.appendChild(dotaCard);
});