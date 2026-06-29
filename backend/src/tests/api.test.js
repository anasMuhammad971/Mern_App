const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const Club = require("../models/Club");
const Event = require("../models/Event");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Club.deleteMany();
  await Event.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

function futureDate() {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date;
}

describe("UniClub Hub API", () => {
  test("health endpoint returns API status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("creates a club", async () => {
    const response = await request(app).post("/api/clubs").send({
      name: "Code Collective",
      category: "Technology",
      description: "A student club for coding and peer learning.",
      meetingDay: "Tuesday",
      location: "Innovation Lab"
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Code Collective");
  });

  test("gets clubs and supports category filtering", async () => {
    await Club.create({
      name: "Culture Circle",
      category: "Culture",
      description: "A welcoming club for international student exchange."
    });

    const response = await request(app).get("/api/clubs?category=Culture");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].category).toBe("Culture");
  });

  test("toggles a favourite club", async () => {
    const club = await Club.create({
      name: "Debate Forum",
      category: "Academic",
      description: "A club for debating, speaking, and argument practice."
    });

    const response = await request(app).patch(`/api/clubs/${club._id}/favourite`);

    expect(response.status).toBe(200);
    expect(response.body.data.isFavourite).toBe(true);
  });

  test("creates an event", async () => {
    const response = await request(app).post("/api/events").send({
      title: "Hack Night",
      clubName: "Code Collective",
      type: "Workshop",
      date: futureDate(),
      location: "Innovation Lab",
      capacity: 40,
      description: "A practical coding workshop for campus tools."
    });

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe("Hack Night");
  });

  test("RSVP endpoint increases RSVP count", async () => {
    const event = await Event.create({
      title: "Campus Run",
      clubName: "Wellbeing Runners",
      type: "Sports",
      date: futureDate(),
      location: "Sports Field",
      capacity: 30,
      rsvpCount: 3
    });

    const response = await request(app).patch(`/api/events/${event._id}/rsvp`);

    expect(response.status).toBe(200);
    expect(response.body.data.rsvpCount).toBe(4);
  });

  test("stats endpoint returns campus engagement numbers", async () => {
    await Club.create({
      name: "Code Collective",
      category: "Technology",
      description: "A student club for coding and peer learning.",
      isFavourite: true
    });
    await Event.create({
      title: "Hack Night",
      clubName: "Code Collective",
      type: "Workshop",
      date: futureDate(),
      location: "Innovation Lab",
      capacity: 20,
      rsvpCount: 10
    });

    const response = await request(app).get("/api/stats");

    expect(response.status).toBe(200);
    expect(response.body.data.totalClubs).toBe(1);
    expect(response.body.data.totalEvents).toBe(1);
    expect(response.body.data.upcomingEvents).toBe(1);
    expect(response.body.data.totalRsvps).toBe(10);
    expect(response.body.data.favouriteClubs).toBe(1);
    expect(response.body.data.engagementPercentage).toBe(50);
  });
});
