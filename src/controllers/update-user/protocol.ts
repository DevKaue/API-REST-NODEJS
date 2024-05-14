import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "./../protocols";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(http: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
