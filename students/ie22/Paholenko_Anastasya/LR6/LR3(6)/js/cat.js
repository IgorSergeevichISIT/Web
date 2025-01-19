const params = new URLSearchParams(window.location.search);
const catIndex = params.get('cat');

async function fetchCat(catIndex) {
    const response = await fetch('http://localhost:3000/api/cats');
    const cats = await response.json();
    return cats[catIndex];
}

(async () => {
    if (catIndex !== null && catIndex >= 0) {
        const cat = await fetchCat(catIndex);
        if (cat) {
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
    } else {
        document.getElementById('catName').textContent = "Такая кошка не найдена. Потому что это не кошка.";
        alert("Ошибка: Это не кошка!");
    }
})();