import { User } from "../../models/users";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IUpdateRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
