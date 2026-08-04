import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FiArrowRight, FiBriefcase } from "react-icons/fi";

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

  const [profileImage, setProfileImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      availability: "Available",
    },
  });

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // =====================================================
  // Image Handling
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      errorToast("Only JPG, PNG and WEBP images are allowed");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      errorToast("Image size must be less than 5MB");

      return;
    }

    setProfileImage(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  // =====================================================
  // Skills
  // =====================================================

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) {
      return;
    }

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

  // =====================================================
  // Portfolio
  // =====================================================

  const addPortfolio = () => {
    const value = portfolioInput.trim();

    if (!value) {
      return;
    }

    if (!/^https?:\/\/.+/.test(value)) {
      errorToast("Please enter valid URL");

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

  // =====================================================
  // Submit
  // =====================================================

  const submit = async (data) => {
    if (skills.length === 0) {
      errorToast("Please add at least one skill");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("experience", data.experience);

      formData.append("hourlyRate", data.hourlyRate);

      formData.append("location", data.location);

      formData.append("phone", data.phone);

      formData.append("availability", data.availability);

      formData.append("bio", data.bio);

      skills.forEach((skill) => {
        formData.append("skills", skill);
      });

      portfolio.forEach((item) => {
        formData.append("portfolio", item);
      });

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      console.log("========== FORM DATA ==========");

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      }

      await createWorkerProfile(formData);

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
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-600 flex items-center justify-center text-white text-4xl shadow-lg">
            <FiBriefcase />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Create Worker Profile
          </h1>

          <p className="mt-3 text-slate-500">
            Complete your professional profile so clients can discover you.
          </p>
        </div>

        <Card className="rounded-3xl shadow-xl border-0">
          <form onSubmit={handleSubmit(submit)} className="space-y-8 p-8">
            <div className="text-center">
              <img
                src={previewImage || "https://placehold.co/180x180?text=Photo"}
                className="h-44 w-44 rounded-full object-cover mx-auto border-4 border-emerald-500"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-5"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Experience (Years)"
                type="number"
                {...register("experience", {
                  required: "Experience required",
                })}
                error={errors.experience?.message}
              />

              <Input
                label="Hourly Rate"
                type="number"
                {...register("hourlyRate", {
                  required: "Hourly rate required",
                })}
                error={errors.hourlyRate?.message}
              />

              <Input
                label="Phone"
                {...register("phone", {
                  required: "Phone required",
                })}
                error={errors.phone?.message}
              />

              <Input
                label="Location"
                {...register("location", {
                  required: "Location required",
                })}
                error={errors.location?.message}
              />
            </div>

            <textarea
              rows="5"
              placeholder="Professional bio"
              className="w-full border rounded-xl p-4"
              {...register("bio", {
                required: "Bio required",
              })}
            />

            <div>
              <label className="font-semibold">Skills</label>

              <div className="flex gap-3 mt-3">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKey}
                  className="flex-1 border rounded-xl p-3"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-emerald-600 text-white px-5 rounded-xl"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 px-4 py-2 rounded-full"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Create Worker Profile
              {!loading && <FiArrowRight />}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateWorkerProfile;
