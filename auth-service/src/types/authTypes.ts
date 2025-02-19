export interface UserPayload {
  _id: string;
  email: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}