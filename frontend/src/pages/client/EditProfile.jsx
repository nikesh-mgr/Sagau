import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClientLayout from "../../components/layouts/ClientLayout";

import useClientStore from "../../store/clientStore";

import { successToast, errorToast } from "../../utils/toast";

const EditProfile = () => {
  const navigate = useNavigate();

  const profile = useClientStore((state) => state.profile);
  const fetchProfile = useClientStore((state) => state.fetchProfile);
  const updateProfile = useClientStore((state) => state.updateProfile);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
  });

  useEffect(() => {
    const load = async () => {
      let data = profile;

      if (!data) {
        data = await fetchProfile();
      }

      setFormData({
        address: data.address || "",
        phone: data.phone || "",
      });
    };

    load();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);

      successToast("Profile updated successfully");

      navigate("/client/profile");
    } catch (error) {
      errorToast(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border rounded p-3"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded p-3"
          />

          <button className="w-full bg-blue-600 text-white rounded p-3">
            Update Profile
          </button>
        </form>
      </div>
    </ClientLayout>
  );
};

export default EditProfile;
