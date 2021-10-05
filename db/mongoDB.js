"use strict";

const { MongoClient } = require("mongodb");

class MongoDB {
  constructor() {
    this.client = null;
    this.db = null;
    this.url = "mongodb://localhost:27017";
    this.db_name = "first";
  }

  getDB(options) {
    if (this.db) {
      return this.db;
    }

    return (this.db = this.client.db(this.db_name, options));
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: "nearest",
      });

      return this.getDB();
    } catch (err) {
      return null;
    }
  }

  async close(force) {
    try {
      await this.client.close(force);
      this.db = null;
      this.client = null;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new MongoDB();
