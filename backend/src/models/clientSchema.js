import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    address: String,
    phone: String,
  },
  { timestamps: true },
);

export default mongoose.model("ClientProfile", clientSchema);
