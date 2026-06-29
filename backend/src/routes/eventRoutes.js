const express = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRsvp
} = require("../controllers/eventController");

const router = express.Router();

router.route("/").get(getEvents).post(createEvent);
router.route("/:id").put(updateEvent).delete(deleteEvent);
router.patch("/:id/rsvp", rsvpEvent);
router.patch("/:id/cancel-rsvp", cancelRsvp);

module.exports = router;
