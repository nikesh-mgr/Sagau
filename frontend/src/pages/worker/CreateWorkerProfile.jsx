import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiDollarSign,
  FiClock,
  FiPlus,
  FiX,
  FiGlobe,
  FiUser,
} from "react-icons/fi";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createWorkerProfile } from "../../api/workerApi";

import { successToast, errorToast } from "../../utils/toast";

const CreateWorkerProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState([]);

  const [portfolioInput, setPortfolioInput] = useState("");

  const [portfolio, setPortfolio] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      availability: "Available",
    },
  });

  /* ===========================
      Skill Handling
  =========================== */

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (skills.includes(value)) {
      errorToast("Skill already added");
      return;
    }

    setSkills([...skills, value]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  /* ===========================
      Portfolio Handling
  =========================== */

  const addPortfolio = () => {
    const value = portfolioInput.trim();

    if (!value) return;

    if (!/^https?:\/\/.+/.test(value)) {
      errorToast("Please enter a valid URL");
      return;
    }

    if (portfolio.includes(value)) {
      errorToast("Portfolio already added");
      return;
    }

    setPortfolio([...portfolio, value]);
    setPortfolioInput("");
  };

  const removePortfolio = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  /* ===========================
      Submit
  =========================== */

  const submit = async (data) => {
    if (skills.length === 0) {
      errorToast("Please add at least one skill");
      return;
    }

    try {
      setLoading(true);

      await createWorkerProfile({
        ...data,

        experience: Number(data.experience),

        hourlyRate: Number(data.hourlyRate),

        skills,

        portfolio,
      });

      successToast("Worker profile created successfully");

      navigate("/worker/dashboard");
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to create worker profile",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-700 text-white shadow-2xl mb-8"
        >
          <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">
                  <FiBriefcase className="text-4xl" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold">Create Worker Profile</h1>

                  <p className="text-emerald-100 mt-2">
                    Complete your professional profile and start getting hired.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur text-center">
                <h3 className="text-3xl font-bold">{skills.length}</h3>

                <p className="text-sm text-emerald-100">Skills</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur text-center">
                <h3 className="text-3xl font-bold">{portfolio.length}</h3>

                <p className="text-sm text-emerald-100">Portfolio</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur text-center">
                <h3 className="text-3xl font-bold">
                  {loading ? "..." : "Ready"}
                </h3>

                <p className="text-sm text-emerald-100">Status</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit(submit)} className="space-y-10">
            {/* Professional Information */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FiUser className="text-blue-600 text-xl" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Professional Information
                  </h2>

                  <p className="text-slate-500">
                    Tell clients about your experience.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Experience (Years)"
                  type="number"
                  placeholder="2"
                  icon={<FiClock />}
                  {...register("experience", {
                    required: "Experience required",
                    min: {
                      value: 0,
                      message: "Invalid experience",
                    },
                  })}
                  error={errors.experience?.message}
                />

                <Input
                  label="Hourly Rate (NPR)"
                  type="number"
                  placeholder="500"
                  icon={<FiDollarSign />}
                  {...register("hourlyRate", {
                    required: "Hourly rate required",
                    min: {
                      value: 1,
                      message: "Invalid rate",
                    },
                  })}
                  error={errors.hourlyRate?.message}
                />

                <Input
                  label="Location"
                  placeholder="Kathmandu"
                  icon={<FiMapPin />}
                  {...register("location", {
                    required: "Location required",
                  })}
                  error={errors.location?.message}
                />

                <Input
                  label="Phone Number"
                  placeholder="98XXXXXXXX"
                  icon={<FiPhone />}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  error={errors.phone?.message}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Availability
                  </label>

                  <select
                    {...register("availability")}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option>Available</option>
                    <option>Busy</option>
                    <option>Not Available</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-5">
                Professional Bio
              </h2>

              <textarea
                rows={6}
                placeholder="Tell clients about yourself, your experience, strengths and what makes you the right person for the job..."
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                {...register("bio", {
                  required: "Bio is required",
                })}
              />

              {errors.bio && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.bio.message}
                </p>
              )}
            </div>{" "}
            {/* ===========================
              Skills Section
          =========================== */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Skills</h2>

                  <p className="text-slate-500">
                    Add the skills you are confident in.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-semibold">
                  {skills.length} Skills
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKey}
                  placeholder="Example: React, Plumbing, Electrician..."
                  className="
                  flex-1
                  rounded-2xl
                  border
                  border-slate-300
                  px-5
                  py-3
                  focus:ring-2
                  focus:ring-emerald-500
                  outline-none
                "
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="
                  h-12
                  px-6
                  rounded-2xl
                  bg-emerald-600
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-emerald-700
                  transition
                "
                >
                  <FiPlus />
                  Add Skill
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {skills.length === 0 ? (
                  <div className="text-slate-400">No skills added yet.</div>
                ) : (
                  skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="
                      bg-gradient-to-r
                      from-emerald-500
                      to-blue-600
                      text-white
                      px-5
                      py-3
                      rounded-full
                      flex
                      items-center
                      gap-3
                      shadow-md
                    "
                    >
                      <span>{skill}</span>

                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="
                        h-6
                        w-6
                        rounded-full
                        bg-white/20
                        hover:bg-red-500
                        flex
                        items-center
                        justify-center
                        transition
                      "
                      >
                        <FiX />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
            {/* ===========================
              Portfolio Section
          =========================== */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Portfolio
                  </h2>

                  <p className="text-slate-500">
                    Add GitHub, Behance, personal website or previous work.
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
                  {portfolio.length} Links
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  value={portfolioInput}
                  onChange={(e) => setPortfolioInput(e.target.value)}
                  placeholder="https://github.com/username"
                  className="
                  flex-1
                  rounded-2xl
                  border
                  border-slate-300
                  px-5
                  py-3
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
                />

                <button
                  type="button"
                  onClick={addPortfolio}
                  className="
                  h-12
                  px-6
                  rounded-2xl
                  bg-slate-900
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-slate-800
                  transition
                "
                >
                  <FiGlobe />
                  Add Link
                </button>
              </div>

              <div className="space-y-4 mt-6">
                {portfolio.length === 0 ? (
                  <div className="text-slate-400">
                    No portfolio links added.
                  </div>
                ) : (
                  portfolio.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-2xl
                      p-5
                      flex
                      justify-between
                      items-center
                      gap-4
                    "
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className="
                        h-12
                        w-12
                        rounded-xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                      "
                        >
                          <FiGlobe className="text-blue-600 text-xl" />
                        </div>

                        <a
                          href={item}
                          target="_blank"
                          rel="noreferrer"
                          className="
                          truncate
                          text-blue-600
                          hover:underline
                          font-medium
                        "
                        >
                          {item}
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => removePortfolio(index)}
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-100
                        text-red-600
                        hover:bg-red-500
                        hover:text-white
                        transition
                      "
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>{" "}
            {/* ===========================
              Ready Card
          =========================== */}
            <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-700 p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    You're Almost Ready 🚀
                  </h2>

                  <p className="text-emerald-100 leading-7">
                    A complete profile helps clients trust you and increases
                    your chances of getting hired.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        ✓
                      </div>

                      <span>Add all your professional skills</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        ✓
                      </div>

                      <span>Write a detailed bio</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        ✓
                      </div>

                      <span>Add portfolio links to build trust</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        ✓
                      </div>

                      <span>Keep your availability updated</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Profile Summary</h3>

                  <div className="space-y-5">
                    <div className="flex justify-between">
                      <span className="text-emerald-100">Skills</span>

                      <span className="font-bold">{skills.length}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-emerald-100">Portfolio Links</span>

                      <span className="font-bold">{portfolio.length}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-emerald-100">Availability</span>

                      <span className="font-bold">Available</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="
                    mt-10
                    w-full
                    h-14
                    rounded-2xl
                    bg-white
                    text-emerald-700
                    hover:bg-slate-100
                    font-bold
                    text-lg
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                  >
                    {loading ? "Creating Profile..." : "Create Worker Profile"}

                    {!loading && <FiArrowRight size={20} />}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateWorkerProfile;
