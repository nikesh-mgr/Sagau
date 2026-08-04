import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    // User Reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Client Information
    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
