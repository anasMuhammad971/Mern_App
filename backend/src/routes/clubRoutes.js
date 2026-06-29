const express = require("express");
const {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
  toggleFavourite
} = require("../controllers/clubController");

const router = express.Router();

router.route("/").get(getClubs).post(createClub);
router.route("/:id").put(updateClub).delete(deleteClub);
router.patch("/:id/favourite", toggleFavourite);

module.exports = router;
