export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string | null;
  role?: string;
  interests?: string[];
}
