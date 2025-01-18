const backgrounds = [
    'images/background1.jpg',
    'images/background2.jpg'
];

let currentBackgroundIndex = 0;

const themeSwitchSound = document.getElementById('theme-switch-sound');

function toggleThemeAndBackground() {
    document.body.classList.toggle('light-theme');
    
    if (themeSwitchSound) {
        themeSwitchSound.currentTime = 0;
        themeSwitchSound.play().catch((error) => {
            console.error("Ошибка при воспроизведении аудио: ", error);
        }); 
    }

    document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;

    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
}


toggleThemeAndBackground();

document.getElementById('select-theme').addEventListener('change', function () {
    if (this.value === 'light') {
        document.body.classList.add('light-theme');
        document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
    } else {
        document.body.classList.remove('light-theme');
        document.body.style.backgroundImage = `url(${backgrounds[(currentBackgroundIndex + 1) % backgrounds.length]})`;
    }

    themeSwitchSound.currentTime = 0;
    themeSwitchSound.play().catch((error) => {
        console.error("Ошибка при воспроизведении аудио: ", error);
    });
});
