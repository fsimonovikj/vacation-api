const getLocalizedMessage = (messages) => {
  const localisation = process.env.LOCALISATION || "en"; // This should be dynamic and based on user's locale
  return messages[localisation] || messages["en"]; // Default to 'en' if locale not found
};
