import cron from "node-cron";

import cleanupExpiredJobs from "../services/jobCleanup.js";

const startJobScheduler = () => {
  // runs every hour

  cron.schedule("0 * * * *", async () => {
    console.log("Checking expired jobs...");

    await cleanupExpiredJobs();
  });
};

export default startJobScheduler;
