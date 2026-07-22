import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiShield,
  FiCheckCircle,
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

  const { register, handleSubmit, reset, watch } = useForm();

  const phoneValue = watch("phone");

  const addressValue = watch("address");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getClientProfile();

      setProfile(data.data);

      reset(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (data) => {
    try {
      setLoading(true);

      if (profile) {
        await updateClientProfile(data);

        successToast("Profile updated successfully");
      } else {
        await createClientProfile(data);

        successToast("Profile created successfully");
      }

      loadProfile();
    } catch (error) {
      console.log(error);

      errorToast(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const completion = Math.round(
    ([phoneValue || profile?.phone, addressValue || profile?.address].filter(
      Boolean,
    ).length /
      2) *
      100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* PROFILE HEADER */}

        <motion.section
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm">
              <FiUser size={38} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Client Profile
                </h1>

                {profile && (
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <FiCheckCircle size={13} />
                    Verified Profile
                  </span>
                )}
              </div>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
                A complete profile helps skilled workers trust your project and
                respond faster.
              </p>

              {/* COMPLETION */}

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">
                    Profile Completion
                  </span>

                  <span className="font-bold text-emerald-600">
                    {completion}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FORM CARD */}

        <motion.section
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <FiEdit3 />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Business Information
              </h2>

              <p className="text-sm text-gray-500">
                Help workers understand who they are working with.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            </div>{" "}
            {/* PROFILE PREVIEW */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-emerald-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <FiPhone />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {phoneValue || profile?.phone || "Not added"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-blue-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {addressValue || profile?.address || "Not added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* TRUST INFORMATION */}
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <FiShield size={22} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Build trust with skilled workers
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  Verified client information increases confidence and improves
                  the chance of receiving quality applications.
                </p>
              </div>
            </div>
            {/* SUBMIT ACTION */}
            <Button
              loading={loading}
              type="submit"
              className="w-full rounded-xl py-4 font-semibold transition hover:scale-[1.02]"
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
