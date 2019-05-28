const router = require("express").Router();

const Posts = require("../data/db.js");

// POST /api/posts

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
  Posts.insert(post)
    .then(newPost => res.status(201).json(post))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

// POST /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comment = req.body;
  comment.post_id = postId;
  Posts.findById(postId)
    .then(post => {
      if (post && post.length) {
        if (!comment.text) {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        } else {
          Posts.insertComment(comment)
            .then(newComment => res.status(201).json(newComment))
            .catch(err =>
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database"
              })
            );
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// GET /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

// GET  /api/posts/:id
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// GET /api/posts/:id/comments

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;
