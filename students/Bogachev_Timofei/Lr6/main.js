import {MainPage} from "./Pages/main/index.js";
const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}
