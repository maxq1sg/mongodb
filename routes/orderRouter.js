const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");
const { getRandomArbitrary } = require("../db/random");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const db = getConnection(req);

    const newOrder = await db.collection("orders").insertOne({
      title: `loh-${getRandomArbitrary(1, 200)}`,
      money: `${getRandomArbitrary(100, 50000)} $`,
    });
    console.log(newOrder);

    const user = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $push: { orders: newOrder.insertedId } }
      );
    console.log(user);
    if (!user) {
      throw new Error("no such user");
    }

    res.send(user.name);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
