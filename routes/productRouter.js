const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");
const { getRandomArbitrary } = require("../db/random");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    // const newProduct = await db
    //   .collection("products")
    //   .insertOne({ name: "maxim", count: getRandomArbitrary(10,567) });
    const df = await db
      .collection("products")
      .update({}, { $set: { comments: [] } }, { upsert: false, multi: true });
    res.send(df);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
