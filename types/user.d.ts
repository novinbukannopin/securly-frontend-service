export interface User {
  id: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
  linkCount: number;
  username: string;
  dob: Date;
  language: string;
}

export type UserUpdatePayload = Partial<
  Pick<User, 'name' | 'username' | 'dob' | 'language'>
>;
