const Club = require("../models/Club");

const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

function requireClubFields(body) {
  const missingFields = ["name", "category", "description"].filter(
    (field) => !body[field] || !String(body[field]).trim()
  );

  if (missingFields.length) {
    const error = new Error(`Missing required club fields: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }
}

function buildClubFilter(query) {
  if (!query.category || query.category === "all") {
    return {};
  }

  return { category: query.category };
}

const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find(buildClubFilter(req.query)).sort({
    isFavourite: -1,
    name: 1
  });

  res.json({ success: true, data: clubs });
});

const createClub = asyncHandler(async (req, res) => {
  requireClubFields(req.body);

  const club = await Club.create({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    meetingDay: req.body.meetingDay,
    location: req.body.location,
    isFavourite: Boolean(req.body.isFavourite)
  });

  res.status(201).json({ success: true, data: club });
});

const updateClub = asyncHandler(async (req, res) => {
  requireClubFields(req.body);

  const club = await Club.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      meetingDay: req.body.meetingDay,
      location: req.body.location,
      isFavourite: Boolean(req.body.isFavourite)
    },
    { new: true, runValidators: true }
  );

  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ success: true, data: club });
});

const deleteClub = asyncHandler(async (req, res) => {
  const club = await Club.findByIdAndDelete(req.params.id);

  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ success: true, data: { id: req.params.id } });
});

const toggleFavourite = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id);

  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }

  club.isFavourite = !club.isFavourite;
  await club.save();

  res.json({ success: true, data: club });
});

module.exports = {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
  toggleFavourite
};
