const router = require("express").Router();

const db = require("../data/db");

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      res.status(200).json(post[0]);
    })
    .catch(err => console.log(err));

});

module.exports = router;