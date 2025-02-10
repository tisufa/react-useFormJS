export const actualLengthValidator = (actualLength, message) => {
  return (value) => {
    if (value) {
      if (value.length !== actualLength) {
        return { message };
      }
    }
    return null;
  };
};
