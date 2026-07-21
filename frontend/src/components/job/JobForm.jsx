import { useForm } from "react-hook-form";

const JobForm = ({
  defaultValues = {},
  onSubmit,
  loading = false,
  buttonText = "Save Job",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      budget: defaultValues.budget || "",
      category: defaultValues.category || "",
      location: defaultValues.location || "",
      deadline: defaultValues.deadline
        ? defaultValues.deadline.split("T")[0]
        : "",
      skillsRequired: defaultValues.skillsRequired
        ? defaultValues.skillsRequired.join(", ")
        : "",
    },
  });

  const submit = (data) => {
    const payload = {
      title: data.title.trim(),
      description: data.description.trim(),
      budget: Number(data.budget),
      category: data.category.trim(),
      location: data.location.trim(),
      deadline: data.deadline,
      skillsRequired: data.skillsRequired
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Job Title</label>

        <input
          type="text"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("title", {
            required: "Job title is required",
          })}
        />

        <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows="6"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("description", {
            required: "Description is required",
          })}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">Budget (NPR)</label>

          <input
            type="number"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("budget", {
              required: "Budget is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">{errors.budget?.message}</p>
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>

          <input
            type="text"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("category", {
              required: "Category is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.category?.message}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">Location</label>

          <input
            type="text"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("location", {
              required: "Location is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.location?.message}
          </p>
        </div>

        <div>
          <label className="block mb-2 font-medium">Deadline</label>

          <input
            type="date"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("deadline", {
              required: "Deadline is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.deadline?.message}
          </p>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Required Skills</label>

        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("skillsRequired", {
            required: "Skills are required",
          })}
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.skillsRequired?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {loading ? "Please wait..." : buttonText}
      </button>
    </form>
  );
};

export default JobForm;
