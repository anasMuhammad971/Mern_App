const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters"],
      maxlength: [100, "Event title must be less than 100 characters"]
    },
    clubName: {
      type: String,
      required: [true, "Club name is required"],
      trim: true,
      maxlength: [80, "Club name must be less than 80 characters"]
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
      maxlength: [40, "Event type must be less than 40 characters"]
    },
    date: {
      type: Date,
      required: [true, "Event date is required"]
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      maxlength: [100, "Location must be less than 100 characters"]
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: [1, "Capacity must be at least 1"]
    },
    rsvpCount: {
      type: Number,
      default: 0,
      min: [0, "RSVP count cannot be negative"]
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [700, "Description must be less than 700 characters"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
