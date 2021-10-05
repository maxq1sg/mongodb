const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");
const { getRandomName, getRandomArbitrary } = require("../db/random");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    const newReal = await db.collection("realOrders").insertMany([
      {
        price: getRandomArbitrary(1, 10),
        count: getRandomArbitrary(1, 10),
      },
      {
        price: getRandomArbitrary(1, 10),
        count: getRandomArbitrary(1, 10),
      },
      {
        price: getRandomArbitrary(1, 10),
        count: getRandomArbitrary(1, 10),
      },
    ]);
    res.send(newReal);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    const max = await db
      .collection("realOrders")
      .aggregate([{ $group: { _id: "$count", count: { $sum: 1 } } }]);
    res.json({ result: max });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
