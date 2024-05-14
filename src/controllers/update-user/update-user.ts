import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateRepository,
  IUpdateUserController,
  UpdateUserParams,
} from "./protocol";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldNotAllowedUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldNotAllowedUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.log(Error, error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
