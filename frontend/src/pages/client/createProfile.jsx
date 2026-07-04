import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientLayout from "../../components/layouts/ClientLayout";
import useClientStore from "../../store/clientStore";

const CreateProfile = () => {
  const navigate = useNavigate();

  const createProfile = useClientStore((state) => state.createProfile);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob({
        ...formData,
        budget: Number(formData.budget),
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      successToast("Job created successfully");

      navigate("/client/");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          errorToast(err.msg);
        });
      } else {
        errorToast(error.response?.data?.message || "Failed to create job");
      }
    }
  };

  return (
    <ClientLayout>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-3xl font-bold mb-6">Create Profile</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Create Profile
          </button>
        </form>
      </div>
    </ClientLayout>
  );
};

export default CreateProfile;
