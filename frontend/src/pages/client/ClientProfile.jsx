import { useEffect } from "react";

import Card from "../../components/ui/Card";

import PageHeader from "../../components/common/PageHeader";

import ClientProfileForm from "../../components/profile/ClientProfileForm";

import useProfileStore from "../../store/profileStore";

import { showSuccess, showError } from "../../utils/toast";

import { getErrorMessage } from "../../utils/getErrorMessage";

const ClientProfile = () => {
  const {
    profile,
    loading,
    getClientProfile,
    createClientProfile,
    updateClientProfile,
  } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getClientProfile();
      } catch {
        // no profile yet
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (profile) {
        await updateClientProfile(data);

        showSuccess("Profile updated successfully");
      } else {
        await createClientProfile(data);

        showSuccess("Profile created successfully");
      }
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Client Profile"
        subtitle="Manage your profile information"
      />

      <Card>
        <div className="p-6">
          <ClientProfileForm
            defaultValues={{
              address: profile?.address || "",
              phone: profile?.phone || "",
            }}
            onSubmit={onSubmit}
            loading={loading}
          />
        </div>
      </Card>
    </div>
  );
};

export default ClientProfile;
