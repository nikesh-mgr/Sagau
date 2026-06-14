export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.errors?.[0]?.msg ||
    error?.message ||
    "Something went wrong"
  );
};
