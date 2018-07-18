import GameService from "./gameservice.js";
import PlayerInfo from "../models/playerinfo.js";

export default class GameClient {
    constructor(game) {
        this.game = game;
        this.service = new GameService(this);
    }

    get authenticated() {
        return this.service.authenticated;
    }

    get connected() {
        return this.service.connected;
    }


    handlePacket(type, data) {
        
        const mapPlayerInfo = (playerData) => new PlayerInfo(
            playerData.Username,
            playerData.Level,
            playerData.Experience,
            playerData.Position.X,
            playerData.Position.Y
        );

        switch (type) {
            case "PlayerInfo":
                this.game.playerDataReceived(mapPlayerInfo(data));
                break;

            case "PlayerCollectionUpdate":
                data.Added.forEach(x => this.game.playerAdded(mapPlayerInfo(x)));
                data.Updated.forEach(x => this.game.playerUpdated(mapPlayerInfo(x)));
                data.Removed.forEach(x => this.game.playerRemoved(x));
                break;
            default:
                console.warn("Unhandled packet type: " + type + ", with data: " + data);
                break;
        }
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