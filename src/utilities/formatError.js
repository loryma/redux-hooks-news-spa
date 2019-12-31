const ERRORS = {
  EMAIL_EXISTS: "The email address is already in use by another account",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "All requests from this device have been blocked due to unusual activity. Try again later.",
  INVALID_PASSWORD: "The password is invalid.",
  EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier.",
  INVALID_ID_TOKEN: "The user's credential is no longer valid. The user must sign in again."
};

export default function formatError(message) {
  if (message && message.trim()) {
    return ERRORS[message.trim()] || message;
  }
  return message;
}
