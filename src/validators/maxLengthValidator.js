export const maxLengthValidator = (maxLength, message) => {
  return (value) => {
    if (value) {
      if (value.length > maxLength) {
        return { message };
      }
    }
    return null;
  };
};
