export default class Requests {
    static postAsync(url, data) {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhttp.responseText);
          } else {
            reject();
          }
        };
        xhttp.onerror = function () {
          reject();
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(data));
      });
    }
  
    static getBinaryAsync(url) {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.responseType = 'arraybuffer';
        xhttp.onload = function () {
          if (this.status >= 200 && this.status < 300) {
              console.log(xhttp.responseType);
              resolve(new Uint8Array(xhttp.response));
          } else {
            reject();
          }
        };
        xhttp.onerror = function () {
          reject();
        };
        xhttp.open("GET", url, true);
        xhttp.send();
      });
    }
  
    static getAsync(url) {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhttp.responseText);
          } else {
            reject();
          }
        };
        xhttp.onerror = function () {
          reject();
        };
        xhttp.open("GET", url, true);
        xhttp.send();
      });
    }
  }
  