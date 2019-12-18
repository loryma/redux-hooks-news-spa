const ERRORS = {
  EMAIL_EXISTS: "The email address is already in use by another account",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "All requests from this device have been blocked due to unusual activity. Try again later."
};

export default function formatError(message) {
  if (message.trim()) {
    return ERRORS[message.trim()] || message;
  }
  return message;
}
