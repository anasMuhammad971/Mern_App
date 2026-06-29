const Event = require("../models/Event");

const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function requireEventFields(body) {
  const missingFields = ["title", "clubName", "type", "date", "location", "capacity"].filter(
    (field) => body[field] === undefined || body[field] === null || String(body[field]).trim() === ""
  );

  if (missingFields.length) {
    const error = new Error(`Missing required event fields: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }

  if (Number(body.capacity) < 1) {
    const error = new Error("Capacity must be at least 1");
    error.statusCode = 400;
    throw error;
  }
}

function buildEventFilter(query) {
  const filter = {};

  if (query.type && query.type !== "all") {
    filter.type = query.type;
  }

  if (query.status === "upcoming") {
    filter.date = { $gte: startOfToday() };
  }

  if (query.status === "past") {
    filter.date = { $lt: startOfToday() };
  }

  return filter;
}

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find(buildEventFilter(req.query)).sort({ date: 1, title: 1 });

  res.json({ success: true, data: events });
});

const createEvent = asyncHandler(async (req, res) => {
  requireEventFields(req.body);

  const event = await Event.create({
    title: req.body.title,
    clubName: req.body.clubName,
    type: req.body.type,
    date: req.body.date,
    location: req.body.location,
    capacity: Number(req.body.capacity),
    rsvpCount: Number(req.body.rsvpCount) || 0,
    description: req.body.description
  });

  res.status(201).json({ success: true, data: event });
});

const updateEvent = asyncHandler(async (req, res) => {
  requireEventFields(req.body);

  const existingEvent = await Event.findById(req.params.id);

  if (!existingEvent) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  if (Number(req.body.capacity) < existingEvent.rsvpCount) {
    const error = new Error("Capacity cannot be lower than the current RSVP count");
    error.statusCode = 400;
    throw error;
  }

  existingEvent.title = req.body.title;
  existingEvent.clubName = req.body.clubName;
  existingEvent.type = req.body.type;
  existingEvent.date = req.body.date;
  existingEvent.location = req.body.location;
  existingEvent.capacity = Number(req.body.capacity);
  existingEvent.description = req.body.description || "";

  await existingEvent.save();

  res.json({ success: true, data: existingEvent });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ success: true, data: { id: req.params.id } });
});

const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  if (event.rsvpCount >= event.capacity) {
    const error = new Error("Event is already at full capacity");
    error.statusCode = 400;
    throw error;
  }

  event.rsvpCount += 1;
  await event.save();

  res.json({ success: true, data: event });
});

const cancelRsvp = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  event.rsvpCount = Math.max(0, event.rsvpCount - 1);
  await event.save();

  res.json({ success: true, data: event });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRsvp
};
