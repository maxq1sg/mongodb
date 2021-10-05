const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");
const redis = require("redis");
const redisClient = require("./../db/redis");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    // const newUser = await db
    //   .collection("users")
    //   .insertOne({ name: getRandomName(), age: getRandomArbitrary(10, 89) });

    // for (let index = 0; index < 10; index++) {
    //   console.log(randomCountry());
    // }
    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const db = getConnection(req);
    const data = await redisClient.get("users");
    if (data) {
      return res.json(JSON.parse(data));
    }
    const user = await db
      .collection("users")
      .aggregate([
        // { $match: { _id: ObjectId(_id) } },
        {
          $lookup: {
            from: "orders",
            localField: "orders",
            pipeline: [{ $project: { _id: 0 } }],
            foreignField: "_id",
            as: "orders",
          },
        },
      ])
      .toArray();
    await redisClient.set("users", JSON.stringify(user));
    await new Promise((res) =>
      setTimeout(() => {
        res();
      }, 1000)
    );
    res.json(user);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/agg", async (req, res) => {
  try {
    const db = getConnection(req);
    const user = await db
      .collection("users")
      .aggregate([
        { $match: { country: "Belarus" } },
        { $group: { _id: "$country", count: { $avg: "$age" } } },
      ])
      .toArray();
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
