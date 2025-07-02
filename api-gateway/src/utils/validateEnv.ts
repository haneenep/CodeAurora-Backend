import { env } from "./configEnv";

export function validateEnv() {
  if (!env.PORT) {
    throw new Error("PORT is not provided in the env");
  }
  if (!env.FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not provided in the env");
  }
  if (!env.AUTH_SERVICE) {
    throw new Error("AUTH is not provided in the env");
  }
  if (!env.PROBLEM_SERVICE) {
    throw new Error("PROBLEM is not provided in the env");
  }
  if (!env.NOTIFICATION_SERVICE) {
    throw new Error("NOTIFICATION is not provided in the env");
  }
}
