export const handleAlphabeticalOrder = (key) => {
  switch (key) {
    case 1:
      return 'a';
    case 2:
      return 'b';
    case 3:
      return 'c';
    case 4:
      return 'd';
    case 5:
      return 'e';
    case 6:
      return 'f';
    default:
      return `${key}`;
  }
};
