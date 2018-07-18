import GameService from "./gameservice.js";

export default class GameClient {
    constructor() {
        this.service = new GameService();
    }

    get authenticated() {
        return this.service.authenticated;
    }
    
    get connected() {
        return this.service.connected;
    }

    logout() {
        this.service.logout();
    }

    async loginAsync(username, password) {
        if (await this.service.loginAsync(username, password)) {
            console.log("login success!");
            if (!this.service.connected) {
                if (await this.service.connectAsync()) {
                    console.log("connection established!");
                    this.service.beginSession();                    
                    return true;
                } else {
                    console.error("connection could not be established!");
                    return false;
                }
            }
        } else {
            console.error("invalid username or password!");
            return false;
        }
        return false;
    }

    async loginWithTokenAsync(token) {
        if (!token || token == null) {
            return false;
          }        
          this.service.token = token;
          if (!this.service.connected) {
            if (await this.service.connectAsync()) {
              console.log("connection established!");
              this.service.beginSession();
              return true;
            } else {
              console.error("connection could not be established!");
              return false;
            }
          } else {
            console.log("connection established!");
            this.service.beginSession();
          }        
          return false;        
    }
}