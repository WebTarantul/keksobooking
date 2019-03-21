'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var STATUS_CODES = {
    // SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };

  var STATUS_ANSWER = {
    // SUCCESS: 'Успешно',
    BAD_REQUEST: '\"Плохой запрос.\" Сервер не понимает запрос из-за неверного синтаксиса.',
    FORBIDDEN: '\"Запрещено.\" У Вас нет прав доступа к содержимому, поэтому сервер отказывается дать надлежащий ответ.',
    NOT_FOUND: '\"Не найден.\" Сервер не может найти запрашиваемый ресурс.',
    INTERNAL_SERVER_ERROR: '\"Внутренняя ошибка сервера\".',
    SERVICE_UNAVAILABLE: '\"Сервис недоступен\". Сервер не готов обрабатывать запрос. Повторите попытку позже'
  };

  function makeXHR() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    return xhr;
  }

  /**
   * @param  {onLoadCallback} onLoad Callback function if data loded
   * @param  {onErrorCallback} onError Callback function if data not loded
   * @return {Object} XMLHttpRequest with eventlistenner
   */
  function runCallback(onLoad, onError) {
    var xhr = makeXHR();
    xhr.addEventListener('load', function () {

      for (var key in STATUS_CODES) {
        if (STATUS_CODES.hasOwnProperty(key)) {
          var element = STATUS_CODES[key];
          if (xhr.status === element) {
            var statusKey = key;
          }
        }
      }
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case STATUS_CODES[statusKey]:
          onError('Код ошибки: ' + STATUS_CODES[statusKey] + ' ' + STATUS_ANSWER[statusKey]);
          break;
        default:
          onError(xhr.status, xhr.statusText);
          break;
      }
    });
    return xhr;
  }

  /**
   * @param  {callbackOnLoad} onLoad
   * @param  {callbackOnError} onError
   */
  function loadData(onLoad, onError) {
    var xhr = runCallback(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  }

  function uploadData(data, onLoad, onError) {
    var xhr = runCallback(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);

  }

  window.backend = {
    load: loadData,
    upload: uploadData
  };
})();
