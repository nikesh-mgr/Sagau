import { useState } from "react";

const JobForm = ({
  initialData = {},
  onSubmit,
  loading,
  buttonText = "Create Job",
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    budget: initialData.budget || "",
    skillsRequired: initialData.skillsRequired
      ? initialData.skillsRequired.join(", ")
      : "",
    location: initialData.location || "",
    deadline: initialData.deadline ? initialData.deadline.substring(0, 10) : "",
    category: initialData.category || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";

    if (formData.description.length < 30)
      newErrors.description = "Description must be at least 30 characters";

    if (!formData.budget || Number(formData.budget) <= 0)
      newErrors.budget = "Budget must be greater than 0";

    if (!formData.skillsRequired.trim())
      newErrors.skillsRequired = "Enter at least one skill";

    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!formData.deadline) newErrors.deadline = "Deadline is required";

    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...formData,
      budget: Number(formData.budget),
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-8 space-y-5"
    >
      <h2 className="text-3xl font-bold">{buttonText}</h2>

      <div>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <textarea
          rows="6"
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.budget && (
          <p className="text-red-500 text-sm">{errors.budget}</p>
        )}
      </div>

      <div>
        <input
          name="skillsRequired"
          placeholder="React, Node, MongoDB"
          value={formData.skillsRequired}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.skillsRequired && (
          <p className="text-red-500 text-sm">{errors.skillsRequired}</p>
        )}
      </div>

      <div>
        <input
          name="location"
          placeholder="Kathmandu"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.deadline && (
          <p className="text-red-500 text-sm">{errors.deadline}</p>
        )}
      </div>

      <div>
        <input
          name="category"
          placeholder="Web Development"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Please wait..." : buttonText}
      </button>
    </form>
  );
};

export default JobForm;
