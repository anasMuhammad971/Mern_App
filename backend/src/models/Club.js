const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Club name is required"],
      trim: true,
      minlength: [2, "Club name must be at least 2 characters"],
      maxlength: [80, "Club name must be less than 80 characters"]
    },
    category: {
      type: String,
      required: [true, "Club category is required"],
      trim: true,
      maxlength: [40, "Category must be less than 40 characters"]
    },
    description: {
      type: String,
      required: [true, "Club description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [700, "Description must be less than 700 characters"]
    },
    meetingDay: {
      type: String,
      trim: true,
      default: "Flexible"
    },
    location: {
      type: String,
      trim: true,
      default: "Campus"
    },
    isFavourite: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
