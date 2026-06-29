const Club = require("../models/Club");
const Event = require("../models/Event");

const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

const getStats = asyncHandler(async (req, res) => {
  const [totalClubs, favouriteClubs, totalEvents, upcomingEvents, rsvpAggregation, capacityAggregation] =
    await Promise.all([
      Club.countDocuments(),
      Club.countDocuments({ isFavourite: true }),
      Event.countDocuments(),
      Event.countDocuments({ date: { $gte: startOfToday() } }),
      Event.aggregate([{ $group: { _id: null, total: { $sum: "$rsvpCount" } } }]),
      Event.aggregate([{ $group: { _id: null, total: { $sum: "$capacity" } } }])
    ]);

  const totalRsvps = rsvpAggregation[0]?.total || 0;
  const totalCapacity = capacityAggregation[0]?.total || 0;
  const engagementPercentage =
    totalCapacity === 0 ? 0 : Math.round((totalRsvps / totalCapacity) * 100);

  res.json({
    success: true,
    data: {
      totalClubs,
      totalEvents,
      upcomingEvents,
      totalRsvps,
      favouriteClubs,
      engagementPercentage,
      summary:
        totalRsvps === 0
          ? "Start RSVPing to events to build campus engagement."
          : `${totalRsvps} RSVPs across ${totalEvents} campus events.`
    }
  });
});

module.exports = {
  getStats
};
