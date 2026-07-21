import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, reset } = useForm();

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
      errorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Client Profile</h1>

      <div className="bg-white rounded-2xl shadow-card p-8 max-w-xl">
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
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

          <Button loading={loading} type="submit">
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClientProfile;
