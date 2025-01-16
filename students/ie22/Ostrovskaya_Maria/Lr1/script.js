const backgrounds = [
    'images/background2.jpg',
    'images/background1.jpg'
];

let currentBackgroundIndex = 0;

const themeSwitchSound = document.getElementById('theme-switch-sound');
const selectTheme = document.getElementById('select-theme');

function applyTheme(theme) {
    const isLightTheme = theme === 'light';

    // Добавление/удаление класса для светлой темы
    document.body.classList.toggle('light-theme', isLightTheme);

    // Изменение фона
    const backgroundImage = isLightTheme
        ? backgrounds[currentBackgroundIndex]
        : backgrounds[(currentBackgroundIndex + 1) % backgrounds.length];
    document.body.style.backgroundImage = `url(${backgroundImage})`;

    // Переключение звука
    if (themeSwitchSound) {
        themeSwitchSound.currentTime = 0;
        themeSwitchSound.play().catch(error => {
            console.error('Ошибка при воспроизведении аудио: ', error);
        });
    }
}

function toggleThemeAndBackground() {
    const isLightTheme = document.body.classList.contains('light-theme');
    applyTheme(isLightTheme ? 'dark' : 'light');
}

// Установка начальной темы
applyTheme('dark');

// Слушатель для выпадающего списка
selectTheme.addEventListener('change', function () {
    applyTheme(this.value);
});
