require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Club = require("../models/Club");
const Event = require("../models/Event");

function daysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(18, 0, 0, 0);
  return date;
}

const clubs = [
  {
    name: "Code Collective",
    category: "Technology",
    description: "A friendly club for coding practice, project nights, and peer mentoring.",
    meetingDay: "Tuesday",
    location: "Innovation Lab",
    isFavourite: true
  },
  {
    name: "Global Culture Circle",
    category: "Culture",
    description: "Students share food, traditions, language practice, and international perspectives.",
    meetingDay: "Thursday",
    location: "Student Atrium",
    isFavourite: false
  },
  {
    name: "Campus Debate Forum",
    category: "Academic",
    description: "Structured debates, public speaking sessions, and critical thinking workshops.",
    meetingDay: "Monday",
    location: "Seminar Room B",
    isFavourite: true
  },
  {
    name: "Wellbeing Runners",
    category: "Sports",
    description: "Beginner-friendly running sessions focused on health, motivation, and community.",
    meetingDay: "Saturday",
    location: "Main Sports Field",
    isFavourite: false
  }
];

const events = [
  {
    title: "Hack Night: Campus Tools",
    clubName: "Code Collective",
    type: "Workshop",
    date: daysFromNow(3),
    location: "Innovation Lab",
    capacity: 40,
    rsvpCount: 18,
    description: "Build small web tools that solve everyday student problems."
  },
  {
    title: "International Food Exchange",
    clubName: "Global Culture Circle",
    type: "Social",
    date: daysFromNow(7),
    location: "Student Atrium",
    capacity: 80,
    rsvpCount: 42,
    description: "Bring a dish, learn a story, and meet students from other study programmes."
  },
  {
    title: "Debate Skills Lab",
    clubName: "Campus Debate Forum",
    type: "Academic",
    date: daysFromNow(12),
    location: "Seminar Room B",
    capacity: 35,
    rsvpCount: 20,
    description: "Practice argument structure, rebuttals, and confident presentation."
  },
  {
    title: "Sunrise Campus Run",
    clubName: "Wellbeing Runners",
    type: "Sports",
    date: daysFromNow(2),
    location: "Main Sports Field",
    capacity: 60,
    rsvpCount: 25,
    description: "A relaxed 3 km run followed by coffee near the library."
  },
  {
    title: "Past Welcome Mixer",
    clubName: "Global Culture Circle",
    type: "Social",
    date: daysFromNow(-5),
    location: "Campus Cafe",
    capacity: 50,
    rsvpCount: 34,
    description: "Archived sample event used to demonstrate date filtering."
  }
];

async function seedDatabase() {
  await connectDB();

  await Club.deleteMany();
  await Event.deleteMany();

  await Club.insertMany(clubs);
  await Event.insertMany(events);

  console.log("UniClub Hub seed data inserted");
}

seedDatabase()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
