const redis = require("redis");
const {promisify} = require("util");

class Redis {
  constructor() {
    if (!this.connected) {
      this.connect();
    }
  }

  connect() {
    this.client = redis.createClient();

    this.client.on("error", (error) => {
      this.connected = false;
      console.log("Redis connection Error: " + error);
    });

    this.client.on("reconnecting", (e) => {
      this.connected = false;
      console.log("Redis is reconnecting: " + JSON.stringify(e));
    });

    this.client.on("connect", () => {
      this.connected = true;
      console.log("Redis connected successfully");
    });

    this.client.on("end", () => {
      this.connected = false;
      console.log("Redis connection closed");
    });

    this.get = promisify(this.client.get).bind(this.client);
    this.set = promisify(this.client.set).bind(this.client);
  }

  disconnect() {
    this.client.end(true);
    this.connected = false;
    cconsole.log("Redis disconnected");
  }
}

module.exports = new Redis();
