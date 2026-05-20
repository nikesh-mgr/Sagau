import WorkerProfile from "../models/workerSchema.js";
export const createProfile = async (req, res) => {
  try {
    const existingProfile = await WorkerProfile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const { bio, skills, location, experience, profileImage } = req.body;

    const profile = await WorkerProfile.create({
      user: req.user.id,
      bio,
      skills,
      location,
      experience,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const { bio, skills, location, experience, profileImage } = req.body;

    profile.bio = bio || profile.bio;
    profile.skills = skills || profile.skills;
    profile.location = location || profile.location;
    profile.experience = experience || profile.experience;
    profile.profileImage = profileImage || profile.profileImage;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({
      user: req.user.id,
    }).populate("user", "fullName email role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getWorkerProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile.findById(req.params.id).populate(
      "user",
      "fullName",
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
