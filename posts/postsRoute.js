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

router.post("/", (req, res) => {
  const post = {
    ...req.body,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  db.insert(post)
    .then(post => res.status(201).json(post));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(Number(id))
    .then(post => {
      console.log(post);
      return res.status(201).json(post);
    })
    .catch(err => console.log(err));
});

module.exports = router;