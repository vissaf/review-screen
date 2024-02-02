export const titleToInitials = (title) => {
  // Split the name into words.
  const words = title.split(" ");

  // Get the first letter of each word.
  const initials = words.map((word) => word[0]);

  // Join the initials together.
  const initialsString = `${initials[0]}${
    initials?.length > 1 ? initials[initials?.length - 1] : ""
  }`;
  // Return the initials as a string.
  return initialsString;
};
