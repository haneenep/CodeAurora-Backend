export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get AUTH_SERVICE() {
    return process.env.AUTH_SERVICE!;
  },
  get PROBLEM_SERVICE() {
    return process.env.PROBLEM_SERVICE!;
  },
  get FRONTEND_URL() {
    return process.env.FRONTEND_URL!;
  },

  get NOTIFICATION_SERVICE() {
    return process.env.NOTIFICATION_SERVICE!;
  },
};
