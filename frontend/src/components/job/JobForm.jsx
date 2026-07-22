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

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-7">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Job Title
        </label>

        <input
          type="text"
          placeholder="Example: Build a restaurant website"
          className={inputStyle}
          {...register("title", {
            required: "Job title is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Job Description
        </label>

        <textarea
          rows="6"
          placeholder="Explain your project requirements, expectations and timeline..."
          className={inputStyle}
          {...register("description", {
            required: "Description is required",
          })}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Budget (NPR)
          </label>

          <input
            type="number"
            placeholder="5000"
            className={inputStyle}
            {...register("budget", {
              required: "Budget is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">{errors.budget?.message}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Category
          </label>

          <input
            type="text"
            placeholder="Web Development"
            className={inputStyle}
            {...register("category", {
              required: "Category is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.category?.message}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Location
          </label>

          <input
            type="text"
            placeholder="Kathmandu"
            className={inputStyle}
            {...register("location", {
              required: "Location is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.location?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Deadline
          </label>

          <input
            type="date"
            className={inputStyle}
            {...register("deadline", {
              required: "Deadline is required",
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.deadline?.message}
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Required Skills
        </label>

        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          className={inputStyle}
          {...register("skillsRequired", {
            required: "Skills are required",
          })}
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate skills using commas.
        </p>

        <p className="mt-1 text-sm text-red-500">
          {errors.skillsRequired?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving job..." : buttonText}
      </button>
    </form>
  );
};

export default JobForm;
