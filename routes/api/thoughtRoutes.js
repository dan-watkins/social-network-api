const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:id")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

module.exports = router;
