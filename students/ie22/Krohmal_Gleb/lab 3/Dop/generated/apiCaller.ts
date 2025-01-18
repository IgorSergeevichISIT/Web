import { TestControllersApi, UserApi, WeatherForecastApi } from './api';
import { Configuration } from './configuration';

// Создаем конфигурацию для API
const config = new Configuration({
  basePath: 'http://localhost', // Укажите базовый URL вашего API
});

// Инициализируем API
const testApi = new TestControllersApi(config);
const userApi = new UserApi(config);
const weatherApi = new WeatherForecastApi(config);

// Функция для вызова методов API
async function callApis() {
  try {
    // Пример вызова метода из TestControllersApi
    const carResponse = await testApi.getCar(1, 1);
    console.log('Car Response:', carResponse.data);

    // Пример вызова метода из WeatherForecastApi
    const weatherResponse = await weatherApi.getWeatherForecast();
    console.log('Weather Forecast:', weatherResponse.data);

    // Пример вызова метода из UserApi
    const userData = { email: 'test@example.com', password: 'password123' };
    await userApi.userRegistrationPost(userData);
    console.log('User registered successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Вызов функции
callApis();