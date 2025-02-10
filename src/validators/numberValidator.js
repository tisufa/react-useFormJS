export const numberValidator = (message = "Angka tidak valid") => {
  return (value) => {
    if (value) {
      if (isNaN(+value)) {
        return { message };
      }
    }
    return null;
  };
};
