export const requiredValidator = (message = "Data wajib diisi") => {
  return (value) => {
    if (
      typeof value === "undefined" ||
      value === null ||
      value === "" ||
      value === false
    ) {
      return { message };
    }
    return null;
  };
};
