const ERRORS = {
  wrong_email_or_password: "Wrong email or password",
  user_not_found: "User not found"
};

export default function formatError(message) {
  if (message.trim()) {
    return ERRORS[message.trim()] || message;
  }
  return message;
}
