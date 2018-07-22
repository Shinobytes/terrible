import Requests from './requests.js';

export default class GameService {
    constructor(client) {
        // ready states:
        //  0: CONNECTING
        //  1: OPEN
        //  2: CLOSING
        //  3: CLOSED
        this.client = client;
        this.server = "83.254.37.212:49672";
        this.protocol = "http"
        this.token = "";
        this.connectionSuccess = null;
        this.connectionFailed = null;
        this.connectedToServer = false;
        this.connectionPromise = new Promise(
            resolve => (this.connectionSuccess = resolve),
            reject => (this.connectionFailed = reject)
        );
    }

    connectAsync() {
        if (this.connectedToServer) {
            return;
        }

        this.socket = new WebSocket(
            // `ws://${window.location.hostname}:${window.location.port}/ws`
            `ws://${this.server}/ws`
        );
        this.socket.addEventListener("open", () => this.onConnectionOpen());
        this.socket.addEventListener("close", () => this.onConnectionClose());
        this.socket.addEventListener("message", msg => this.onMessageReceived(msg));
        this.socket.addEventListener("error", () => this.onError());

        return this.connectionPromise;
    }

    async loginAsync(username, password) {
        this.token = await Requests.postAsync(this.protocol + "://" + this.server + "/api/Auth/login", {
            username: username,
            password: password
        });
        return this.authenticated;
    }

    logout() {
        Requests.getAsync(this.protocol + "://" + this.server + "/api/auth/logout");
        this.socket.close(1000, "logout");
        this.connectedToServer = false;
        this.token = null;
    }

    beginSession() {
        this.socket.send(this.token);
    }

    send(data) {
        this.socket.send(data);
    }

    onMessageReceived(msg) {
        const payload = msg.data;
        try {
            const packet = JSON.parse(payload);
            this.client.handlePacket(packet.header, packet.data);
        } catch (err) {
            console.error("Error parsing data received from server!!! See: " + err + ", " + payload);
        }
    }

    onConnectionOpen() {
        console.log("connection open");
        this.connectedToServer = true;
        this.connectionSuccess(true);
    }

    onConnectionClose() {
        console.log("connection closed");
        this.connectedToServer = false;
    }

    onError() {
        console.error("ERRRORROROROROOR!");
        this.connectedToServer = false;
        this.connectionSuccess(false);
    }

    get authenticated() {
        return this.token && this.token.length > 0;
    }

    get connected() {
        return this.connectedToServer;
    }
}