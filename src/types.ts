export type User = {
  id: string;
  firstName?: string;
  lastName: string;
  dateOfBirth: number;
};

export type Users = User[];

export type CreateUserPayload = Omit<User, "id">;

export type UpdateUserPayload = Partial<Omit<User, "id">> & { id: string };

export type UsersResponse = {
  users: User[];
}

export type UserResponse = {
  user: User;
}
