import { MainPage } from "./src/pages/main/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = document.getElementById('root');
if (!root) throw new Error("Root element not found");

new MainPage(root).render();
