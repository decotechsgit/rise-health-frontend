export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const toUpperCase = (str: string) => {
  return str
    .split(/[-_ ]+/)
    .map((word) => word.toUpperCase())
    .join(" ");
};
