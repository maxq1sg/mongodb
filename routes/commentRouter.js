const { MongoClient, ObjectId } = require("mongodb");
const getConnection = require("../db/getConnection");
const { getRandomArbitrary } = require("../db/random");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const db = getConnection(req);
    const comment = await db.collection("products").findOneAndUpdate(
      {
        _id: ObjectId("61594b2ee5e43485047bdf1e"),
      },
      {
        $push: {
          comments: {
            $each: [
              { text: `ya eblan: ${getRandomArbitrary(1, 1000)} times!` },
              { text: `ya ne eblan: ${getRandomArbitrary(1, 1000)} times!` },
            ],
          },
        },
      }
    );
    res.send(comment);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
