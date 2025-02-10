export const regexValidator = (pattern, message) => {
  return (value) => {
    if (value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return { message };
      }
    }
    return null;
  };
};
