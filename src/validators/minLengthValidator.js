export const minLengthValidator = (minLength, message) => {
  return (value) => {
    if (value) {
      if (value.length < minLength) {
        return { message };
      }
    }
    return null;
  };
};
