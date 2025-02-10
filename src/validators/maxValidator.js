export const maxValidator = (max, message) => {
  return (value) => {
    if (value) {
      if (+value > max) {
        return { message };
      }
    }
    return null;
  };
};
