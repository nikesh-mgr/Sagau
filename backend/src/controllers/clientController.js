import Client from "../models/clientSchema.js";

export const createClientProfile = async (req, res) => {
  try {
    const exists = await Client.findOne({ user: req.user.id });

    if (exists) {
      return res.status(400).json({ message: "Already exists" });
    }

    const profile = await Client.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClientProfile = async (req, res) => {
  const profile = await Client.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ message: "Not found" });
  }

  Object.assign(profile, req.body);

  await profile.save();

  res.json(profile);
};
export const getMyClientProfile = async (req, res) => {
  const profile = await Client.findOne({ user: req.user.id }).populate(
    "user",
    "fullName email roles",
  );
  res.json(profile);
};
export const getClientProfile = async (req, res) => {
  try {
    const profile = await Client.findById(req.params.id).populate(
      "user",
      "fullName email roles",
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
