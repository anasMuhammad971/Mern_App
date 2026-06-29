const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "UniClub Hub API is running"
  });
});

// Routes are grouped by campus resource to keep the API easy to read and test.
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/stats", statsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
