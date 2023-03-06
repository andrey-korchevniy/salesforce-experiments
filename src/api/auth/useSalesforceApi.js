import { useState, useEffect } from 'react';
import axios from 'axios';

function useSalesforceApi() {
  const [api, setApi] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Создаем экземпляр axios с настройками для взаимодействия с Salesforce API
    const api = axios.create({
      baseURL:
        'https://full-stackdeveloper-dev-ed.lightning.force.com/services/data/v50.0/',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Функция для проверки статуса авторизации
    const checkLoginStatus = async () => {
      try {
        // Запрос на получение списка аккаунтов
        const response = await api.get('/sobjects/Account');
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    // Вызываем функцию для проверки статуса авторизации при монтировании компонента
    checkLoginStatus();

    // Устанавливаем api в состояние
    setApi(api);
  }, []);

  // Функция для выполнения OAuth 2.0 на Salesforce
  const login = async () => {
    const clientId = 'your-client-id';
    const redirectUri = 'http://localhost:3000/callback';
    const scope = 'api';
    const responseType = 'token';

    // Формируем ссылку для авторизации
    const authorizationUrl = `https://your-salesforce-instance-url.com/services/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    // Перенаправляем пользователя на страницу авторизации
    window.location.href = authorizationUrl;
  };

  // Возвращаем объект с api, статусом авторизации и функцией для выполнения OAuth 2.0
  return { api, isLoggedIn, login };
}

export default useSalesforceApi;
