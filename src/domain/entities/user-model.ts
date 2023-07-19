export type UserModel = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type UserWithoutPassword = Omit<UserModel, 'password'>;
