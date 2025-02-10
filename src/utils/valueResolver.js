const valueResolver = (obj, field) => {
  if (!field || !obj) return obj;
  const fields = field.split(".");
  let value = obj;
  for (let i = 0; i < fields.length; i++) {
    value = value[fields[i]];
    if (value === undefined) return undefined;
  }
  return value;
};

export { valueResolver };
