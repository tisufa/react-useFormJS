export const minValidator = (min, message) => {
  return (value) => {
    if (value) {
      if (+value < min) {
        return { message };
      }
    }
    return null;
  };
};
