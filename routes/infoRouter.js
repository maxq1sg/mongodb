const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    const newInfo = await db
      .collection("")
      .insertOne({ name: "maxim", age: 45 });
    console.log(newUser);
    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
