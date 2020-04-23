export const truncate = (input, maxLen) =>
  input.length > maxLen ? input.slice(0, maxLen) + "..." : input
