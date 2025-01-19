const catList = document.getElementById('catList');

async function fetchCats() {
    const response = await fetch('http://localhost:3000/api/cats');
    return await response.json();
}

async function renderCats() {
    const cats = await fetchCats();
    catList.innerHTML = ''; // очистка списка
    cats.forEach((cat) => {
        const catCard = document.createElement('div');
        catCard.className = 'cat-card flex flex-col h-64 w-full bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative';
        catCard.innerHTML = `
            <button class="delete-button absolute top-2 right-2 text-black rounded-full p-1" style="background-color: transparent; border: none; font-size: 20px;">✖</button>
            <a href="cat.html?cat=${cat.id - 1}" class="flex flex-col items-center justify-between h-full">
                <img src="${cat.image}" alt="${cat.name}" class="w-full h-32 object-cover rounded-md"> 
            </a>
            <h3 class="text-center font-bold">${cat.name}</h3>
        `;
        catList.appendChild(catCard);

        catCard.querySelector('.delete-button').addEventListener('click', async () => {
            await fetch(`http://localhost:3000/api/cats/${cat.id}`, { method: 'DELETE' });
            renderCats(); // обновление списка
        });
    });
}

renderCats();

// добавление новой кошки
document.getElementById('addCatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newCat = {
        name: document.getElementById('catNameInput').value,
        image: document.getElementById('catImageInput').value,
        description: document.getElementById('catDescriptionInput').value
    };

    await fetch('http://localhost:3000/api/cats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
    });

    renderCats(); // обновление списка
    document.getElementById('addCatForm').reset(); // сброс формы
});