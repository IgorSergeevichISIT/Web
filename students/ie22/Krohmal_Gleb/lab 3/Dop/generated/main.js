"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const api_1 = require("./api");
const configuration_1 = require("./configuration");
// Создаем конфигурацию для API
const config = new configuration_1.Configuration({
    basePath: 'http://localhost', // Укажите базовый URL вашего API
});
// Инициализируем API
const testApi = new api_1.TestControllersApi(config);
const userApi = new api_1.UserApi(config);
const weatherApi = new api_1.WeatherForecastApi(config);
// Пример вызова методов API
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/posts/1');
            console.log('Data:', response.data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
fetchData();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Пример вызова метода из TestControllersApi
            const carResponse = yield testApi.getCar(1, 1);
            console.log('Car Response:', carResponse.data);
            // Пример вызова метода из WeatherForecastApi
            const weatherResponse = yield weatherApi.getWeatherForecast();
            console.log('Weather Forecast:', weatherResponse.data);
            // Пример вызова метода из UserApi
            const userData = { email: 'test@example.com', password: 'password123' };
            yield userApi.userRegistrationPost(userData);
            console.log('User registered successfully');
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
// Запуск программы
main();
