import Job from "../models/jobSchema.js";

const cleanupExpiredJobs = async () => {
  try {
    const result = await Job.updateMany(
      {
        deadline: {
          $lt: new Date(),
        },

        status: "OPEN",
      },

      {
        status: "EXPIRED",
      },
    );

    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} jobs expired`);
    }
  } catch (error) {
    console.log("Job cleanup error:", error.message);
  }
};

export default cleanupExpiredJobs;
