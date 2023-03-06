function loginToSalesforce() {
  // Указываем параметры авторизации
  var client_id = 'YOUR_CLIENT_ID';
  var redirect_uri = 'YOUR_REDIRECT_URI';
  var scope = 'api';
  var response_type = 'token';
  var authorization_endpoint =
    'https://login.salesforce.com/services/oauth2/authorize';

  // Формируем URL для перехода на страницу авторизации Salesforce
  var url =
    authorization_endpoint +
    '?client_id=' +
    client_id +
    '&redirect_uri=' +
    redirect_uri +
    '&scope=' +
    scope +
    '&response_type=' +
    response_type;

  // Открываем новое окно для авторизации в Salesforce
  var authWindow = window.open(url);

  // Ожидаем завершения авторизации
  var checkAuth = setInterval(function () {
    try {
      // Проверяем, успешно ли была завершена авторизация
      if (authWindow.location.href.indexOf(redirect_uri) != -1) {
        clearInterval(checkAuth);
        authWindow.close();

        // Извлекаем токен доступа из URL-адреса ответа
        var access_token = getAccessTokenFromUrl(authWindow.location.href);

        // Используем токен доступа для доступа к API Salesforce
        useSalesforceApi(access_token);
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000);
}

function getAccessTokenFromUrl(url) {
  // Извлекаем токен доступа из URL-адреса ответа
  var access_token = url.match(/access_token=([^&]*)/)[1];
  return access_token;
}

function useSalesforceApi(access_token) {
  // Выполняем запрос к API Salesforce с использованием токена доступа
  var endpoint = 'https://yourInstance.salesforce.com/services/data/vXX.X/';
  var url = endpoint + 'query/?q=SELECT+Id,+Name,+Email+FROM+Contact';
  var headers = {
    Authorization: 'Bearer ' + access_token,
    'Content-Type': 'application/json',
  };
  axios
    .get(url, { headers: headers })
    .then(function (response) {
      var data = response.data;
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
