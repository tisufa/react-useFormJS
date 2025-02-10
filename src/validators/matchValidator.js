export const matchValidator = (matchWith, message) => {
  return (value, parent) => {
    if (value) {
      const matchControl = parent?.get(matchWith);
      if (matchControl) {
        if (value !== matchControl.value) {
          return { message };
        }
      } else {
        if (value !== matchWith) {
          return { message };
        }
      }
    }
    return null;
  };
};
