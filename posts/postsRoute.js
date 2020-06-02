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

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(comments => res.status(200).json(comments))
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
  db.findById(Number(id))
    .then(data => {
      const post = {...data[0]};
      return db.remove(Number(id))
      .then(() => res.status(201).json(post))
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  const edits = {
    ...req.body,
    updated_at: Date.now(),
  }

  db.update(Number(id), edits)
    .then(() => {
      db.findById(Number(id))
        .then(post => res.status(201).json(post))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;