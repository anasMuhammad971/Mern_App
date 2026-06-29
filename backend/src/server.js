require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const port = Number(process.env.PORT) || 5050;

function startServer(preferredPort) {
  const server = app.listen(preferredPort, () => {
    console.log(`UniClub Hub API listening on port ${preferredPort}`);
  });

  // macOS often reserves port 5000. Falling back keeps the coursework demo runnable.
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && preferredPort === 5000) {
      const fallbackPort = 5050;
      console.warn(`Port 5000 is busy. Retrying API on port ${fallbackPort}.`);
      startServer(fallbackPort);
      return;
    }

    console.error("Failed to start API:", error.message);
    process.exit(1);
  });
}

connectDB()
  .then(() => {
    startServer(port);
  })
  .catch((error) => {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  });
