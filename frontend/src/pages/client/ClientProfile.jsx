import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiShield,
  FiCheckCircle,
  FiCamera,
} from "react-icons/fi";

import { motion } from "framer-motion";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import {
  createClientProfile,
  getClientProfile,
  updateClientProfile,
} from "../../api/clientApi";

import { successToast, errorToast } from "../../utils/toast";

const ClientProfile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const { register, handleSubmit, reset, watch } = useForm();

  const phoneValue = watch("phone");

  const addressValue = watch("address");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getClientProfile();

      const data = response.data;

      setProfile(data);

      reset(data);

      if (data?.profileImage) {
        setPreviewImage(`http://localhost:5000${data.profileImage}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  const submit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("phone", data.phone);

      formData.append("address", data.address);

      if (image) {
        formData.append("profileImage", image);
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (profile) {
        await updateClientProfile(formData);

        successToast("Profile updated successfully");
      } else {
        await createClientProfile(formData);

        successToast("Profile created successfully");
      }

      loadProfile();
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const completion = Math.round(
    ([
      phoneValue || profile?.phone,
      addressValue || profile?.address,
      previewImage,
    ].filter(Boolean).length /
      3) *
      100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* HEADER */}

        <motion.section
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* IMAGE */}

            <div className="relative">
              <img
                src={previewImage || "https://placehold.co/150x150"}
                className="h-24 w-24 rounded-3xl object-cover border-4 border-emerald-100"
                alt="profile"
              />

              <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white">
                <FiCamera />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile?.user?.fullName || "Client Profile"}
                </h1>

                {profile && (
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <FiCheckCircle />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-3 text-gray-500">
                Complete your profile to build trust with workers.
              </p>

              <div className="mt-5">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>

                  <b className="text-emerald-600">{completion}%</b>
                </div>

                <div className="mt-2 h-3 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FORM */}

        <motion.section className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <FiEdit3 />
            </div>

            <div>
              <h2 className="text-xl font-bold">Client Information</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Phone Number"
                placeholder="98XXXXXXXX"
                {...register("phone", {
                  required: true,
                })}
              />

              <Input
                label="Address"
                placeholder="Kathmandu"
                {...register("address", {
                  required: true,
                })}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <FiPhone className="text-emerald-600" />

                <p className="mt-2 text-sm text-gray-500">Phone</p>

                <b>{phoneValue || "Not added"}</b>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <FiMapPin className="text-blue-600" />

                <p className="mt-2 text-sm text-gray-500">Address</p>

                <b>{addressValue || "Not added"}</b>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5 flex gap-4">
              <FiShield className="text-emerald-600 text-2xl" />

              <p className="text-gray-600">
                Verified client profiles increase worker confidence.
              </p>
            </div>

            <Button
              loading={loading}
              type="submit"
              className="w-full rounded-xl py-4"
            >
              {profile ? "Update Profile" : "Create Profile"}
            </Button>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default ClientProfile;
